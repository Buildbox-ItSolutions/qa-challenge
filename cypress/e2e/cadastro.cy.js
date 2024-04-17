import data from '../fixtures/lead.json'

describe('cadastro', () => {
  beforeEach(() => {
    cy.visit('/18/cadastro')
    cy.contains('h1', 'Welcome to English Pass') // checkpoint
      .should('be.visible')
  })

  it('deve cadastrar um novo perfil', () => {

    const lead = data.create

    cy.contains('h2', 'Dados Pessoais e de acesso') // checkpoint step 01
      .should('exist')

    cy.get('[data-cy="button-btn-enroll"]').click()

    // step 01/02
    cy.signupPersonal(lead)

    cy.signupPersonalEnglishLevel(lead)

    cy.signupPersonalLgpd().check().uncheck().check() // custom commands

    cy.get('[data-cy="button-signup_submit_button_1"]').click()

    // step 02/02
    cy.signupPersonalAddress(lead)

    cy.get('[data-cy="button-signup_submit_button_3"]').click()

    cy.contains('Welcome to English Pass').should('exist')
  })

  context('entradas válidas e inválidas, campos obrigatórios e formatos de dados', () => {

    it('campo obrigatório', () => {

      cy.get('[data-cy="button-btn-enroll"]').click()

      // browser message is not html
      cy.isRequired('Preencha este campo.') // input-signup-personal-data-firstName
    })

    it('campo inválido', () => {

      const lead = data.invalid

      cy.get('[data-cy="button-btn-enroll"]').click()

      cy.get('[data-cy="input-signup-personal-data-firstName"]')
        .type(lead.firstName)

      cy.get('[data-cy="input-signup-personal-data-lastName"]')
        .type(lead.lastName)

      cy.get('[data-cy="input-signup-personal-data-birthDate"]')
        .type(lead.birthDate)
      cy.get('.input-error')
        .should('contain', 'Data de nascimento inválida.')
    })
  })

  it.only('cliente já cadastrado com esse cpf', () => {

    const lead = data.create

    cy.visit('/18/cadastro')

    cy.get('[data-cy="button-btn-enroll"]').click()

    cy.get('[data-cy="input-signup-personal-data-cpf"]')
      .type(lead.cpf)
    cy.get('[data-cy="input-signup-personal-data-email"]')
      .type(lead.email)
    cy.get('.input-error')
      .should('contain', 'Este CPF já está em uso.')
  })

})