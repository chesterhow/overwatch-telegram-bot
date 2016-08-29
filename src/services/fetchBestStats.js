import fetch from 'node-fetch';
import { API_URL } from '../constants';

const formatStats = (data, battletag) => {
  const stats = data['game_stats'];

  return `*${battletag}*:
  - Damage: ${stats['damage_done_most_in_game']}
  - Healing: ${stats['healing_done_most_in_game']}
  - Eliminations: ${stats['eliminations_most_in_game']}
  - Final Blows: ${stats['final_blows_most_in_game']}
  - Melee Final Blows: ${stats['melee_final_blows_most_in_game']}
  - Solo Kills: ${stats['solo_kills_most_in_game']}
  - Objective Kills: ${stats['objective_kills_most_in_game']}
  - Objective Time: ${stats['objective_time_most_in_game'].toFixed(2)}
  - Offensive Assists: ${stats['offensive_assists_most_in_game']}
  - Defensive Assists: ${stats['defensive_assists_most_in_game']}
  - Time Spend on Fire: ${stats['time_spent_on_fire_most_in_game'].toFixed(2)}`;
}

export const fetchBestStats = (battletag) => {
  const url = `${API_URL}/${battletag}/stats/general`;
  const headers = { 'Content-Type': 'application/json' };

  return fetch(url, { headers })
    .then(response => response.json())
    .then(json => formatStats(json, battletag))
    .catch(error => {
      return `Sorry, I cannot find the user ${battletag}`;
    });
}
