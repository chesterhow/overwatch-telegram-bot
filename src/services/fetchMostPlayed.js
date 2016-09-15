import dedent from 'dedent-js';
import fetch from 'node-fetch';
import { API_URL, HTTP_HEADERS } from '../constants';
import { hoursToMinutes } from './parseTime';

const headers = HTTP_HEADERS;

const formatStats = (data, battletag, competitive) => {
  const stats = data['heroes'];
  const gameMode = competitive ? 'Competitive' : 'Quick Play';
  const mostPlayed = [];

  const heroesArr = Object.keys(stats).map(key => {
    return {
      name: key,
      timePlayed: stats[key],
    };
  });

  heroesArr.sort((a, b) => b.timePlayed - a.timePlayed);

  let topFive = '';

  heroesArr.forEach((hero, index) => {
    if (index < 5) {
      const name = hero.name.charAt(0).toUpperCase() + hero.name.slice(1);
      topFive += `${index + 1}. ${name}: ${hero.timePlayed}\n`;
    }
  });

  return dedent`*${battletag}*
  ${topFive}`;
}

export const fetchMostPlayed = (battletag, competitive) => {
  const gameMode = competitive ? 'competitive' : 'general';
  const url = `${API_URL}/${battletag}/heroes/${gameMode}`;

  return fetch(url, { headers })
    .then(response => response.json())
    .then(json => formatStats(json, battletag, competitive))
    .catch(error => {
      return `Sorry, I cannot find the user ${battletag}`;
    });
}
