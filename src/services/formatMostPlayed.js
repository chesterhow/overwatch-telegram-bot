import dedent from 'dedent-js';
import { hoursToMinutes } from './parseTime';
import { pluralize, titlecase } from './formatText';

const formatMostPlayed = (data, battletag, gameMode) => {
  const stats = data['heroes']['playtime'][gameMode];

  const heroesArr = Object.keys(stats).map((key) => ({
    name: key,
    timePlayed: stats[key],
  }));

  heroesArr.sort((a, b) => b.timePlayed - a.timePlayed);

  let topFive = '';

  heroesArr.forEach((hero, index) => {
    if (index < 5 && hero.timePlayed > 0) {
      const name = titlecase(hero.name);
      let timePlayed = `${hero.timePlayed} ${pluralize('hour', hero.timePlayed)}`;
      if (hero.timePlayed % 1 !== 0) {
        const minutes = hoursToMinutes(hero.timePlayed);
        timePlayed = `${minutes} ${pluralize('minute', minutes)}`;
      }
      topFive += `${index + 1}. ${name}: ${timePlayed}\n`;
    }
  });

  return dedent`*${battletag}*'s Most Played Heroes'
  ${topFive}`;
};

export default formatMostPlayed;
