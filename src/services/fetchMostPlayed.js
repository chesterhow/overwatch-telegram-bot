import dedent from 'dedent-js';
import fetch from 'node-fetch';
import { API_URL, HTTP_HEADERS } from '../constants';
import { hoursToMinutes } from './parseTime';
import { pluralize } from './formatText';

const formatStats = (data, battletag, competitive) => {
  const gameMode = competitive ? 'competitive' : 'quickplay';
  const stats = data['us']['heroes']['playtime'][gameMode];

  const heroesArr = Object.keys(stats).map(key => ({
    name: key,
    timePlayed: stats[key],
  }));

  heroesArr.sort((a, b) => b.timePlayed - a.timePlayed);

  let topFive = '';

  heroesArr.forEach((hero, index) => {
    if (index < 5 && hero.timePlayed > 0) {
      const name = hero.name.charAt(0).toUpperCase() + hero.name.slice(1);
      let timePlayed = `${hero.timePlayed} ${pluralize('hour', hero.timePlayed)}`;
      if (hero.timePlayed % 1 !== 0) {
        const minutes = hoursToMinutes(hero.timePlayed)
        timePlayed = `${minutes} ${pluralize('minute', minutes)}`;
      }
      topFive += `${index + 1}. ${name}: ${timePlayed}\n`;
    }
  });

  return dedent`*${battletag}*
  ${topFive}`;
}

export const fetchMostPlayed = (battletag, competitive) => {
  const url = `${API_URL}/${battletag}/heroes`;

  return fetch(url, { headers: HTTP_HEADERS })
    .then(response => response.json())
    .then(json => formatStats(json, battletag, competitive))
    .catch(error => {
      return `Sorry, I cannot find the user ${battletag}`;
    });
}
