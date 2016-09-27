import dedent from 'dedent-js';
import { fetchStats } from '../services/fetchStats';
import formatOverallStats from '../services/formatOverallStats';
import { PARSE_MODE, REPLY_MARKUP } from '../constants';

export default class CommandHandler {
  constructor(bot, message) {
    this.bot = bot;
    this.message = message;
    this.chatID = message.chat.id;
    this.battletag = '';
  }

  splitMessage(text) {
    return text.split(' ').filter(part => /\S/.test(part));
  }

  formatStats(option, data) {
    switch (option) {
      case 'Overall':
        return formatOverallStats(data, this.battletag);
      case 'Average':
        return 'Requested for averagestats';
      case 'Best':
        return 'Requested for beststats';
      case 'Most Played':
        return 'Requested for overallstats';
      default:
        return 'Invalid option';
    }
  }

  sendHint(command) {
    this.bot.sendMessage(this.chatID, `Use ${command} <Username>-<Battle ID>.\nE.g. ${command} LastBastion-12345`);
  }

  selectStats(gameModeData) {
    const options = {
      ...PARSE_MODE,
      ...REPLY_MARKUP,
    };

    options['reply_markup']['keyboard'] = [
      ['Overall', 'Average'],
      ['Best', 'Most Played'],
    ];

    this.bot.sendMessage(this.chatID, 'Select stats to view', options)
      .then((sent) => {
        this.bot.onReplyToMessage(sent.chat.id, sent.message_id, ((response) => {
          const statsReply = this.formatStats(response.text, gameModeData);
          this.bot.sendMessage(this.chatID, statsReply, PARSE_MODE);
        }));
      });
  }

  selectGameMode(stats, reply) {
    const options = {
      ...PARSE_MODE,
      ...REPLY_MARKUP,
    };

    options['reply_markup']['keyboard'] = [
      ['Quick Play'],
      ['Competitive'],
    ];

    this.bot.sendMessage(this.chatID, reply, options)
      .then((sent) => {
        this.bot.onReplyToMessage(sent.chat.id, sent.message_id, ((response) => {
          const gameModeData = (response.text === 'Competitive') ?
            stats['competitive'] : stats['quickplay'];
          this.selectStats(gameModeData);
        }));
      });
  }

  getRegionStats(json, region) {
    let reply = 'Sorry, I could not find the user ';
    let stats = null;
    let playerData = null;

    if (!region || region === 'us') {
      playerData = json.us;
    } else if (region === 'eu') {
      playerData = json.eu;
    } else if (region === 'kr') {
      playerData = json.kr;
    }

    if (playerData) {
      reply = 'Select game mode';
      stats = playerData['stats'];
    }

    return { stats, reply };
  }

  getStats() {
    const messageParts = this.splitMessage(this.message.text);

    if (messageParts.length === 1) {
      this.sendHint('/stats');
    } else {
      this.bot.sendChatAction(this.chatID, 'typing');
      this.battletag = messageParts[1];
      const region = messageParts[2];

      fetchStats(this.battletag)
        .then((json) => {
          const { stats, reply } = this.getRegionStats(json, region);

          if (stats) {
            this.selectGameMode(stats, reply);
          } else {
            this.bot.sendMessage(this.chatID, `${reply}${this.battletag}`, PARSE_MODE);
          }
        });
    }
  }

  getHelp() {
    const reply = dedent`*Help*
    Usage: /stats <Username>-<Battle ID> <Region>

    *Examples*
    US player: /stats LastBastion-12345
    EU player: /stats LastBastion-12345 eu
    KR player: /stats LastBastion-12345 kr

    _Note: If region is not specified, it will default to US_`;
    this.bot.sendMessage(this.chatID, reply, PARSE_MODE);
  }
}
