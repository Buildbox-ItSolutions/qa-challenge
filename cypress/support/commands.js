Cypress.Commands.add(
  "personalData",
  (firstName, lastName, birthDate, cpf, email, password, proficiencyLevel) => {
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(firstName);
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(lastName);
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(birthDate);
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(cpf);
    cy.get('[data-cy="input-signup-personal-data-email"]').type(email);
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type(email);
    cy.get('[data-cy="input-signup-personal-data-password"]').type(password);
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]').type(
      password
    );
    cy.get('[aria-controls="dropdown-button-1"]').scrollIntoView().click();
    cy.get("span").contains(`${proficiencyLevel}`).click();
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').click();
    cy.get('[data-cy="button-signup_submit_button_1"]').click();
  }
);

Cypress.Commands.add("addressData", () => {
  cy.get('[data-cy="input-signup-address-cep"]').type("01310930");
  cy.get('[data-cy="input-signup-address-neighborhood"]').type(
    "Jardim Paulista"
  );
  cy.get('[data-cy="input-signup-address-street"]').type("Avenida Paulista");
  cy.get('[data-cy="input-signup-address-number"]').type("1578");
  cy.get('[data-cy="button-signup_submit_button_3"]').click();
});
