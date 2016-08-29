import dedent from 'dedent-js';
import { fetchOverallStats } from '../services/fetchOverallStats';
import { fetchAverageStats } from '../services/fetchAverageStats';
import { fetchBestStats } from '../services/fetchBestStats';

export default class Command {
  constructor() {}

  sendHint(message, bot, command) {
    bot.sendMessage(message.chat.id, `Use ${command} <Username>-<Battle ID>.\nE.g. ${command} LastBastion-12345`);
  }

  sendSearching(message, bot, battletag) {
    bot.sendMessage(message.chat.id, `Hold on while I search for ${battletag}`);
  }


  getOverallStats(message, bot) {
    const messageParts = message.text.split(' ');
    let reply = '';

    if (messageParts.length === 1) {
      this.sendHint(message, bot, '/overallstats');
    } else {
      const battletag = messageParts[1];
      this.sendSearching(message, bot, battletag);

      fetchOverallStats(battletag)
        .then(reply => {
          bot.sendMessage(message.chat.id, reply, { parse_mode: 'Markdown' });
        })
    }
  }

  getAverageStats(message, bot) {
    const messageParts = message.text.split(' ');
    let reply = '';

    if (messageParts.length === 1) {
      this.sendHint(message, bot, '/averagestats');
    } else {
      const battletag = messageParts[1];
      this.sendSearching(message, bot, battletag);

      fetchAverageStats(battletag)
        .then(reply => {
          bot.sendMessage(message.chat.id, reply, { parse_mode: 'Markdown'});
        })
    }
  }

  getBestStats(message, bot) {
    const messageParts = message.text.split(' ');
    let reply = '';

    if (messageParts.length === 1) {
      this.sendHint(message, bot, '/beststats');
    } else {
      const battletag = messageParts[1];
      this.sendSearching(message, bot, battletag);

      fetchBestStats(battletag)
        .then(reply => {
          bot.sendMessage(message.chat.id, reply, { parse_mode: 'Markdown' });
        })
    }
  }

  getHelp(message, bot) {
    const reply = dedent`*Help*
    Usage: <command> <Username>-<Battle ID>
    E.g. /overallstats LastBastion-12345

    *Commands*
    /overallstats
    /averagestats
    /beststats`;
    bot.sendMessage(message.chat.id, reply, { parse_mode: 'Markdown' });
  }
}
