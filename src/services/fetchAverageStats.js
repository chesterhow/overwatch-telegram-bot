import fetch from 'node-fetch';
import { API_URL, HTTP_HEADERS } from '../constants';
import { hoursToMMSS } from './parseTime';

const headers = HTTP_HEADERS;

const formatStats = (data, battletag, competitive) => {
  const stats = data['average_stats'];
  const gameMode = competitive ? 'Competitive' : 'Quick Play';

  return `*${battletag}*'s Average Stats (${gameMode}):
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
}

export const fetchAverageStats = (battletag, competitive) => {
  const gameMode = competitive ? 'competitive' : 'general';
  const url = `${API_URL}/${battletag}/stats/${gameMode}`;

  return fetch(url, { headers })
    .then(response => response.json())
    .then(json => formatStats(json, battletag, competitive))
    .catch(error => {
      return `Sorry I cannot find the user ${battletag}`;
    });
}
