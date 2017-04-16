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
  PLAYOVERWATCH_URL,
  MASTEROVERWATCH_URL,
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
    const reply = dedent`Use ${command} <ign> <region/platform>
    E.g. ${command} LastBastion#12345

    Still confused? Try /help`;

    this.bot.sendMessage(this.chatID, reply, PARSE_MODE);
  }

  sendNotFound() {
    this.bot.sendMessage(this.chatID, `Sorry, I could not find the user ${this.battletag}`);
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

        if (data['stats'][this.gameMode]) {
          this.selectStats(data, response.message_id);
        } else {
          this.bot.sendMessage(this.chatID, `It seems ${this.battletag} has not played any competitive games yet`);
        }
      };
    });
  }

  getRegionStats(json) {
    let data = null;

    if (this.region === 'us') {
      data = json.us;
    } else if (this.region === 'eu') {
      data = json.eu;
    } else if (this.region === 'kr') {
      data = json.kr;
    } else if (this.region === 'global') {
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
      const flag = messageParts[2];

      if (flag === 'xbl' || flag === 'psn') {
        this.platform = flag;
        this.region = 'global';
      } else {
        this.platform = 'pc';
        this.region = flag || 'us';
      }

      fetchStats(this.battletag, this.platform).then((json) => {
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
    let playOverwatchLink = '';

    if (this.platform === 'pc') {
      playOverwatchLink = `${this.region}/${battletag}`;
    } else {
      playOverwatchLink = `${battletag}`;
    }

    options['reply_markup']['inline_keyboard'] = [
      [{
        text: 'PlayOverwatch',
        url: `${PLAYOVERWATCH_URL}/${this.platform}/${playOverwatchLink}`,
      }],
      [{
        text: 'MasterOverwatch',
        url: `${MASTEROVERWATCH_URL}/${this.platform}/${this.region}/${battletag}`,
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
      const flag = messageParts[2];

      if (flag === 'xbl' || flag === 'psn') {
        this.platform = flag;
        this.region = 'global';
      } else {
        this.platform = 'pc';
        this.region = flag || 'us';
      }

      fetchStats(this.battletag, this.platform).then((json) => {
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
    - \`/stats <ign> <region/platform>\`: Retrieve player's stats
    - \`/links <ign> <region/platform>\`: Provides links to websites providing more stats

    _Your ign is either Battletag, PSN ID or Xbox Gamertag_

    *Examples*
    PC
    US: /stats LastBastion#12345
    EU: /stats LastBastion#12345 eu
    KR: /stats LastBastion#12345 kr

    PS4
    /stats LastBastion psn

    Xbox One
    /stats LastBastion xbl

    _Note: Region is default to US unless specified otherwise_`;
    this.bot.sendMessage(this.chatID, reply, PARSE_MODE);
  }
}
