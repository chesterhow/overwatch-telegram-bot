export default class Validator {
  isAskingForOverallStats(text) {
    const command = text.split(' ')[0];
    const pattern1 = '/overallstats';
    const pattern2 = '/overallstats@ow_stats_bot';

    return command.match(pattern1) || command.match(pattern2);
  }
}
