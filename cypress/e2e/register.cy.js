const { faker, fakerTH } = require("@faker-js/faker");
const { generate } = require("gerador-validador-cpf");
const staticData = require("../fixtures/staticData.json");

const generateUser = () => {
  let birthday = faker.date.between({ from: "1950-01-01", to: "2005-12-31" });
  const formattedBirthday = `${birthday
    .getDate()
    .toString()
    .padStart(2, "0")}/${(birthday.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${birthday.getFullYear()}`;
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthDate: formattedBirthday,
    cpf: generate(),
    email: faker.internet.exampleEmail(),
    password: faker.internet.password(),
  };
};
let newUser = generateUser();

describe("Feature: Registering", () => {
  beforeEach(() => {
    newUser = generateUser();
    cy.visit("/cadastro");
  });
  it("should correctly open the register website", () => {
    expect(cy.get('[data-cy="button-btn-enroll"]')).to.exist;
  });
  it("should correctly open the register website", () => {
    cy.get('[data-cy="button-btn-enroll"]').click();
    cy.personalData(
      newUser.firstName,
      newUser.lastName,
      newUser.birthDate,
      newUser.cpf,
      newUser.email,
      newUser.password,
      "Advanced"
    );
    expect(cy.get("span").contains("STEP 02/02").scrollIntoView()).to.exist;
    cy.addressData();
    expect(cy.get('[data-cy="button-wide_window_button"]')).to.exist;
  });

  it("should validate previously registered emails", () => {
    cy.get('[data-cy="button-btn-enroll"]').click();
    cy.personalData(
      newUser.firstName,
      newUser.lastName,
      newUser.birthDate,
      newUser.cpf,
      staticData.email,
      newUser.password,
      "Advanced"
    );
    expect(cy.get("span.input-error").contains("Este email já está em uso.")).to
      .exist;
  });

  it("should validate the field: CPF already registered", () => {
    cy.get('[data-cy="button-btn-enroll"]').click();
    cy.personalData(
      newUser.firstName,
      newUser.lastName,
      newUser.birthDate,
      staticData.cpf,
      newUser.email,
      newUser.password,
      "Advanced"
    );
    expect(cy.get("span.input-error").contains("Este CPF já está em uso.")).to
      .exist;
  });
  it("should validate the field: invalid email format", () => {
    cy.get('[data-cy="button-btn-enroll"]').click();
    cy.personalData(
      newUser.firstName,
      newUser.lastName,
      newUser.birthDate,
      newUser.cpf,
      "john@doe@@mailcom",
      newUser.password,
      "Advanced"
    );
    expect(cy.get("span.input-error").contains("Email inválido.")).to.exist;
  });
  it.only("should validate the field: mismatching emails", () => {
    cy.get('[data-cy="button-btn-enroll"]').click();
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(
      newUser.firstName
    );
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(
      newUser.lastName
    );
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(
      newUser.birthDate
    );
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(newUser.cpf);
    cy.get('[data-cy="input-signup-personal-data-email"]').type(newUser.email);
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type(
      staticData.email
    );
    cy.get('[data-cy="input-signup-personal-data-password"]').type(
      newUser.password
    );
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]').type(
      newUser.password
    );
    cy.get('[aria-controls="dropdown-button-1"]').scrollIntoView().click();
    cy.get("span").contains("Beginner").click();
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').click();
    cy.get('[data-cy="button-signup_submit_button_1"]').click();
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').then(
      ($input) => {
        expect($input[0].validationMessage).to.eq("Os e-mails não são iguais.");
      }
    );
  });
  it("should validate the field: invalid CPF", () => {
    cy.get('[data-cy="button-btn-enroll"]').click();
    cy.personalData(
      newUser.firstName,
      newUser.lastName,
      newUser.birthDate,
      "1232",
      newUser.email,
      newUser.password,
      "Advanced"
    );
    expect(cy.get("span.input-error").contains("CPF inválido.")).to.exist;
  });

  it("should validate the field: invalid birthdate", () => {
    cy.get('[data-cy="button-btn-enroll"]').click();
    cy.personalData(
      newUser.firstName,
      newUser.lastName,
      "32133012",
      newUser.cpf,
      newUser.email,
      newUser.password,
      "Intermediate"
    );
    expect(cy.get("span.input-error").contains("Data de nascimento inválida."))
      .to.exist;
  });
});

describe("Feature: Login", () => {
  xit("should login with the registered email", () => {
    cy.visit("/sign-in");
    cy.wait(200);
    cy.get("#user_login").type(staticData.email);
    cy.get("#user_pass").type(staticData.password);
    cy.get("#wp-submit").click();
    cy.wait(10000);
    cy.get(".hidden > .flex > .text-sm").should(
      "contain.text",
      `${staticData.firstName} ${staticData.lastName}}`
    );
  });
});
