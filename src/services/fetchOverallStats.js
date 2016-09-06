import dedent from 'dedent-js';
import fetch from 'node-fetch';
import { API_URL, HTTP_HEADERS } from '../constants';

const headers = HTTP_HEADERS;

const formatStats = (data, battletag, competitive) => {
  const stats = data['overall_stats'];
  const gameMode = competitive ? 'Competitive' : 'Quick Play';
  let level = stats['level'];
  if (typeof stats['prestige'] === 'number') {
    level += (stats['prestige'] * 100);
  }

  let competitiveOnlyStats;

  if (competitive) {
    const winRate = ((stats['wins'] / stats['games']) * 100).toFixed(2);
    competitiveOnlyStats = dedent`- Losses: ${stats['losses'] || 0}
    - Win Rate: ${winRate || 0}%
    - Games: ${stats['games'] || 0}`;
  }

  let divider = '';
  [...Array(battletag.length)].forEach(() => divider += '=');

  return dedent`*${battletag}*
  ${divider}
  ${gameMode} Stats:
  - Level: ${level || 0}
  - Rating: ${stats['comprank'] || 0}
  - Wins: ${stats['wins'] || 0}
  ${competitiveOnlyStats || ''}`;
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
