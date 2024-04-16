import { clicarEmFazerInscricao } from "./checarDados";
import { mock_cadastro } from "../mocks/mock_cadastro";

const textosTela = [
  "Já possui uma conta?",
  "Faça Login",
  "Dados Pessoais e de acesso",
  "O primeiro passo foi dado! You're about to unlock new possibilities. Para criar seu perfil de cadastro com precisão, precisamos que vocês informe seus dados corretamente",
  "Nome",
  "Sobrenome",
  "Data de nascimento",
  "CPF",
  "E-mail",
  "Confirme seu E-mail",
  "Insira sua senha",
  "Confirme sua senha",
  "Nível de proficiência na língua inglesa",
  "Fazer Nivelamento",
  "Eu concordo com os Termos de Uso e Política de Privacidade.",
  "Próximo",
];

export function visibilidadeElementosCadastro() {
  clicarEmFazerInscricao();
  textosTela.forEach((texto) => {
    cy.get('[x-data="globalData"]').contains(texto).should("be.visible");
  });
}

export function validarInputs() {
  clicarEmFazerInscricao();
  cy.get('[data-cy="input-signup-personal-data-firstName"]').type(
    mock_cadastro["name"]
  );
  cy.get('[data-cy="input-signup-personal-data-lastName"]').type(
    mock_cadastro["lastname"]
  );
  cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(
    mock_cadastro["birth"]
  );
  cy.get('[data-cy="input-signup-personal-data-cpf"]').type(
    mock_cadastro["cpf"]
  );
  cy.get('[data-cy="input-signup-personal-data-email"]').type(
    mock_cadastro["email"]
  );
  cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type(
    mock_cadastro["email_check"]
  );
  cy.get('[data-cy="input-signup-personal-data-password"]').type(
    mock_cadastro["psswrd"]
  );
  cy.get('[data-cy="input-signup-personal-data-password-confirm"]').type(
    mock_cadastro["psswrd_check"]
  );
  cy.get('[x-data="selectAdvanced"]').first().click();
  cy.get("#dropdown-button-1")
    .find("span")
    .each((options, indx) => {
      if (indx < 3) {
        if (indx != 0) {
          cy.get('[x-data="selectAdvanced"]').first().click();
        }
        cy.get(options).click({ force: true });
      }
    });
  cy.get('[data-cy="input-signup-personal-data-lgpd"]').click().click();
}

export function deixarTodosIputsInvalidos() {
  return cy.wait(10).then(() => {
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(0).clear();
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(0).clear();
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(0).clear();
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(0).clear();
    cy.get('[data-cy="input-signup-personal-data-email"]').type(0).clear();
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]')
      .type(1)
      .clear();
    cy.get('[data-cy="input-signup-personal-data-password"]').type(0).clear();
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]')
      .type(1)
      .clear();
  });
}

export function validarInputsErros() {
  clicarEmFazerInscricao();
  deixarTodosIputsInvalidos().then(() => {
    cy.get("body").contains("Precisa ser preenchido"); // tem um BUG em tela aqui, 2 inputs nao constam o texto em questao
  });
}
