import fetch from 'node-fetch';
import { API_URL, HTTP_HEADERS } from '../constants';

const headers = HTTP_HEADERS;

const formatStats = (data, battletag, competitive) => {
  const stats = data['overall_stats'];
  const gameMode = competitive ? 'Competitive' : 'Quick Play';

  return `*${battletag}*'s Overall Stats (${gameMode}):
  - Level: ${stats['level'] || 0}
  - Games: ${stats['games'] || 0}
  - Wins: ${stats['wins'] || 0}
  - Losses: ${stats['losses'] || 0}
  - Win Rate: ${stats['win_rate'] || 0}%`;
}

export const fetchOverallStats = (battletag, competitive) => {
  const gameMode = competitive ? 'competitive' : 'general';
  const url = `${API_URL}/${battletag}/stats/${gameMode}`;

  return fetch(url, { headers })
    .then(response => response.json())
    .then(json => formatStats(json, battletag, competitive))
    .catch(error => {
      return `Sorry, I cannot find the user ${battletag}`;
    });
}
