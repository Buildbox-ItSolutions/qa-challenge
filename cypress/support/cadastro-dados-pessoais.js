/// <reference types="Cypress"/>

Cypress.Commands.add('cadastro_dados_pessoais', (firstName, lastName, birthDate, cpf, email, password)=>{
  cy.get('[data-cy="button-btn-enroll"]').click()
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(firstName)
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(lastName)
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(birthDate)
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(cpf)
    cy.get('[data-cy="input-signup-personal-data-email"]').type(email)
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type(email)
    cy.get('[data-cy="input-signup-personal-data-password"]').type(password)
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]').type(password)
    cy.get('div[class*="lg:w-7/12"] > .form-container > div.relative > .justify-between').click()
    cy.get('#dropdown-button-1 > .overflow-y-scroll > :nth-child(3)').click()
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').click()
    cy.get('[data-cy="button-signup_submit_button_1"]').click()
})