import BOT_USERNAME from '../constants';

export default class Validator {
  matchPatterns(command, pattern) {
    const longPattern = `${pattern}${BOT_USERNAME}`;
    return command.match(pattern) || command.match(longPattern);
  }

  isAskingForOverallStats(text) {
    const command = text.split(' ')[0];
    return this.matchPatterns(command, '/overallstats');
  }

  isAskingForAverageStats(text) {
    const command = text.split(' ')[0];
    return this.matchPatterns(command, '/averagestats');
  }
}
