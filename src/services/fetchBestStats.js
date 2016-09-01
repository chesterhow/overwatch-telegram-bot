import fetch from 'node-fetch';
import { API_URL, HTTP_HEADERS } from '../constants';
import { hoursToMinutes } from './parseTime';

const headers = HTTP_HEADERS;

const formatStats = (data, battletag, competitive) => {
  const stats = data['game_stats'];
  const gameMode = competitive ? 'Competitive' : 'Quick Play';

  return `*${battletag}*'s Best Stats (${gameMode}):
  - Damage: ${stats['damage_done_most_in_game'] || 0}
  - Healing: ${stats['healing_done_most_in_game'] || 0}
  - Eliminations: ${stats['eliminations_most_in_game'] || 0}
  - Final Blows: ${stats['final_blows_most_in_game'] || 0}
  - Melee Final Blows: ${stats['melee_final_blows_most_in_game'] || 0}
  - Solo Kills: ${stats['solo_kills_most_in_game'] || 0}
  - Objective Kills: ${stats['objective_kills_most_in_game'] || 0}
  - Objective Time: ${hoursToMinutes(stats['objective_time_most_in_game']) || 0}
  - Offensive Assists: ${stats['offensive_assists_most_in_game'] || 0}
  - Defensive Assists: ${stats['defensive_assists_most_in_game'] || 0}
  - Time Spend on Fire: ${hoursToMinutes(stats['time_spent_on_fire_most_in_game']) || 0}`;
}

export const fetchBestStats = (battletag, competitive) => {
  const gameMode = competitive ? 'competitive' : 'general';
  const url = `${API_URL}/${battletag}/stats/${gameMode}`;

  return fetch(url, { headers })
    .then(response => response.json())
    .then(json => formatStats(json, battletag, competitive))
    .catch(error => {
      return `Sorry, I cannot find the user ${battletag}`;
    });
}
