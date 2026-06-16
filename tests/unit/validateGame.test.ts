import type { Game } from '../../src/types';
import { validateGame } from '../../src/utils/gameUtils';

// ─── validateGame ─────────────────────────────────────────────────────────────

describe('validateGame', () => {
  // TODO: Test case 1 — title and rating only, expect { valid: true }
  test('passes with only title and rating provided', () => {
    const result = validateGame({ title: 'Hollow Knight', rating: 3 });
    expect(result.valid).toBe(true);
  });

  // TODO: Test case 2 — all fields, status Completed, progress 100, expect { valid: true }
  test('passes with all fields, status Completed and progress 100', () => {
    const result = validateGame({ title: 'The Witcher 3: Wild Hunt', platform: 'PS4', genre: 'RPG', status: 'Completed', rating: 5, priority: 'Low', progress: 100 });
    expect(result.valid).toBe(true);
  });

  // TODO: Test case 3 — all fields, status not Completed, progress under 100, expect { valid: true }
  test('passes with all fields, status not Completed and progress under 100', () => {
    const result = validateGame({ title: 'The Witcher 3: Wild Hunt', platform: 'PS4', genre: 'RPG', status: 'Playing', rating: 5, priority: 'Low', progress: 75 });
    expect(result.valid).toBe(true);
  });

  // TODO: Test case 4 — title exactly 100 characters, expect { valid: true }
  // Hint: 'a'.repeat(100) gives you a 100-character string
  test('passes with title at exactly 100 characters', () => {
    const result = validateGame({ title: 'a'.repeat(100), platform: 'PS4', genre: 'RPG', status: 'Playing', rating: 5, priority: 'Low', progress: 75 });
    expect(result.valid).toBe(true);
  });

  // TODO: Test case 5 — empty title, expect { valid: false }
  test('fails with empty title', () => {
    const result = validateGame({ title: '', rating: 5 });
    expect(result.valid).toBe(false);
  });

  // TODO: Test case 6 — whitespace-only title, expect { valid: false }
  test('fails with whitespace-only title', () => {
     const result = validateGame({ title: ' ', rating: 5 });
    expect(result.valid).toBe(false);
  });

  // TODO: Test case 7 — title with leading/trailing spaces, expect { valid: true }
  // The function trims before validating, so "  Hollow Knight  " is valid
  test('passes with title that has leading/trailing spaces', () => {
    const result = validateGame({ title: '   The Witcher 3: Wild Hunt', rating: 5 });
    expect(result.valid).toBe(true);
  });

  // TODO: Test case 8 — title exceeds 100 characters, expect { valid: false }
  // Hint: 'a'.repeat(101)
  test('fails with title exceeding 100 characters', () => {
    const result = validateGame({ title: 'a'.repeat(101), rating: 5 });
    expect(result.valid).toBe(false);
  });

  // TODO: Test case 9 — rating 0 (unrated), expect { valid: false }
  test('fails with rating 0', () => {
    const result = validateGame({ title: 'Hollow Knight', rating: 0 });
    expect(result.valid).toBe(false);
  });

  // TODO: Test case 10 — negative rating, expect { valid: false }
  test('fails with negative rating', () => {
    const result = validateGame({ title: 'Hollow Knight', rating: -1 });
    expect(result.valid).toBe(false);
  });

  // TODO: Test case 11 — rating above 5, expect { valid: false }
  test('fails with rating above 5', () => {
    const result = validateGame({ title: 'Hollow Knight', rating: 6 });
    expect(result.valid).toBe(false);
  });

  // TODO: Test case 12 — negative progress, expect { valid: false }
  test('fails with negative progress', () => {
    const result = validateGame({ title: 'Hollow Knight', platform: 'PS4', genre: 'RPG', status: 'Playing', rating: 5, priority: 'Low', progress: -1 });
    expect(result.valid).toBe(false);
  });

  // TODO: Test case 13 — progress above 100, expect { valid: false }
  test('fails with progress above 100', () => {
    const result = validateGame({ title: 'Hollow Knight', platform: 'PS4', genre: 'RPG', status: 'Playing', rating: 5, priority: 'Low', progress: 101 });
    expect(result.valid).toBe(false);
  });

  // TODO: Test case 14 — status Completed but progress not 100, expect { valid: false }
  test('fails when status is Completed but progress is not 100', () => {
    const result = validateGame({ title: 'Hollow Knight', platform: 'PS4', genre: 'RPG', status: 'Completed', rating: 5, priority: 'Low', progress: 50 });
    expect(result.valid).toBe(false);
  });

  // TODO: Test case 15 — progress within 0–100, expect { valid: true }
  test('passes with progress manually set within 0–100', () => {
    const result = validateGame({ title: 'Hollow Knight', platform: 'PS4', genre: 'RPG', status: 'Playing', rating: 5, priority: 'Low', progress: 100 });
    expect(result.valid).toBe(true);
  });

  // TODO: Test case 16 — progress 100 but status not Completed, expect { valid: true }
  // Status does NOT auto-change to Completed
  test('passes with progress 100 and status not Completed', () => {
    const result = validateGame({ title: 'Hollow Knight', platform: 'PS4', genre: 'RPG', status: 'Playing', rating: 5, priority: 'Low', progress: 90 });
    expect(result.valid).toBe(true);
  });
});
