import { filterByStatus, searchGames, sortGames } from '../../src/utils/filterUtils';
import type { Game } from '../../src/types';


// Sample games used across all tests
const games: Game[] = [
  { id: '1', title: 'Hollow Knight', platform: 'Steamdeck', genre: 'Metroidvania', status: 'Completed', rating: 4, priority: 'High', progress: 100 },
  { id: '2', title: 'Coral Island', platform: 'Steamdeck', genre: 'Simulation', status: 'Dropped', rating: 4, priority: 'Medium', progress: 10 },
  { id: '3', title: 'Suikoden I', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 4, priority: 'High', progress: 60 },
  { id: '4', title: 'Suikoden II', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 5, priority: 'High', progress: 40 },
  { id: '5', title: 'Suikoden III', platform: 'PS2', genre: 'RPG', status: 'Backlog', rating: 3, priority: 'Low', progress: 0 },
  { id: '6', title: 'The Witcher 3: Wild Hunt', platform: 'PS4', genre: 'RPG', status: 'Completed', rating: 5, priority: 'Low', progress: 100 },
];

const uncompletedGames: Game[] = [
   { id: '7', title: 'Clair Obscur: Expedition 33', platform: 'PS5', genre: 'RPG', status: 'Playing', rating: 5, priority: 'High', progress: 95 },
  { id: '8', title: 'Final Fantays VII: Retrograde', platform: 'PS5', genre: 'RPG', status: 'Playing', rating: 5, priority: 'High', progress: 75 },
];

const emptyGameList: Game[] = [];

// ─── filterByStatus ───────────────────────────────────────────────────────────

describe('filterByStatus', () => {
  // TODO: Test case 1 — filter by Playing, expect Suikoden I and Suikoden II
  test('returns only games with status Playing', () => {
      const result = filterByStatus(games, 'Playing');
      expect(result).toHaveLength(2);
  });

  // TODO: Test case 2 — filter by Completed, expect Hollow Knight and Celeste
  test('returns only games with status Completed', () => {
    const result = filterByStatus(games, 'Completed');
    expect(result).toHaveLength(2);
  });

  // TODO: Test case 3 — filter by Backlog, expect Suikoden III
  test('returns only games with status Backlog', () => {
    const result = filterByStatus(games, 'Backlog');
    expect(result).toHaveLength(1);
  });

  // TODO: Test case 4 — filter by Dropped, expect Bloodborne
  test('returns only games with status Dropped', () => {
    const result = filterByStatus(games, 'Dropped');
    expect(result).toHaveLength(1);
  });

  // TODO: Test case 5 — filter by Playing from games list, expect both Playing games returned (not just first)
  test('returns ALL matching games, not just the first', () => {
    const result = filterByStatus(games, 'Playing');
    expect(result).toEqual([
      { id: '3', title: 'Suikoden I', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 4, priority: 'High', progress: 60 },
      { id: '4', title: 'Suikoden II', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 5, priority: 'High', progress: 40 },
    ]);
  });

  // TODO: Test case 6 — filter by Completed from a list with no Completed games, expect []
  test('returns empty array when no games match the status', () => {
    const result = filterByStatus(uncompletedGames, 'Completed');
    expect(result).toBeNull;
    expect(result).toEqual([]);
  });

  // TODO: Test case 7 — filter empty array by Playing, expect []
  test('returns empty array when game list is empty', () => {
    const result = filterByStatus(emptyGameList, 'Playing');
    expect(result).toEqual([]); 
  });
});

// ─── searchGames ──────────────────────────────────────────────────────────────

