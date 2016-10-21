import { BOT_USERNAME } from '../constants';

export default class Validator {
  matchPatterns(command, pattern) {
    const patterns = [
      pattern,
      `${pattern}${BOT_USERNAME}`, // e.g. /stats@ow_stats_bot
    ];

    return patterns.indexOf(command) >= 0;
  }

  isAskingForStats(command) {
    return this.matchPatterns(command, '/stats');
  }

  isAskingForLinks(command) {
    return this.matchPatterns(command, '/links');
  }

  isAskingForHelp(command) {
    return this.matchPatterns(command, '/help');
  }
}
