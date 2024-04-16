import {
  checarDadosTelaInicial,
  acessarCadastroMD,
} from "../functions/checarDados";
import {
  visibilidadeElementosCadastro,
  validarInputs,
  validarInputsErros,
} from "../functions/cadastro";
import { FIREBASE_GGAPI } from "../support/envs";

const acesso = () => {
  cy.session(["acesso"], () => {
    cy.intercept("GET", `${FIREBASE_GGAPI}`).as("ggapi");
    cy.acessarPortal();
    cy.wait("@ggapi").its("response.statusCode").should("eq", 200);
  });
};

beforeEach(() => {
  acesso();
  cy.acessarPortal();
});

describe("Verificação completa da tela inicial pré form em dispositivo movel e desk", () => {
  it("Deve verificar todos os elementos visiveis em formatos diferentes de dispositivos", () => {
    cy.viewport(660, 1000); // verificação para mobile
    checarDadosTelaInicial();
    cy.viewport(1300, 990);
    checarDadosTelaInicial(); // verificação para desk
  });
});

describe("Verificação dos dados da tela de cadastro, elementos, usabilidade e afins", () => {
  it("Deve acessar a tela de cadastro pelo mobile e pelo desk", () => {
    acessarCadastroMD();
  });
  it("Deve acessar o form e verificar a visibilidade de todos os elementos", () => {
    visibilidadeElementosCadastro();
  });
  it("Deve acessar o form e verificar a usabilidade de todos os elementos", () => {
    validarInputs();
  });
  it("Deve acessar o form, preencher os inputs de forma incorreta e verificar se reconhecem o erro", () => {
    validarInputsErros();
  });
});
