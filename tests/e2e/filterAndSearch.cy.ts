/// <reference types="cypress" />
// E2E tests for Filter and Search flows
// Covers TEST_PLAN.md sections 5.3 and 5.4

const COMPLETED_STATUS = 'Completed';
const PLAYING_STATUS = 'Playing';
const BACKLOG_STATUS = 'Backlog';
const DROPPED_STATUS = 'Dropped';
const TOTAL_NUM_GAMES = 5;
const GAME_CARD = '.game-card';

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

 function deleteGamesByStatus(status: string) {                                                                                                                                                                                                                                                                                                                    
    cy.request({                                                                                                                                                                                                                                                                                                                                                    
      method: 'DELETE',                                                                                                                                                                                                                                                                                                                                             
      url: `${Cypress.env('SUPABASE_URL')}/rest/v1/games?status=eq.${status}`,
      headers: {                                                                                                                                                                                                                                                                                                                                                    
        apikey: Cypress.env('SUPABASE_ANON_KEY'),                                                                                                                                                                                                                                                                                                                   
        Authorization: `Bearer ${Cypress.env('SUPABASE_ANON_KEY')}`,                                                                                                                                                                                                                                                                                                
        Prefer: 'return=minimal',
      },                                                                                                                                                                                                                                                                                                                                                            
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

  // Test case 1 — filter by Playing, only Playing games visible
  it('shows only Playing games when filtered by Playing', () => {
    cy.get('[data-testid="status-filter"]').select(PLAYING_STATUS);
    cy.get(GAME_CARD).each($card => {                                                                                                                                                                                                                                                                                                                              
      cy.wrap($card).find('p').contains('Status: ' + PLAYING_STATUS).should('be.visible');                                                                                                                                                                                                                                                                                                        
    }); 
    cy.get(GAME_CARD).should('have.length', 1);
  });

  // Test case 2 — filter by Completed, only Completed games visible
  it('shows only Completed games when filtered by Completed', () => {
    cy.get('[data-testid="status-filter"]').select(COMPLETED_STATUS);
    cy.get(GAME_CARD).each($card => {                                                                                                                                                                                                                                                                                                                              
      cy.wrap($card).find('p').contains('Status: ' + COMPLETED_STATUS).should('be.visible');                                                                                                                                                                                                                                                                                                        
    }); 
    cy.get(GAME_CARD).should('have.length', 2);
  });

   // Test case 3 — filter by Backlog, only Backlog games visible
  it('shows only Backlog games when filtered by Backlog', () => {
    cy.get('[data-testid="status-filter"]').select(BACKLOG_STATUS);
    cy.get(GAME_CARD).each($card => {                                                                                                                                                                                                                                                                                                                              
      cy.wrap($card).find('p').contains('Status: ' + BACKLOG_STATUS).should('be.visible');                                                                                                                                                                                                                                                                                                        
    }); 
    cy.get(GAME_CARD).should('have.length', 1);
  });

   // Test case 4 — filter by Dropped, only Dropped games visible
  it('shows only Dropped games when filtered by Dropped', () => {
    cy.get('[data-testid="status-filter"]').select(DROPPED_STATUS);
    cy.get(GAME_CARD).each($card => {                                                                                                                                                                                                                                                                                                                              
      cy.wrap($card).find('p').contains('Status: ' + DROPPED_STATUS).should('be.visible');                                                                                                                                                                                                                                                                                                        
    }); 
    cy.get(GAME_CARD).should('have.length', 1);
  });

  // Test case 8 — filter by status with no matches, empty state shown
  it('shows empty state when no games match the filter', () => {
    deleteGamesByStatus(DROPPED_STATUS);
    cy.reload();
    cy.get('[data-testid="status-filter"]').select(DROPPED_STATUS);
    cy.get(GAME_CARD).should('not.exist');
  });

  // Test case 9 — clear filter, all games visible again
  it('shows all games when filter is cleared', () => {
    cy.get('[data-testid="status-filter"]').select(DROPPED_STATUS);
    cy.get(GAME_CARD).should('have.length', 1);
    cy.get('[data-testid="status-filter"]').select('');
    cy.get(GAME_CARD).should('have.length', TOTAL_NUM_GAMES);
  });
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

  // Test case 1 — search by full title, only matching game visible
  it('shows only matching game when searching by full title', () => {
    cy.get('[data-testid="search-input"]').type('Suikoden II');
    cy.get(GAME_CARD).should('have.length', 1);   
    cy.get(GAME_CARD).each($card => {         
      cy.wrap($card).find('h3').contains('Suikoden II').should('be.visible');                                                                                                                                                                                                                                                                                          
    }); 
  });

  // Test case 2 — search by partial title, all matching games visible
  it('shows all games matching partial title', () => {
    cy.get('[data-testid="search-input"]').type('Suikoden I');
    cy.get(GAME_CARD).should('have.length', 2);   
    cy.get(GAME_CARD).each($card => {         
      cy.wrap($card).find('h3').contains('Suikoden I').should('be.visible');                                                                                                                                                                                                                                                                                          
    });
  });

  // Test case 3 — search by platform
  it('shows only games on matching platform', () => {
    cy.get('[data-testid="search-input"]').type('PS4');
    cy.get(GAME_CARD).should('have.length', 1);   
    cy.get(GAME_CARD).each($card => {         
      cy.wrap($card).find('p').contains('PS4').should('be.visible');                                                                                                                                                                                                                                                                                          
    });
  });

  // Test case 4 — search by genre            
  it('shows only games matching genre', () => {
    cy.get('[data-testid="search-input"]').type('RPG');
    cy.get(GAME_CARD).should('have.length', 3);   
    cy.get(GAME_CARD).each($card => {         
      cy.wrap($card).find('p').contains('RPG').should('be.visible');                                                                                                                                                                                                                                                                                          
    });
  });

  // Test case 5 — search is case insensitive
  it('finds games regardless of search casing', () => {
    cy.get('[data-testid="search-input"]').type('bloodBorne');
    cy.get(GAME_CARD).should('have.length', 1);   
    cy.get(GAME_CARD).each($card => {         
      cy.wrap($card).find('h3').contains('Bloodborne').should('be.visible');                                                                                                                                                                                                                                                                                          
    });
  });

  // Test case 6 — no matches, empty state shown
  it('shows empty state when search has no matches', () => {
    cy.get('[data-testid="search-input"]').type('no_match_title');
    cy.get(GAME_CARD).should('not.exist');
  });

  // Test case 7 — clear search, all games visible again
  it('shows all games when search is cleared', () => {
    cy.get('[data-testid="search-input"]').type('PC');
    cy.get(GAME_CARD).should('have.length', 2);   
    cy.get('[data-testid="search-input"]').clear();
    cy.get(GAME_CARD).should('have.length', TOTAL_NUM_GAMES);
  });

  // Test case 8 — search while filter is Playing
  it('respects both search query and Playing status filter', () => {
    cy.get('[data-testid="search-input"]').type('Suikoden');
    cy.get(GAME_CARD).should('have.length', 2);
    cy.get('[data-testid="status-filter"]').select(PLAYING_STATUS);
    cy.get(GAME_CARD).should('have.length', 1);   
    cy.get(GAME_CARD).each($card => {         
      cy.wrap($card).find('h3').contains(/^Suikoden I$/).should('be.visible');                                                                                                                                                                                                                                                                                          
    });
  });
});
