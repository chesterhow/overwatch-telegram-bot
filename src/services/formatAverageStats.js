import dedent from 'dedent-js';
import { hoursToMMSS } from './parseTime';

const formatAverageStats = (data, battletag, gameMode) => {
  const stats = data['stats'][gameMode]['average_stats'];

  return dedent`*${battletag}*'s Average Stats:
  - Damage: ${stats['damage_done_avg'] || 0}
  - Healing: ${stats['healing_done_avg'] || 0}
  - Eliminations: ${stats['eliminations_avg'] || 0}
  - Deaths: ${stats['deaths_avg'] || 0}
  - Final Blows: ${stats['final_blows_avg'] || 0}
  - Melee Final Blows: ${stats['melee_final_blows_avg'] || 0}
  - Solo Kills: ${stats['solo_kills_avg'] || 0}
  - Objective Kills: ${stats['objective_kills_avg'] || 0}
  - Objective Time: ${hoursToMMSS(stats['objective_time_avg']) || 0}
  - Offensive Assists: ${stats['offensive_assists_avg'] || 0}
  - Defensive Assists: ${stats['defensive_assists_avg'] || 0}
  - Time Spent on Fire: ${hoursToMMSS(stats['time_spent_on_fire_avg']) || 0}`;
};

export default formatAverageStats;
