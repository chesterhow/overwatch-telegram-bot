import fetch from 'node-fetch';
import { API_URL } from '../constants';

const formatStats = (data, battletag) => {
  const stats = data['overall_stats'];

  return `*${battletag}*:
  - Level: ${stats['level']}
  - Games: ${stats['games']}
  - Wins: ${stats['wins']}
  - Losses: ${stats['losses']}
  - Win Rate: ${stats['win_rate']}%`;
}

export const fetchOverallStats = (battletag) => {
  const url = `${API_URL}/${battletag}/stats/general`;
  const headers = { 'Content-Type': 'application/json'};

  return fetch(url, { headers })
    .then(response => response.json())
    .then(json => formatStats(json, battletag))
    .catch(error => {
      return `Sorry, I cannot find the user ${battletag}`;
    });
}
