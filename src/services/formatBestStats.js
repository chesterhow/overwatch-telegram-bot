import dedent from 'dedent-js';
import { hoursToMMSS } from './parseTime';

const formatBestStats = (data, battletag, gameMode) => {
  const stats = data['stats'][gameMode]['game_stats'];

  return dedent`*${battletag}*'s Best Stats:
  - Damage: ${stats['damage_done_most_in_game'] || 0}
  - Healing: ${stats['healing_done_most_in_game'] || 0}
  - Eliminations: ${stats['eliminations_most_in_game'] || 0}
  - Final Blows: ${stats['final_blows_most_in_game'] || 0}
  - Melee Final Blows: ${stats['melee_final_blows_most_in_game'] || 0}
  - Solo Kills: ${stats['solo_kills_most_in_game'] || 0}
  - Multikill: ${stats['multikill_best'] || 0}
  - Objective Kills: ${stats['objective_kills_most_in_game'] || 0}
  - Objective Time: ${hoursToMMSS(stats['objective_time_most_in_game']) || 0}
  - Offensive Assists: ${stats['offensive_assists_most_in_game'] || 0}
  - Defensive Assists: ${stats['defensive_assists_most_in_game'] || 0}
  - Time Spent on Fire: ${hoursToMMSS(stats['time_spent_on_fire_most_in_game']) || 0}`;
};

export default formatBestStats;
