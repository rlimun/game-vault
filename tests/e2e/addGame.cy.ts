 /// <reference types="cypress" />
// E2E tests for the Add Game flow
// Covers TEST_PLAN.md section 5.1
describe('Add Game', () => {
  beforeEach(() => {
    cy.request({
    method: 'DELETE',                         
    url: `${Cypress.env('SUPABASE_URL')}/rest/v1/games?title=neq.` ,
    headers: {                                
      apikey: Cypress.env('SUPABASE_ANON_KEY'),                                                                                              
      Authorization: `Bearer ${Cypress.env('SUPABASE_ANON_KEY')}`,
      Prefer: 'return=minimal',                                                                                                              
    },                                                                                                                                     
  });                                     
    cy.visit('/');                                                                                                                           
    cy.get('button').contains('+ Add Game').click();  
  });

  // TODO: Test case 1 — fill out all fields and save, game appears in list
  it('adds a game with all fields filled out', () => {
    cy.get('form').contains('label', 'Title').find('input').type('Final Fantasy VII: Remake')  
    cy.get('form').contains('label', 'Platform').find('input').type('PS4')  
    cy.get('form').contains('label', 'Genre').find('input').type('RPG')  
    cy.get('form').contains('label', 'Status').find('select').select('Playing')
    cy.get('form').contains('label', 'Priority').find('select').select('High')
    cy.get('.star-rating span:nth-child(4)').click();   
    cy.get('form input[type="range"]').then($slider => {                                                                                       
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set;                         
        nativeInputValueSetter!.call($slider[0], 75);                                                                                            
        $slider[0].dispatchEvent(new Event('input', { bubbles: true }));
      });                  
    cy.get('button').contains('Save').click();
    cy.get('.modal').should('not.exist');
    cy.contains('.game-card', 'Final Fantasy VII: Remake')
      .should('be.visible')                                                                                                                    
      .within(() => {                                                                                                                          
        cy.contains('PS4').should('be.visible');                                                                                               
        cy.contains('RPG').should('be.visible');                                                                                               
        cy.contains('Playing').should('be.visible');
        cy.contains('High').should('be.visible');                                                                                              
        cy.get('.progress-fill').should('have.attr', 'style', 'width: 75%;');                                                                
    });  
  });

  // TODO: Test case 4 — save without a title, error appears, game not added
  it('shows error when saving without a title', () => {
    cy.get('form').contains('label', 'Platform').find('input').type('PS4')  
    cy.get('form').contains('label', 'Genre').find('input').type('RPG')  
    cy.get('form').contains('label', 'Status').find('select').select('Playing')
    cy.get('form').contains('label', 'Priority').find('select').select('High')
    cy.get('.star-rating span:nth-child(4)').click();   
    cy.get('button').contains('Save').click();
    cy.contains('.error', 'Title is required.')
  });

  // TODO: Test case 6 — save without a rating, error appears, game not added
  it('shows error when saving without a rating', () => {
    cy.get('form').contains('label', 'Title').find('input').type('Test')  
    cy.get('form').contains('label', 'Platform').find('input').type('PS4')  
    cy.get('form').contains('label', 'Genre').find('input').type('RPG')  
    cy.get('form').contains('label', 'Status').find('select').select('Playing')
    cy.get('form').contains('label', 'Priority').find('select').select('High')
    cy.get('button').contains('Save').click();
    cy.contains('.error', 'Rating must be between 1 and 5.')
  });

  // TODO: Test case 11 — click Cancel, form closes, list unchanged
  it('closes the form without adding when Cancel is clicked', () => {
    cy.get('form').contains('label', 'Title').find('input').type('Hollow Knight')  
    cy.get('button').contains('Cancel').click();
    cy.get('.modal').should('not.exist');
    cy.get('body').should('not.contain', 'Hollow Knight');  
  });
});
