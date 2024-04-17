/// <reference types="cypress" />


Cypress.Commands.add('tab', { prevSubject: 'element' }, ($element) => {
  cy.wrap($element).trigger('keydown', { keyCode: 9, which: 9, force: true });
});

Cypress.Commands.add('loginUI', (email, password) => {
  cy.wait(5000);
  cy.get('input[name="log"]').type(email)
  cy.get('input[name="pwd"]').type(password)
  cy.get('input[name="wp-submit"]').click()
});

declare namespace Cypress {
  interface Chainable {
    tab(): Chainable<void>,
    loginUI(email: string, password: string): Chainable<void>,
  }
}