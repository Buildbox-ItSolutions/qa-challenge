// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('signupPersonal', (lead) => {
    cy.get('[data-cy="input-signup-personal-data-firstName"]')
        .type(lead.firstName)

    cy.get('[data-cy="input-signup-personal-data-lastName"]')
        .type(lead.lastName)

    cy.get('[data-cy="input-signup-personal-data-birthDate"]')
        .type(lead.birthDate)

    cy.get('[data-cy="input-signup-personal-data-cpf"]')
        .type(lead.cpf)

    cy.get('[data-cy="input-signup-personal-data-email"]')
        .type(lead.email)
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]')
        .type(lead.email)

    cy.get('[data-cy="input-signup-personal-data-password"]')
        .type(lead.password)
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]')
        .type(lead.password)
})

Cypress.Commands.add('signupPersonalEnglishLevel', (lead) => {
    cy.get('button[aria-controls="dropdown-button-1"') // accessibility element
        .should('have.attr', 'aria-expanded', 'false').click()
    cy.contains('[x-text="option.value"]', lead.englishLevel)
        .should('be.visible').click()
})

Cypress.Commands.add('signupPersonalLgpd', () => {
    cy.get('[data-cy="button-signup_submit_button_1"]')
    cy.get('[data-cy="input-signup-personal-data-lgpd"]')
})

Cypress.Commands.add('signupPersonalAddress', (lead) => {
    cy.contains('h2', 'Endereço') // checkpoint step 02
        .should('exist')

    cy.get('[data-cy="input-signup-address-cep"]')
        .type(lead.address.cep)

    cy.get('[data-cy="input-signup-address-number"]')
        .type(lead.address.number)

    cy.get('[data-cy="input-signup-address-complement"]')
        .type(lead.address.complement)

    cy.get('[data-cy="input-signup-address-country"]')  // readonly field 
        .should('have.prop', 'disabled', true)
        .should('have.value', lead.address.country)
    cy.get('[data-cy="input-signup-address-state"]')  // readonly field
        .should('have.prop', 'disabled', true)
        .should('have.value', lead.address.state)
    cy.get('[data-cy="input-signup-address-city"]')  // readonly field
        .should('have.prop', 'disabled', true)
        .should('have.value', lead.address.city)

    cy.get('[data-cy="input-signup-address-neighborhood"]')
        .should('have.value', lead.address.neighborhood)

    cy.get('[data-cy="input-signup-address-street"]')
        .should('have.value', lead.address.street)
})

Cypress.Commands.add('isRequired', (targetMessage) => {
    cy.get('[data-cy="input-signup-personal-data-firstName"]')
      .invoke('prop', 'validationMessage')
      .should((text) => {
        expect(
            targetMessage
        ).to.eq(text)
      })
})