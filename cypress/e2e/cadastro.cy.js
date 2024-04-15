const credentials = require('../fixtures/credentials.json')
const credentialsPersona = require('../fixtures/credentialsPersona.json')
const credentialsWrong = require('../fixtures/credentialsWrong.json')

describe('Cadastrar usuário', () => {
  beforeEach(() => {
    //Acessa a página de "Cadastro"
    cy.visit('https://qastage.buildbox.one/18/cadastro')
  })

  it('SUCESSO - Cadastrar usuário', () => {
    //Coloca as informações necessárias com dados válidos na tela de dados pessoais e de acesso
    cy.cadastro_dados_pessoais(credentials.firstName, credentials.lastName, credentials.birthDate, credentials.cpf, credentials.email, credentials.password)

    //Coloca as informações necessárias com dados válidos na tela de endereço
    cy.get('[data-cy="input-signup-address-cep"]').type(credentials.cep)
    cy.get('[data-cy="input-signup-address-number"]').type(credentials.number)
    cy.get('[data-cy="button-signup_submit_button_3"]').click()
    cy.get('[data-cy="button-wide_window_button"]').click()
  })

  it('FALHA - Cadastrar usuário com data de aniversário inválida', () => {
    //Coloca as informações necessárias com dados válidos na tela de dados pessoais e de acesso
    cy.get('[data-cy="button-btn-enroll"]').click()
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(credentialsPersona.firstName)
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(credentialsPersona.lastName)
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(credentialsWrong.birthDate)
    cy.get('.input-error').should('contain', 'Data de nascimento inválida.')
  })

  it('FALHA - Cadastrar usuário com CPF inválido', () => {
    //Coloca as informações necessárias com dados válidos na tela de dados pessoais e de acesso
    cy.get('[data-cy="button-btn-enroll"]').click()
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(credentialsPersona.firstName)
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(credentialsPersona.lastName)
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(credentialsPersona.birthDate)
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(credentialsWrong.cpf)
    cy.get('[data-cy="input-signup-personal-data-email"]').type(credentialsPersona.email)
    cy.get(':nth-child(2) > .form-container > .input-error').should('contain', 'CPF inválido.')
  })

  it('FALHA - Cadastrar usuário com email inválido', () => {
    //Coloca as informações necessárias com dados válidos na tela de dados pessoais e de acesso
    cy.get('[data-cy="button-btn-enroll"]').click()
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(credentialsPersona.firstName)
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(credentialsPersona.lastName)
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(credentialsPersona.birthDate)
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(credentialsPersona.cpf)
    cy.get('[data-cy="input-signup-personal-data-email"]').type(credentialsWrong.email)
    cy.get('.input-error').should('contain', 'Precisa ser email')
  })

  it('FALHA - Cadastrar usuário com emails diferentes', () => {
    //Coloca as informações necessárias com dados válidos na tela de dados pessoais e de acesso
    cy.get('[data-cy="button-btn-enroll"]').click()
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(credentialsPersona.firstName)
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(credentialsPersona.lastName)
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(credentialsPersona.birthDate)
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(credentialsPersona.cpf)
    cy.get('[data-cy="input-signup-personal-data-email"]').type(credentialsPersona.email)
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type(credentialsWrong.email)
    cy.get('.input-error').should('contain', 'Os e-mails não são iguais')
  })

  it('FALHA - Cadastrar usuário com senhas diferentes', () => {
    //Coloca as informações necessárias com dados válidos na tela de dados pessoais e de acesso
    cy.get('[data-cy="button-btn-enroll"]').click()
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(credentialsPersona.firstName)
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(credentialsPersona.lastName)
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(credentialsPersona.birthDate)
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(credentialsPersona.cpf)
    cy.get('[data-cy="input-signup-personal-data-email"]').type(credentialsPersona.email)
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type(credentialsPersona.email)
    cy.get('[data-cy="input-signup-personal-data-password"]').type(credentialsPersona.password)
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]').type(credentialsWrong.password)
    cy.get('.input-error').should('contain', 'As senhas não são iguais.')
  })

  it.only('FALHA - Cadastrar usuário com CEP inválido', () => {
    //Coloca as informações necessárias com dados válidos na tela de dados pessoais e de acesso
    cy.cadastro_dados_pessoais(credentialsPersona.firstName, credentialsPersona.lastName, credentialsPersona.birthDate, credentialsPersona.cpf, credentialsPersona.email, credentialsPersona.password)

    //Coloca as informações necessárias com dados válidos na tela de endereço
    cy.get('[data-cy="input-signup-address-cep"]').type('00000000')
    cy.get('[data-cy="input-signup-address-number"]').type(credentialsPersona.number)
    cy.get('.toast').should('contain', 'CEP não encontrado')
  })
})