describe('searchGames', () => {
  // TODO: Test case 1 — search "Hollow Knight", expect [Hollow Knight]
  test('returns games matching full title', () => {
    const result = searchGames(games, 'Hollow Knight');
    expect(result).toEqual(expect.arrayContaining([games[0]]));
    expect(result).toHaveLength(1);
  });

  // TODO: Test case 2 — search "Suikoden", expect Suikoden I, II, III
  test('returns all games matching partial title', () => {
    const result = searchGames(games, 'Suikoden');
    expect(result).toEqual(expect.arrayContaining([games[2], games[3], games[4]]));
    expect(result).toHaveLength(3);
  });

  // TODO: Test case 3 — search "Steamdeck", expect Hollow Knight and Coral Island
  test('returns games matching full platform', () => {
     const result = searchGames(games, 'Steamdeck');
     expect(result).toEqual(expect.arrayContaining([games[0], games[1]]));
     expect(result).toHaveLength(2);
  });

  // TODO: Test case 4 — search "RPG", expect Suikoden I, II, III, Bloodborne
  test('returns games matching full genre', () => {
    const result = searchGames(games, 'RPG');
    expect(result).toEqual(expect.arrayContaining([games[2], games[3], games[4], games[5]]));
    expect(result).toHaveLength(4);
  });

  // TODO: Test case 5 — search "hollow knight" (lowercase), expect [Hollow Knight]
  test('search is case insensitive', () => {
    const result = searchGames(games, 'hollow knight');
    expect(result).toEqual(expect.arrayContaining([games[0]]));
    expect(result).toHaveLength(1);
  });

  // TODO: Test case 6 — search "Suikoden I", expect Suikoden I and Suikoden III (contains "I")
  test('handles spaces and numbers in query', () => {
    const result = searchGames(games, 'Suikoden I');
    expect(result).toEqual(expect.arrayContaining([games[2], games[3], games[4]]));
    expect(result).toHaveLength(3);
  });

  // TODO: Test case 7 — search "Zelda", expect []
  test('returns empty array when no games match', () => {
    const result = searchGames(games, 'Zelda');
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  // TODO: Test case 8 — search "", expect all games
  test('returns all games for empty query', () => {
    const result = searchGames(games, '');
    expect(result).toEqual([
      { id: '1', title: 'Hollow Knight', platform: 'Steamdeck', genre: 'Metroidvania', status: 'Completed', rating: 4, priority: 'High', progress: 100 },
      { id: '2', title: 'Coral Island', platform: 'Steamdeck', genre: 'Simulation', status: 'Dropped', rating: 4, priority: 'Medium', progress: 10 },
      { id: '3', title: 'Suikoden I', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 4, priority: 'High', progress: 60 },
      { id: '4', title: 'Suikoden II', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 5, priority: 'High', progress: 40 },
      { id: '5', title: 'Suikoden III', platform: 'PS2', genre: 'RPG', status: 'Backlog', rating: 3, priority: 'Low', progress: 0 },
      { id: '6', title: 'The Witcher 3: Wild Hunt', platform: 'PS4', genre: 'RPG', status: 'Completed', rating: 5, priority: 'Low', progress: 100 }
    ])
  });

  // TODO: Test case 9 — search "Hollow Knight" on empty array, expect []
  test('returns empty array when game list is empty', () => {
    const result = searchGames(emptyGameList, 'Hollow Knight');
    expect(result).toEqual([]);
  });
});

// ─── sortGames ────────────────────────────────────────────────────────────────

describe('sortGames', () => {
  // TODO: Test case 1 — sort by title, expect alphabetical A–Z order
  test('sorts by title A–Z', () => {
    const result = sortGames(games, 'title');
    expect(result).toEqual([
      { id: '2', title: 'Coral Island', platform: 'Steamdeck', genre: 'Simulation', status: 'Dropped', rating: 4, priority: 'Medium', progress: 10 },
      { id: '1', title: 'Hollow Knight', platform: 'Steamdeck', genre: 'Metroidvania', status: 'Completed', rating: 4, priority: 'High', progress: 100 },
      { id: '3', title: 'Suikoden I', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 4, priority: 'High', progress: 60 },
      { id: '4', title: 'Suikoden II', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 5, priority: 'High', progress: 40 },
      { id: '5', title: 'Suikoden III', platform: 'PS2', genre: 'RPG', status: 'Backlog', rating: 3, priority: 'Low', progress: 0 },
      { id: '6', title: 'The Witcher 3: Wild Hunt', platform: 'PS4', genre: 'RPG', status: 'Completed', rating: 5, priority: 'Low', progress: 100 }
    ])
  });

  // TODO: Test case 2 — sort by rating, expect highest first
  test('sorts by rating highest first', () => {
    const result = sortGames(games, 'rating');
    expect(result).toEqual([
      { id: '4', title: 'Suikoden II', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 5, priority: 'High', progress: 40 },
      { id: '6', title: 'The Witcher 3: Wild Hunt', platform: 'PS4', genre: 'RPG', status: 'Completed', rating: 5, priority: 'Low', progress: 100 },
      { id: '2', title: 'Coral Island', platform: 'Steamdeck', genre: 'Simulation', status: 'Dropped', rating: 4, priority: 'Medium', progress: 10 },
      { id: '1', title: 'Hollow Knight', platform: 'Steamdeck', genre: 'Metroidvania', status: 'Completed', rating: 4, priority: 'High', progress: 100 },
      { id: '3', title: 'Suikoden I', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 4, priority: 'High', progress: 60 },
      { id: '5', title: 'Suikoden III', platform: 'PS2', genre: 'RPG', status: 'Backlog', rating: 3, priority: 'Low', progress: 0 }
    ])
  });

  // TODO: Test case 3 — sort by progress, expect highest first
  test('sorts by progress highest first', () => {
    const result = sortGames(games, 'progress');
    expect(result).toEqual([
      { id: '1', title: 'Hollow Knight', platform: 'Steamdeck', genre: 'Metroidvania', status: 'Completed', rating: 4, priority: 'High', progress: 100 },
      { id: '6', title: 'The Witcher 3: Wild Hunt', platform: 'PS4', genre: 'RPG', status: 'Completed', rating: 5, priority: 'Low', progress: 100 },       
      { id: '3', title: 'Suikoden I', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 4, priority: 'High', progress: 60 },
      { id: '4', title: 'Suikoden II', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 5, priority: 'High', progress: 40 },
      { id: '2', title: 'Coral Island', platform: 'Steamdeck', genre: 'Simulation', status: 'Dropped', rating: 4, priority: 'Medium', progress: 10 },
      { id: '5', title: 'Suikoden III', platform: 'PS2', genre: 'RPG', status: 'Backlog', rating: 3, priority: 'Low', progress: 0 }
    ])
  });

  // TODO: Test case 4 — sort by rating where ties exist, tied games sort alphabetically
  test('breaks rating ties alphabetically by title', () => {
    const ratingTiedGames: Game[] = [
      { id: '3', title: 'Suikoden II', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 4, priority: 'High', progress: 60 },
      { id: '4', title: 'Suikoden I', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 4, priority: 'High', progress: 40 },  
      { id: '5', title: 'Suikoden III', platform: 'PS2', genre: 'RPG', status: 'Backlog', rating: 4, priority: 'Low', progress: 0 },
      { id: '2', title: 'Coral Island', platform: 'Steamdeck', genre: 'Simulation', status: 'Dropped', rating: 4, priority: 'Medium', progress: 10 }
    ];
    const result = sortGames(ratingTiedGames, 'rating');
    expect(result).toEqual([
      { id: '2', title: 'Coral Island', platform: 'Steamdeck', genre: 'Simulation', status: 'Dropped', rating: 4, priority: 'Medium', progress: 10 },
      { id: '4', title: 'Suikoden I', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 4, priority: 'High', progress: 40 },
      { id: '3', title: 'Suikoden II', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 4, priority: 'High', progress: 60 },  
      { id: '5', title: 'Suikoden III', platform: 'PS2', genre: 'RPG', status: 'Backlog', rating: 4, priority: 'Low', progress: 0 }
    ])
  });

  // TODO: Test case 5 — sort by progress where ties exist, tied games sort alphabetically
  // Hint: Hollow Knight and Celeste both have progress 100
  test('breaks progress ties alphabetically by title', () => {
    const result = sortGames(games, 'progress');
    expect(result).toEqual([
      { id: '1', title: 'Hollow Knight', platform: 'Steamdeck', genre: 'Metroidvania', status: 'Completed', rating: 4, priority: 'High', progress: 100 },
      { id: '6', title: 'The Witcher 3: Wild Hunt', platform: 'PS4', genre: 'RPG', status: 'Completed', rating: 5, priority: 'Low', progress: 100 }, 
      { id: '3', title: 'Suikoden I', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 4, priority: 'High', progress: 60 },
      { id: '4', title: 'Suikoden II', platform: 'PS1', genre: 'RPG', status: 'Playing', rating: 5, priority: 'High', progress: 40 }, 
      { id: '2', title: 'Coral Island', platform: 'Steamdeck', genre: 'Simulation', status: 'Dropped', rating: 4, priority: 'Medium', progress: 10 },
      { id: '5', title: 'Suikoden III', platform: 'PS2', genre: 'RPG', status: 'Backlog', rating: 3, priority: 'Low', progress: 0 }
    ])
  });
    
  // TODO: Test case 6, 7, 8 — sort empty array by each sortBy, expect []
  test('returns empty array for empty list sorted by title', () => {
    const result = sortGames([], 'title');
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
  test('returns empty array for empty list sorted by rating', () => {
    const result = sortGames([], 'rating');
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
  test('returns empty array for empty list sorted by progress', () => {
    const result = sortGames([], 'progress');
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});
