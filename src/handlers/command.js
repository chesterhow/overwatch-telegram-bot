import { fetchOverallStats } from '../services/fetchOverallStats';

export default class Command {
  constructor() {}

  getOverallStats(message, bot) {
    const messageParts = message.text.split(' ');
    let reply = '';

    if (messageParts.length === 1) {
      bot.sendMessage(message.chat.id, 'Use /overallstats <Username>-<Battle id>.\nE.g. /overallstats BastionOP-12345');
    } else {
      const battletag = messageParts[1];

      bot.sendMessage(message.chat.id, `Hold on while I search for ${battletag}`);

      fetchOverallStats(battletag)
        .then(reply => {
          bot.sendMessage(message.chat.id, reply, { parse_mode: 'Markdown' });
        })
    }
  }

  getHelp(message, bot) {
    bot.sendMessage(message.chat.id, '/overallstats <Username>-<Battle id> - Get overall stats of a player');
  }
}
