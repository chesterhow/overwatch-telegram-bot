import { BOT_USERNAME } from '../constants';

export default class Validator {
  matchDefaultPatterns(command, pattern) {
    const patterns = [
      pattern,
      `${pattern}${BOT_USERNAME}`,
    ];

    return patterns.indexOf(command) >= 0;
  }

  matchPatterns(command, pattern) {
    const patterns = [
      pattern,
      `${pattern}${BOT_USERNAME}`,      // e.g. /beststats@ow_stats_bot
      `${pattern}_comp`,                //      /beststats_comp
      `${pattern}_comp${BOT_USERNAME}`, //      /beststats_comp@ow_stats_bot
    ];

    return patterns.indexOf(command) >= 0;
  }

  isAskingForOverallStats(command) {
    return this.matchPatterns(command, '/overallstats');
  }

  isAskingForAverageStats(command) {
    return this.matchPatterns(command, '/averagestats');
  }

  isAskingForBestStats(command) {
    return this.matchPatterns(command, '/beststats');
  }

  isAskingForMostPlayed(command) {
    return this.matchPatterns(command, '/mostplayed');
  }

  isAskingForHelp(command) {
    return this.matchDefaultPatterns(command, '/help');
  }
}
