export {}

declare global {
  namespace Cypress {
    interface Chainable {
      moveProgressSlider(value: number): void
      selectStarRating(rating: number): void
      clickButton(button: string): void
    }
  }
}

Cypress.Commands.add('moveProgressSlider', (value: number) => {
     cy.get('form input[type="range"]').then($slider => {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set;
        nativeInputValueSetter!.call($slider[0], value);
        $slider[0].dispatchEvent(new Event('input', { bubbles: true }));
    });
});

Cypress.Commands.add('selectStarRating', (rating: number) => {
    cy.get(".star-rating span:nth-child(" + rating + ")").click();
});

Cypress.Commands.add('clickButton', (button: string) => {
    cy.get('button').contains(button).click();
});  