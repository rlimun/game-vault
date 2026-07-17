/// <reference types="cypress" />
// E2E tests for the Edit Game flow
// Covers TEST_PLAN.md section 5.2

const initialTitle = 'Hollow Knight';
const initialPlatform = 'PC';
const initialGenre = 'Metroidvania';
const initialStatus = 'Playing';
const initialPriority = 'Low';
const initialRating = 1;
const initialProgress = 50;
const saveButton = 'Save';

// Helper to add a game via API so we have something to edit
function seedGame(overrides = {}) {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('SUPABASE_URL')}/rest/v1/games`,
    headers: {
      apikey: Cypress.env('SUPABASE_ANON_KEY'),
      Authorization: `Bearer ${Cypress.env('SUPABASE_ANON_KEY')}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: {
      title: initialTitle,
      platform: initialPlatform,
      genre: initialGenre,
      status: initialStatus,
      priority: initialPriority,
      rating: initialRating,
      progress: initialProgress,
      ...overrides,
    },
  });
}


describe('Edit Game', () => {
  beforeEach(() => {
    // Clear all games then seed one to edit
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('SUPABASE_URL')}/rest/v1/games?title=neq.`,
      headers: {
        apikey: Cypress.env('SUPABASE_ANON_KEY'),
        Authorization: `Bearer ${Cypress.env('SUPABASE_ANON_KEY')}`,
        Prefer: 'return=minimal',
      },
    });
    seedGame();
    cy.visit('/');
    cy.get('button').contains('Edit').click();
  });

  it('opens edit form pre-filled with current game values', () => {
    cy.get('.modal').within(() => {
      cy.contains('h2', 'Edit Game');
      cy.contains('label', 'Platform').find('input').should('have.value', 'PC');
      cy.contains('label', 'Status').find('select').should('have.value', 'Playing'); 
    });
  });

  // TODO: Test case 2 — edit all fields and save, GameCard updates
  it('updates all fields when saved', () => {
    const newTitle = 'New Title';
    const newPlatform = 'New Platform';
    const newGenre = 'New Genre';
    const newStatus = 'Dropped';
    const newPriority = 'High';
    const newStarRating = 5;
    const expectedStars = '★'.repeat(newStarRating) + '☆'.repeat(5 - newStarRating);
    const newProgressPercentage = 90;

    cy.contains('label', 'Title').find('input').clear().type(newTitle);
    cy.contains('label', 'Platform').find('input').clear().type(newPlatform);
    cy.contains('label', 'Genre').find('input').clear().type(newGenre);
    cy.contains('label', 'Status').find('select').select(newStatus);
    cy.contains('label', 'Priority').find('select').select(newPriority);
    cy.selectStarRating(newStarRating);
    cy.moveProgressSlider(newProgressPercentage);
    cy.clickButton(saveButton);
    cy.contains('.game-card', newTitle)
      .should('be.visible')                                                                                                                    
      .within(() => {                                                                                                                          
        cy.contains(newPlatform).should('be.visible');                                                                                               
        cy.contains(newGenre).should('be.visible');                                                                                               
        cy.contains(newStatus).should('be.visible');
        cy.contains(newPriority).should('be.visible'); 
        cy.get('[data-testid="rating"]').should('have.text', `Rating: ${expectedStars}`);                                                                                                
        cy.get('.progress-fill').should('have.attr', 'style', 'width: ' + newProgressPercentage + '%;');                                                                
    });  
  });

  // TODO: Test case 3 — edit title only, other fields unchanged
  it('updates title only, other fields remain the same', () => {
    const newTitle = 'New Title';
    const expectedStars = '★'.repeat(initialRating) + '☆'.repeat(5 - initialRating);

    cy.contains('label', 'Title').find('input').clear().type(newTitle);
    cy.clickButton(saveButton);
    cy.contains('.game-card', newTitle)
      .should('be.visible')                                                                                                                    
      .within(() => {                                                                                                                          
        cy.contains(initialPlatform).should('be.visible');                                                                                               
        cy.contains(initialGenre).should('be.visible');                                                                                               
        cy.contains(initialStatus).should('be.visible');
        cy.contains(initialPriority).should('be.visible');        
        cy.get('[data-testid="rating"]').should('have.text', `Rating: ${expectedStars}`);                                                                                 
        cy.get('.progress-fill').should('have.attr', 'style', 'width: ' + initialProgress + '%;');                                                                
    });  
  });

  // TODO: Test case 4 — change status to Completed, progress auto-sets to 100 and slider disabled
  it('auto-sets progress to 100 and disables slider when status changed to Completed', () => {
    cy.contains('label', 'Status').find('select').select('Completed');                                                                                                                 
    cy.get('form input[type="range"]').should('have.value', '100');                                                                                                                    
    cy.get('form input[type="range"]').should('be.disabled');           
  });

  // TODO: Test case 5 — change status away from Completed, progress resets to 0 and slider re-enables
  it('resets progress to 0 and re-enables slider when status changed away from Completed', () => {
    cy.contains('label', 'Status').find('select').select('Completed');                                                                                                                 
    cy.contains('label', 'Status').find('select').select('Playing');                                                                                                                   
    cy.get('form input[type="range"]').should('have.value', '0');   
    cy.get('form input[type="range"]').should('not.be.disabled');   
  });

  // TODO: Test case 12 — click Cancel without changes, form closes, GameCard unchanged
  it('closes form without saving when Cancel is clicked', () => {
    cy.clickButton('Cancel');                   
    cy.get('.modal').should('not.exist');                                                                                                                                              
    cy.contains('.game-card', initialTitle)
      .should('be.visible')                                                                                                                                                            
      .within(() => {      
        cy.contains(initialPlatform).should('be.visible');                                                                                                                             
        cy.contains(initialStatus).should('be.visible');  
      });   
    });
});
