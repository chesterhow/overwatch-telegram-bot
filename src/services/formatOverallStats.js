import dedent from 'dedent-js';

const formatOverallStats = (data, battletag) => {
  const stats = data['overall_stats'];
  let level = stats['level'];

  if (typeof stats['prestige'] === 'number') {
    level += (stats['prestige'] * 100);
  }

  let competitiveOnlyStats;

  if (data['competitive']) {
    const winRate = ((stats['wins'] / stats['games']) * 100).toFixed(2);
    competitiveOnlyStats = dedent`- Losses: ${stats['losses'] || 0}
    - Win Rate: ${winRate || 0}%
    - Games: ${stats['games'] || 0}`;
  }

  return dedent`*${battletag}*:
  - Level: ${level || 0}
  - Rating: ${stats['comprank'] || 0}
  - Wins: ${stats['wins'] || 0}
  ${competitiveOnlyStats || ''}`;
};

export default formatOverallStats;
