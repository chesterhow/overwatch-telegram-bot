import dedent from 'dedent-js';
import { fetchOverallStats } from '../services/fetchOverallStats';
import { fetchAverageStats } from '../services/fetchAverageStats';
import { fetchBestStats } from '../services/fetchBestStats';
import { MSG_PARSE_MODE } from '../constants';

export default class Command {
  constructor() {}

  sendHint(message, bot, command) {
    bot.sendMessage(message.chat.id, `Use ${command} <Username>-<Battle ID>.\nE.g. ${command} LastBastion-12345`);
  }

  sendSearching(message, bot, battletag) {
    bot.sendMessage(message.chat.id, `Hold on while I search for ${battletag}`);
  }


  getOverallStats(message, bot) {
    let messageParts = message.text.split(' ');
    messageParts = messageParts.filter(part => /\S/.test(part));

    if (messageParts.length === 1) {
      this.sendHint(message, bot, '/overallstats');
    } else {
      const battletag = messageParts[1];
      this.sendSearching(message, bot, battletag);

      const competitive = messageParts[0].substring(13, 18) === '_comp';
      fetchOverallStats(battletag, competitive)
        .then(reply => {
          bot.sendMessage(message.chat.id, reply, MSG_PARSE_MODE);
        })
    }
  }

  getAverageStats(message, bot) {
    let messageParts = message.text.split(' ');
    messageParts = messageParts.filter(part => /\S/.test(part));

    if (messageParts.length === 1) {
      this.sendHint(message, bot, '/averagestats');
    } else {
      const battletag = messageParts[1];
      this.sendSearching(message, bot, battletag);

      const competitive = messageParts[0].substring(13, 18) === '_comp';
      fetchAverageStats(battletag, competitive)
        .then(reply => {
          bot.sendMessage(message.chat.id, reply, MSG_PARSE_MODE);
        })
    }
  }

  getBestStats(message, bot) {
    let messageParts = message.text.split(' ');
    messageParts = messageParts.filter(part => /\S/.test(part));

    if (messageParts.length === 1) {
      this.sendHint(message, bot, '/beststats');
    } else {
      const battletag = messageParts[1];
      this.sendSearching(message, bot, battletag);

      const competitive = messageParts[0].substring(10, 15) === '_comp';
      // console.log()
      fetchBestStats(battletag, competitive)
        .then(reply => {
          bot.sendMessage(message.chat.id, reply, MSG_PARSE_MODE);
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
    bot.sendMessage(message.chat.id, reply, MSG_PARSE_MODE);
  }
}
