import dedent from 'dedent-js';
import { titlecase } from './formatText';

const formatOverallStats = (data, battletag, gameMode) => {
  const stats = data['stats'][gameMode]['overall_stats'];
  const moreStats = data['stats'][gameMode]['game_stats'];
  let level = stats['level'];
  let compGameStats;
  let compRankStats;

  if (typeof stats['prestige'] === 'number') {
    level += (stats['prestige'] * 100);
  }

  if (gameMode === 'competitive') {
    const rank = stats['tier'] ? titlecase(stats['tier']) : '-';

    compRankStats = dedent`
    \n- Rating: ${stats['comprank'] || 0}
    - Rank: ${rank}`;

    const winRate = ((stats['wins'] / stats['games']) * 100).toFixed(2);

    compGameStats = dedent`
    \n- Losses: ${stats['losses'] || 0}
    - Ties: ${stats['ties'] || 0}
    - Win Rate: ${winRate || 0}%
    - Games: ${stats['games'] || 0}`;
  }

  return dedent`*${battletag}*'s Overall Stats:
  - Level: ${level || 0}${compRankStats || ''}
  - Wins: ${stats['wins'] || 0}${compGameStats || ''}
  - K/D Ratio: ${moreStats['kpd'] || 0}
  - Cards: ${moreStats['cards'] || 0}
  - Medals: ${moreStats['medals'] || 0}
  - Gold: ${moreStats['medals_gold'] || 0}
  - Silver: ${moreStats['medals_silver'] || 0}
  - Bronze: ${moreStats['medals_bronze'] || 0}`;
};

export default formatOverallStats;
