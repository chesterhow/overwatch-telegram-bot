import dedent from 'dedent-js';
import fetchStats from '../services/fetchStats';
import formatBestStats from '../services/formatBestStats';
import formatMostPlayed from '../services/formatMostPlayed';
import formatOverallStats from '../services/formatOverallStats';
import formatAverageStats from '../services/formatAverageStats';
import { hashToHypen } from '../services/formatText';
import {
  PARSE_MODE,
  REPLY_MARKUP_KEYBOARD,
  REPLY_MARKUP_HIDE_KEYBOARD,
  REPLY_MARKUP_INLINE_KEYBOARD,
} from '../constants';

const gameModeCallbacks = {};
const statsCallbacks = {};

export default class CommandHandler {
  constructor(bot, message) {
    this.bot = bot;
    this.message = message;
    this.chatID = message.chat.id;
    this.battletag = '';
    this.region = '';
    this.platform = '';
  }

  splitMessage(text) {
    return text.split(' ').filter((part) => /\S/.test(part));
  }

  formatStats(option, data) {
    switch (option) {
      case 'Overall':
        return formatOverallStats(data, this.battletag, this.gameMode);
      case 'Average':
        return formatAverageStats(data, this.battletag, this.gameMode);
      case 'Best':
        return formatBestStats(data, this.battletag, this.gameMode);
      case 'Most Played':
        return formatMostPlayed(data, this.battletag, this.gameMode);
      default:
        return 'Invalid option';
    }
  }

  sendHint(command) {
    this.bot.sendMessage(this.chatID, `Use ${command} <Battle Tag>.\nE.g. ${command} LastBastion#12345`);
  }

  sendNotFound() {
    this.bot.sendMessage(this.chatID, `Sorry, I could not find the user ${this.battletag}`, PARSE_MODE);
  }

  selectStats(data, messageID) {
    this.bot.on('text', (msg) => {
      const callback = statsCallbacks[msg.chat.id];

      if (callback) {
        switch (msg.text) {
          case 'Overall':
          case 'Average':
          case 'Best':
          case 'Most Played':
            delete statsCallbacks[msg.chat.id];
            return callback(msg);
          default:
            break;
        }
      }

      return null;
    });

    let options = {
      ...PARSE_MODE,
      ...REPLY_MARKUP_KEYBOARD,
      reply_to_message_id: messageID,
    };

    options['reply_markup']['keyboard'] = [
      ['Overall', 'Average'],
      ['Best', 'Most Played'],
    ];

    this.bot.sendMessage(this.chatID, 'Select stats to view', options).then(() => {
      statsCallbacks[this.chatID] = (response) => {
        options = {
          ...PARSE_MODE,
          ...REPLY_MARKUP_HIDE_KEYBOARD,
          reply_to_message_id: response.message_id,
        };
        const statsReply = this.formatStats(response.text, data);
        this.bot.sendMessage(this.chatID, statsReply, options);
      };
    });
  }

  selectGameMode(data) {
    this.bot.on('text', (msg) => {
      const callback = gameModeCallbacks[msg.chat.id];

      if (callback) {
        switch (msg.text) {
          case 'Quick Play':
          case 'Competitive':
            delete gameModeCallbacks[msg.chat.id];
            return callback(msg);
          default:
            break;
        }
      }

      return null;
    });

    const options = {
      ...PARSE_MODE,
      ...REPLY_MARKUP_KEYBOARD,
      reply_to_message_id: this.message.message_id,
    };

    options['reply_markup']['keyboard'] = [
      ['Quick Play'],
      ['Competitive'],
    ];

    this.bot.sendMessage(this.chatID, 'Select game mode', options).then(() => {
      gameModeCallbacks[this.chatID] = (response) => {
        this.gameMode = response.text === 'Competitive' ? 'competitive' : 'quickplay';
        this.selectStats(data, response.message_id);
      };
    });
  }

  getRegionStats(json) {
    let data = null;

    if (!this.region || this.region === 'us') {
      this.region = 'us';
      data = json.us;
    } else if (this.region === 'eu') {
      data = json.eu;
    } else if (this.region === 'kr') {
      data = json.kr;
    } else if (this.region === 'psn') {
      data = json.any;
    } else if (this.region === 'xbl') {
      data = json.any;
    }

    return data;
  }

  getStats() {
    const messageParts = this.splitMessage(this.message.text);

    if (messageParts.length === 1) {
      this.sendHint('/stats');
    } else {
      this.bot.sendChatAction(this.chatID, 'typing');
      this.battletag = messageParts[1];
      this.region = messageParts[2];
      if (this.region === ('psn' || 'xbl')) {
        this.platform = this.region;
      } else {
        this.platform = 'pc';
      }

      fetchStats(this.battletag,this.platform).then((json) => {
        const data = this.getRegionStats(json);

        if (data) {
          this.selectGameMode(data);
        } else {
          this.sendNotFound();
        }
      });
    }
  }

  sendLinks() {
    const options = {
      ...PARSE_MODE,
      ...REPLY_MARKUP_INLINE_KEYBOARD,
    };

    const battletag = hashToHypen(this.battletag);

    options['reply_markup']['inline_keyboard'] = [
      [{
        text: 'PlayOverwatch',
        url: `https://playoverwatch.com/en-us/career/pc/${this.region}/${battletag}`,
      }],
      [{
        text: 'MasterOverwatch',
        url: `http://masteroverwatch.com/profile/pc/${this.region}/${battletag}`,
      }],
    ];

    this.bot.sendMessage(this.chatID, 'Here are some sites with more detailed stats and data', options);
  }

  getLinks() {
    const messageParts = this.splitMessage(this.message.text);

    if (messageParts.length === 1) {
      this.sendHint('/links');
    } else {
      this.bot.sendChatAction(this.chatID, 'typing');
      this.battletag = messageParts[1];
      this.region = messageParts[2];

      fetchStats(this.battletag).then((json) => {
        const data = this.getRegionStats(json);

        if (data) {
          this.sendLinks();
        } else {
          this.sendNotFound();
        }
      });
    }
  }

  getHelp() {
    const reply = dedent`*Here's what I can do*
    - \`/stats <Battle Tag> <Region / Platform>\`: Retrieve player's stats
    - \`/links <Battle Tag> <Region / Platform>\`: Provides links to websites providing more stats

    *Examples*
    US player: /stats LastBastion#12345
    EU player: /stats LastBastion#12345 eu
    KR player: /stats LastBastion#12345 kr
    PS4 player: /stats LastBastion#12345 psn
    Xbox One player: /stats LastBastion#12345 xbl

    _Note: Region is default to US unless specified otherwise_`;
    this.bot.sendMessage(this.chatID, reply, PARSE_MODE);
  }
}
