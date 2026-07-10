/// <reference types="cypress" />
// E2E tests for Filter and Search flows
// Covers TEST_PLAN.md sections 5.3 and 5.4

function seedGames() {
  const games = [
    { title: 'Hollow Knight', platform: 'PC', genre: 'Metroidvania', status: 'Completed', priority: 'High', rating: 5, progress: 100 },
    { title: 'Celeste', platform: 'PC', genre: 'Platformer', status: 'Completed', priority: 'Medium', rating: 4, progress: 100 },
    { title: 'Suikoden I', platform: 'PS1', genre: 'RPG', status: 'Playing', priority: 'High', rating: 5, progress: 60 },
    { title: 'Suikoden II', platform: 'PS1', genre: 'RPG', status: 'Backlog', priority: 'Low', rating: 3, progress: 0 },
    { title: 'Bloodborne', platform: 'PS4', genre: 'Action RPG', status: 'Dropped', priority: 'Low', rating: 4, progress: 30 },
  ];

  games.forEach(game => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('SUPABASE_URL')}/rest/v1/games`,
      headers: {
        apikey: Cypress.env('SUPABASE_ANON_KEY'),
        Authorization: `Bearer ${Cypress.env('SUPABASE_ANON_KEY')}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: game,
    });
  });
}

describe('Filter', () => {
  beforeEach(() => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('SUPABASE_URL')}/rest/v1/games?title=neq.`,
      headers: {
        apikey: Cypress.env('SUPABASE_ANON_KEY'),
        Authorization: `Bearer ${Cypress.env('SUPABASE_ANON_KEY')}`,
        Prefer: 'return=minimal',
      },
    });
    seedGames();
    cy.visit('/');
  });

  // TODO: Test case 1 — filter by Playing, only Playing games visible
  it('shows only Playing games when filtered by Playing', () => {});

  // TODO: Test case 2 — filter by Completed, only Completed games visible
  it('shows only Completed games when filtered by Completed', () => {});

  // TODO: Test case 8 — filter by status with no matches, empty state shown
  it('shows empty state when no games match the filter', () => {});

  // TODO: Test case 9 — clear filter, all games visible again
  it('shows all games when filter is cleared', () => {});
});

describe('Search', () => {
  beforeEach(() => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('SUPABASE_URL')}/rest/v1/games?title=neq.`,
      headers: {
        apikey: Cypress.env('SUPABASE_ANON_KEY'),
        Authorization: `Bearer ${Cypress.env('SUPABASE_ANON_KEY')}`,
        Prefer: 'return=minimal',
      },
    });
    seedGames();
    cy.visit('/');
  });

  // TODO: Test case 1 — search by full title, only matching game visible
  it('shows only matching game when searching by full title', () => {});

  // TODO: Test case 2 — search by partial title, all matching games visible
  it('shows all games matching partial title', () => {});

  // TODO: Test case 3 — search by platform
  it('shows only games on matching platform', () => {});

  // TODO: Test case 5 — search is case insensitive
  it('finds games regardless of search casing', () => {});

  // TODO: Test case 6 — no matches, empty state shown
  it('shows empty state when search has no matches', () => {});

  // TODO: Test case 7 — clear search, all games visible again
  it('shows all games when search is cleared', () => {});
});
