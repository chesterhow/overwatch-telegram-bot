import { fetchOverallStats } from '../services/fetchOverallStats';

export default class Command {
  constructor() {}

  getOverallStats(message, bot) {
    const messageParts = message.text.split(' ');
    let reply = '';

    if (messageParts.length === 1) {
      bot.sendMessage(message.from, 'Use /overallstats <Username>-<Battle id>.\nE.g. /overallstats BastionOP-12345');
    } else {
      const battletag = messageParts[1];

      bot.sendMessage(message.from, `Hold on while I search for ${battletag}`);

      fetchOverallStats(battletag)
        .then(reply => {
          bot.sendMessage(message.from, reply, { parse_mode: 'Markdown' });
        })
    }
  }

  getHelp(message, bot) {
    bot.sendMessage(message.from, '/overallstats <Username>-<Battle id> - Get overall stats of a player');
  }
}
