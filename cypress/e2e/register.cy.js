const { faker, fakerTH } = require("@faker-js/faker");
const { generate } = require("gerador-validador-cpf");

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
    //newUser = generateUser();
    cy.visit("/cadastro");
  });

  /* happy path */

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
      newUser.email,
      newUser.password,
      "Advanced"
    );
    expect(cy.get("span.input-error").contains("Este email já está em uso.")).to
      .exist;
  });
});

describe("Feature: Login", () => {
  xit("should login with the registered email", () => {
    cy.visit("/sign-in");
    cy.get("#user_login").type(newUser.email);
    cy.get("#user_pass").type(newUser.password);
    cy.get("#wp-submit").click();
    expect(cy.get("span").contains(`${newUser.firstName} ${newUser.lastName}`))
      .to.exist;
  });
});
