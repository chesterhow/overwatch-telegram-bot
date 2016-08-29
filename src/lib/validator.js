import BOT_USERNAME from '../constants';

export default class Validator {
  matchPatterns(command, pattern) {
    const longPattern = `${pattern}${BOT_USERNAME}`;
    return command.match(pattern) || command.match(longPattern);
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
}
