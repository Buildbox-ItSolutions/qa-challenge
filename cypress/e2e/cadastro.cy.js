const persona = require('../fixtures/personas.json');
const backgroundImage = 'url("https://qastage.buildbox.one/wp-content/themes/bx-wp-theme/assets/images/register-welcome.jpg")'

describe('Cadastro spec', () => {

  beforeEach(()=>{
    cy.visit('https://qastage.buildbox.one/18/cadastro/')
  })

  it('Responsividade mobile', () => {
    cy.viewport('iphone-6')
    cy.get('div.bg-welcome').should('not.have.css', 'background-image', backgroundImage)
  })

  it('Responsividade desktop', () => {
    cy.viewport(1280, 720)
    cy.get('div.bg-welcome').should('have.css', 'background-image',backgroundImage)
  })

  it('Cadastro completo com sucesso', () => {
    cy.getDataCy("button-btn-enroll").click()
    cy.getDataCy("input-signup-personal-data-firstName").type(persona[0].name)
    cy.getDataCy("input-signup-personal-data-lastName").type(persona[0].lastName)
    cy.getDataCy("input-signup-personal-data-birthDate").type(persona[0].birthDate)
    cy.getDataCy("input-signup-personal-data-cpf").type(persona[0].cpf)
    cy.getDataCy("input-signup-personal-data-email").type(persona[0].email)
    cy.getDataCy("input-signup-personal-data-email-confirm").type(persona[0].email)
    cy.getDataCy("input-signup-personal-data-password").type(persona[0].password)
    cy.getDataCy("input-signup-personal-data-password-confirm").type(persona[0].password)
    cy.get('[aria-controls="dropdown-button-1"]').click()
    cy.get('[x-text="option.value"]').contains('Advanced').click();
    cy.getDataCy("input-signup-personal-data-lgpd").click()
    cy.getDataCy("button-signup_submit_button_1").click()
    cy.getDataCy("input-signup-address-cep").type(persona[0].cep)
    cy.getDataCy("input-signup-address-number").type(persona[0].residenceNumber)
    cy.getDataCy("input-signup-address-neighborhood").should('have.value', persona[0].bairro);
    cy.getDataCy("button-signup_submit_button_3").click()
    cy.get('div.bg-thankyou p').should('have.text', ' Agora você tem o passe para descobrir como o inglês pode te levar longe ');
  })

  it('Data nascimento formato errado', () => {
    cy.getDataCy("button-btn-enroll").click()
    cy.getDataCy("input-signup-personal-data-birthDate").type("0101")
    cy.getDataCy("input-signup-personal-data-firstName").type(persona[0].name)
    cy.get('span.input-error').should('have.text', 'Data de nascimento inválida.');
  })

  it('Data nascimento futura', () => {
    cy.getDataCy("button-btn-enroll").click()
    cy.getDataCy("input-signup-personal-data-birthDate").type("01012025")
    cy.getDataCy("input-signup-personal-data-firstName").type(persona[0].name)
    cy.get('span.input-error').should('have.text', 'Data de nascimento inválida.');
  })

  it('CPF já cadastrado', () => {
    cy.getDataCy("button-btn-enroll").click()
    cy.getDataCy("input-signup-personal-data-cpf").type("24079018002")
    cy.getDataCy("input-signup-personal-data-email").type(persona[0].email)
    cy.get('span.input-error').should('have.text', 'Este CPF já está em uso.');
  })

  it('CPF formato incorreto', () => {
    cy.getDataCy("button-btn-enroll").click()
    cy.getDataCy("input-signup-personal-data-cpf").type("2407901")
    cy.getDataCy("input-signup-personal-data-email").type(persona[0].email)
    cy.get('span.input-error').should('have.text', 'CPF inválido.');
  })

  it('Email formato incorreto (sem @)', () => {
    cy.getDataCy("button-btn-enroll").click()
    cy.getDataCy("input-signup-personal-data-email").type("email.com")
    cy.getDataCy("input-signup-personal-data-firstName").type(persona[0].name)
    cy.get('span.input-error').should('have.text', 'Email inválido.');
  })

  it('Email já cadastrado antes', () => {
    cy.getDataCy("button-btn-enroll").click()
    cy.getDataCy("input-signup-personal-data-email").type(persona[0].email)
    cy.getDataCy("input-signup-personal-data-firstName").type(persona[0].name)
    cy.get('span.input-error').should('have.text', 'Este email já está em uso.');
  })

  it('Emails diferentes', () => {
    cy.getDataCy("button-btn-enroll").click()
    cy.getDataCy("input-signup-personal-data-email").type("teste@email.com")
    cy.getDataCy("input-signup-personal-data-email-confirm").type("diferente@email.com")
    cy.getDataCy("input-signup-personal-data-firstName").type(persona[0].name)
    cy.get('span.input-error').should('have.text', 'Os e-mails não são iguais');
  })

  it('CEP incorreto', () => {
    cy.getDataCy("button-btn-enroll").click()
    cy.getDataCy("input-signup-personal-data-firstName").type(persona[1].name)
    cy.getDataCy("input-signup-personal-data-lastName").type(persona[1].lastName)
    cy.getDataCy("input-signup-personal-data-birthDate").type(persona[1].birthDate)
    cy.getDataCy("input-signup-personal-data-cpf").type(persona[1].cpf)
    cy.getDataCy("input-signup-personal-data-email").type(persona[1].email)
    cy.getDataCy("input-signup-personal-data-email-confirm").type(persona[1].email)
    cy.getDataCy("input-signup-personal-data-password").type(persona[1].password)
    cy.getDataCy("input-signup-personal-data-password-confirm").type(persona[1].password)
    cy.get('[aria-controls="dropdown-button-1"]').click()
    cy.get('[x-text="option.value"]').contains('Advanced').click();
    cy.getDataCy("input-signup-personal-data-lgpd").click()
    cy.getDataCy("button-signup_submit_button_1").click()
    cy.getDataCy("input-signup-address-cep").type(persona[1].cep)
    cy.getDataCy("input-signup-address-number").type(persona[1].residenceNumber)
    cy.get('li[role="alert"]').should('have.text', 'CEP não encontrado.', { timeout: 8000 });
  })
})