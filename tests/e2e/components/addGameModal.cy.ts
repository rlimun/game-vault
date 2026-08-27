class AddGameModal {
  enterTitle(title: string) {
    cy.get('form')
      .contains('label', 'Title')
      .find('input')
      .type(title)
  }

  enterPlatform(platform: string) {
    cy.get('form').contains('label', 'Platform').find('input').type(platform);  
  }

  selectStatus(status: string) {
   cy.get('form').contains('label', 'Status').find('select').select(status);
  }

  save() {
    cy.contains('button', 'Save').click()
  }
}

export const addGameModal = new AddGameModal()