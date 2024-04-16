export function clicarEmFazerInscricao() {
  cy.get("div")
    .find('[class="flex justify-center"]')
    .find("button")
    .first()
    .click();
}

export function checarDadosTelaInicial() {
  cy.get("svg").find("path").should("be.visible");
  cy.get("h1").find("span").contains("Welcome to");
  cy.get("h1").contains("English Pass");
  cy.get("p").contains("Conheça um jeito novo de aprender inglês");
}

export function acessarCadastroMD() {
  cy.viewport(660, 1000);
  clicarEmFazerInscricao();
  cy.acessarPortal();
  cy.viewport(1300, 990);
  clicarEmFazerInscricao();
}
