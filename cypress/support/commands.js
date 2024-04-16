import { URL, ROTA_CADASTRO } from "./envs";

Cypress.Commands.add("acessarPortal", (username, password) => {
  cy.visit(`${URL}${ROTA_CADASTRO}`);
});
