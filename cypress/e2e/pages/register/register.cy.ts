import { createPerson } from '../../../utils/person';
import { ELEMENTS } from './elements';
import registerPage from './index';

describe('Registro bem-sucedido', () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });
  it('Deve realizar registro com dados válidos com sucesso', () => {
    cy.intercept('POST', 'https://qastage.buildbox.one/wp-admin/admin-ajax.php').as('register');
    const Person = createPerson();
    registerPage.visitRegisterPage();
    registerPage.fillForm(Person);
    registerPage.clickContinue();
    registerPage.fillAddress(Person.address);
    registerPage.clickContinue();
    cy.wait('@register').then(({ response }) => {
      expect(response?.statusCode).to.eq(204);
    });
    cy.contains(ELEMENTS.titleSuccess).should('be.visible');
  });

  it('Deve realizar o login com os dados registrados', () => {
    const Person = createPerson();
    registerPage.visitRegisterPage();
    registerPage.fillForm(Person);
    registerPage.clickContinue();
    registerPage.fillAddress(Person.address);
    registerPage.clickContinue();
    cy.contains(ELEMENTS.titleSuccess).should('be.visible');
    cy.visit('/sign-in');
    cy.loginUI(Person.email, Person.password);
    cy.url().should('include', '/dashboard');
    cy.contains(`${Person.firstName} ${Person.lastName}`).should('be.visible');
  });
});


describe('Verificar Validação dos Campos', () => {
  it('Deve exibir mensagem de erro ao clicar, digitar e apagar para o primeiro nome', () => {
    registerPage.visitRegisterPage();
    cy.get(ELEMENTS.inputFistName).click().type('a').clear();
    registerPage.checkErrorMessage('Precisa ser preenchido');
  });

  it('Deve exibir mensagem de erro ao clicar, digitar e apagar para o sobrenome', () => {
    registerPage.visitRegisterPage();
    cy.get(ELEMENTS.inputLastName).click().type('b').clear();
    registerPage.checkErrorMessage('Precisa ser preenchido');
  });

  it('Deve exibir mensagem de erro para formato de data de nascimento inválido', () => {
    const Person = createPerson();
    registerPage.visitRegisterPage();
    registerPage.fillBirthDate('04/30/2024');
    registerPage.checkErrorMessage('Data de nascimento inválida.');
  });
  it('Deve exibir mensagem de erro para registro com data de nascimento futura', () => {
    const futureBirthDate = new Date(Date.now() + 1 * 365 * 24 * 60 * 60 * 1000);
    registerPage.visitRegisterPage();
    registerPage.fillBirthDate(futureBirthDate.toLocaleDateString('pt-BR'));
    registerPage.checkErrorMessage('Data de nascimento inválida.');
  });

  it('Deve exibir mensagem de erro para confirmação de senha inconsistente', () => {
    const password = 'password';
    const differentPassword = 'different-password';
    registerPage.visitRegisterPage();
    registerPage.fillPassword(password);
    registerPage.fillConfirmPassword(differentPassword);
    registerPage.checkErrorMessage('As senhas não são iguais.');
  });

  it('Deve exibir mensagem de erro para e-mail inválido', () => {
    registerPage.visitRegisterPage();
    const email = 'a@b.c';
    cy.get(ELEMENTS.inputEmail).type(email).tab()
    registerPage.checkErrorMessage('Email inválido.');

  });
  it('Deve exibir mensagem de erro para e-mail incompleto', () => {
    registerPage.visitRegisterPage();
    const email = 'teste@';
    cy.get(ELEMENTS.inputEmail).type(email).tab()
    registerPage.checkErrorMessage('Precisa ser email');
  });

  it('Deve exibir mensagem de erro para confirmação de e-mail inconsistente', () => {
    const email = 'mail@gmail.com';
    const differentEmail = 'diferent-mail@gmail.com';
    registerPage.visitRegisterPage();
    registerPage.fillEmail(email);
    registerPage.fillConfirmEmail(differentEmail);
    registerPage.checkErrorMessage('Os e-mails não são iguais.');
  })

  it('Deve exibir mensagem de erro para CPF inválido', () => {
    const Person = createPerson();
    registerPage.visitRegisterPage();
    cy.get(ELEMENTS.inputCPF).type('00000000000').tab();
    registerPage.checkErrorMessage('CPF inválido.');
  });
})

describe('Registro Duplicado', () => {

  it('Deve exibir mensagem de erro para e-mail já existente', () => {
    const Person = createPerson();
    registerPage.visitRegisterPage();
    registerPage.fillForm(Person);
    registerPage.clickContinue();
    registerPage.fillAddress(Person.address);
    registerPage.clickContinue();
    registerPage.visitRegisterPage();
    cy.get(ELEMENTS.inputEmail).type(Person.email.toLowerCase()).tab();
    registerPage.checkErrorMessage('Este email já está em uso.');
  });

  it('Deve exibir mensagem de erro para CPF já existente', () => {
    const Person = createPerson();
    registerPage.visitRegisterPage();
    registerPage.fillForm(Person);
    registerPage.clickContinue();
    registerPage.fillAddress(Person.address);
    registerPage.clickContinue();
    registerPage.visitRegisterPage();
    cy.get(ELEMENTS.inputCPF).type(Person.cpf.toLowerCase(), { delay: 5 }).tab();
    registerPage.checkErrorMessage('Este CPF já está em uso.');
  });
})

describe('Validação de Endereço e CEP', () => {
  it('Deve exibir mensagem de erro para CEP inválido', () => {
    const Person = createPerson();
    registerPage.visitRegisterPage();
    registerPage.fillForm(Person);
    registerPage.clickContinue();
    cy.get(ELEMENTS.inputCep).type('12345678910').tab();
    cy.get(ELEMENTS.toastAlert).should('contain', 'CEP não encontrado');
  });
  it('Deve preencher automaticamente dos campos de endereço com um CEP válido', () => {
    const Person = createPerson();
    registerPage.visitRegisterPage();
    registerPage.fillForm(Person);
    registerPage.clickContinue();
    registerPage.fillAddress(Person.address);
    registerPage.verifyInputValue(ELEMENTS.inputCountry, Person.address.country)
    registerPage.verifyInputValue(ELEMENTS.inputState, Person.address.state)
    registerPage.verifyInputValue(ELEMENTS.inputCity, Person.address.city)
  });

})

describe('Responsividade', () => {

  const urlImage = 'url("https://qastage.buildbox.one/wp-content/themes/bx-wp-theme/assets/images/register-welcome.jpg")'

  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ];

  viewports.forEach(viewport => {
    it(`Deve exibir o background corretamente no modo ${viewport.name}`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit('/cadastro');

      if (viewport.width >= 1440) {
        cy.get('div.bg-welcome').should('have.css', 'background-image', urlImage)
      } else {
        cy.get('div.bg-welcome').should('not.have.css', 'background-image', urlImage)
      }
    });
  });
});
