import fetch from 'node-fetch';
import { API_URL } from '../constants';

const formatStats = (data, battletag) => {
  const stats = data['average_stats'];

  return `*${battletag}*:
  - Damage: ${stats['damage_done_avg']}
  - Healing: ${stats['healing_done_avg']}
  - Eliminations: ${stats['eliminations_avg']}
  - Deaths: ${stats['deaths_avg']}
  - Final Blows: ${stats['final_blows_avg']}
  - Melee Final Blows: ${stats['melee_final_blows_avg']}
  - Objective Kills: ${stats['objective_kills_avg']}
  - Solo Kills: ${stats['solo_kills_avg']}
  - Offensive Assists: ${stats['offensive_assists_avg']}
  - Defensive Assists: ${stats['defensive_assists_avg']}
  - Time Spent on Fire: ${stats['time_spent_on_fire_avg'].toFixed(2)}`;
}

export const fetchAverageStats = (battletag) => {
  const url = `${API_URL}/${battletag}/stats/general`;
  const headers = { 'Content-Type': 'application/json'};

  return fetch(url, { headers })
    .then(response => response.json())
    .then(json => formatStats(json, battletag))
    .catch(error => {
      return `Sorry I cannot find the user ${battletag}`;
    });
}
