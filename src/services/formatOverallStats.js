import dedent from 'dedent-js';

const formatOverallStats = (data, battletag, gameMode) => {
  const stats = data['stats'][gameMode]['overall_stats'];
  const moreStats = data['stats'][gameMode]['game_stats'];
  let level = stats['level'];
  let competitiveStats;

  if (typeof stats['prestige'] === 'number') {
    level += (stats['prestige'] * 100);
  }

  if (gameMode === 'competitive') {
    const winRate = ((stats['wins'] / stats['games']) * 100).toFixed(2);
    competitiveStats = dedent`
    - Losses: ${stats['losses'] || 0}
    - Win Rate: ${winRate || 0}%
    - Games: ${stats['games'] || 0}`;
  }

  return dedent`*${battletag}*'s Overall Stats:
  - Level: ${level || 0}
  - Rating: ${stats['comprank'] || 0}
  - Wins: ${stats['wins'] || 0}${competitiveStats || ''}
  - K/D Ratio: ${moreStats['kpd'] || 0}
  - Cards: ${moreStats['cards'] || 0}
  - Medals: ${moreStats['medals'] || 0}
  - Gold: ${moreStats['medals_gold'] || 0}
  - Silver: ${moreStats['medals_silver'] || 0}
  - Bronze: ${moreStats['medals_bronze'] || 0}`;
};

export default formatOverallStats;
