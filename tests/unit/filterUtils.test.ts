import { filterByStatus, searchGames, sortGames } from '../../src/utils/filterUtils';
import type { Game } from '../../src/types';


// Sample games used across all tests
const games: Game[] = [
  { id: '1', title: 'Hollow Knight', platform: 'PC', genre: 'Metroidvania', status: 'Completed', rating: 5, priority: 'High', progress: 100 },
  { id: '2', title: 'Coral Island', platform: 'Steam', genre: 'Simulation', status: 'Dropped', rating: 4, priority: 'Medium', progress: 10 },
  { id: '3', title: 'Suikoden I', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 5, priority: 'High', progress: 60 },
  { id: '4', title: 'Suikoden II', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 5, priority: 'High', progress: 40 },
  { id: '5', title: 'Suikoden III', platform: 'PS2', genre: 'RPG', status: 'Backlog', rating: 3, priority: 'Low', progress: 0 },
  { id: '6', title: 'The Witcher 3: Wild Hunt', platform: 'PS4', genre: 'RPG', status: 'Completed', rating: 5, priority: 'Low', progress: 100 },
];

// ─── filterByStatus ───────────────────────────────────────────────────────────

describe('filterByStatus', () => {
  // TODO: Test case 1 — filter by Playing, expect Suikoden I and Suikoden II
  test('returns only games with status Playing', () => {
      const result = filterByStatus(games, 'Playing');
      expect(result).toHaveLength(2);
  });

  // TODO: Test case 2 — filter by Completed, expect Hollow Knight and Celeste
  test('returns only games with status Completed', () => {});

  // TODO: Test case 3 — filter by Backlog, expect Suikoden III
  test('returns only games with status Backlog', () => {});

  // TODO: Test case 4 — filter by Dropped, expect Bloodborne
  test('returns only games with status Dropped', () => {});

  // TODO: Test case 5 — filter by Playing from games list, expect both Playing games returned (not just first)
  test('returns ALL matching games, not just the first', () => {});

  // TODO: Test case 6 — filter by Completed from a list with no Completed games, expect []
  test('returns empty array when no games match the status', () => {});

  // TODO: Test case 7 — filter empty array by Playing, expect []
  test('returns empty array when game list is empty', () => {});
});

// ─── searchGames ──────────────────────────────────────────────────────────────

describe('searchGames', () => {
  // TODO: Test case 1 — search "Hollow Knight", expect [Hollow Knight]
  test('returns games matching full title', () => {});

  // TODO: Test case 2 — search "Suikoden", expect Suikoden I, II, III
  test('returns all games matching partial title', () => {});

  // TODO: Test case 3 — search "PC", expect Hollow Knight and Celeste
  test('returns games matching full platform', () => {});

  // TODO: Test case 4 — search "RPG", expect Suikoden I, II, III, Bloodborne
  test('returns games matching full genre', () => {});

  // TODO: Test case 5 — search "hollow knight" (lowercase), expect [Hollow Knight]
  test('search is case insensitive', () => {});

  // TODO: Test case 6 — search "Suikoden I", expect Suikoden I and Suikoden III (contains "I")
  test('handles spaces and numbers in query', () => {});

  // TODO: Test case 7 — search "Zelda", expect []
  test('returns empty array when no games match', () => {});

  // TODO: Test case 8 — search "", expect all games
  test('returns all games for empty query', () => {});

  // TODO: Test case 9 — search "Hollow Knight" on empty array, expect []
  test('returns empty array when game list is empty', () => {});
});

// ─── sortGames ────────────────────────────────────────────────────────────────

describe('sortGames', () => {
  // TODO: Test case 1 — sort by title, expect alphabetical A–Z order
  test('sorts by title A–Z', () => {});

  // TODO: Test case 2 — sort by rating, expect highest first
  test('sorts by rating highest first', () => {});

  // TODO: Test case 3 — sort by progress, expect highest first
  test('sorts by progress highest first', () => {});

  // TODO: Test case 4 — sort by rating where ties exist, tied games sort alphabetically
  // Hint: Suikoden I, II, and Hollow Knight all have rating 5
  test('breaks rating ties alphabetically by title', () => {});

  // TODO: Test case 5 — sort by progress where ties exist, tied games sort alphabetically
  // Hint: Hollow Knight and Celeste both have progress 100
  test('breaks progress ties alphabetically by title', () => {});

  // TODO: Test case 6, 7, 8 — sort empty array by each sortBy, expect []
  test('returns empty array for empty list sorted by title', () => {});
  test('returns empty array for empty list sorted by rating', () => {});
  test('returns empty array for empty list sorted by progress', () => {});
});

// function expect(result: Game[]) {
//   throw new Error('Function not implemented.');
// }
