import { ELEMENTS } from './elements';

class RegisterPage {
  fillFirstName(firstName: string) {
    cy.get(ELEMENTS.inputFistName).type(firstName);
  }

  fillLastName(lastName: string) {
    cy.get(ELEMENTS.inputLastName).type(lastName);
  }

  fillBirthDate(birthDate: string) {
    cy.get(ELEMENTS.inputBirthDate).type(birthDate);
  }

  fillCPF(cpf: string) {
    cy.get(ELEMENTS.inputCPF).type(cpf);
  }

  fillEmail(email: string) {
    cy.get(ELEMENTS.inputEmail).type(email);
  }

  fillConfirmEmail(confirmEmail: string) {
    cy.get(ELEMENTS.inputConfirmEmail).type(confirmEmail);
  }

  fillPassword(password: string) {
    cy.get(ELEMENTS.inputPassword).type(password);
  }

  fillConfirmPassword(confirmPassword: string) {
    cy.get(ELEMENTS.inputConfirmPassword).type(confirmPassword);
  }

  fillCep(cep: string) {
    cy.get(ELEMENTS.inputCep).type(cep + '{enter}');
  }

  checkTerms() {
    cy.get(ELEMENTS.checkBoxTerms).check();
  }

  selectProficiency(proficiency: string) {
    cy.get(ELEMENTS.dropdownButtonProficiency).click();
    cy.contains(proficiency).click();
  }

  fillNumber(number: string) {
    cy.get(ELEMENTS.inputNumber).type(number);
  }
  fillComplement(complement: string) {
    cy.get(ELEMENTS.inputComplement).type(complement);
  }

  clickRegister() {
    cy.get(ELEMENTS.buttonRegister).click();
  }

  clickContinue() {
    cy.get(ELEMENTS.buttonContinue).filter(':visible').contains('Próximo').should('have.css', 'display', 'flex').click();
  }

  clickLeveling() {
    cy.get(ELEMENTS.buttonLeveling).click();
  }

  checkElementVisibility(selector: string, shouldBeVisible: boolean) {
    cy.get(selector).should(shouldBeVisible ? 'be.visible' : 'not.be.visible');
  }

  checkErrorMessage(message: string) {
    cy.get(ELEMENTS.inputError).should('contain', message);
  }

  verifyInputValue(selector, expectedValue) {
    cy.get(selector).should('have.value', expectedValue);
  }

  visitRegisterPage() {
    cy.visit('/cadastro');
    this.clickRegister();
  }

  fillForm(Person) {
    this.fillFirstName(Person.firstName);
    this.fillLastName(Person.lastName);
    this.fillBirthDate(Person.birthDate);
    this.fillCPF(Person.cpf);
    this.fillEmail(Person.email.toLowerCase());
    this.fillConfirmEmail(Person.email.toLowerCase());
    this.fillPassword(Person.password);
    this.fillConfirmPassword(Person.password);
    this.selectProficiency('Advanced');
    this.checkTerms();
  }

  fillAddress(address) {
    this.fillCep(address.CEP);
    this.fillNumber(address.number);
    this.fillComplement(address.complement);
  }
}

export default new RegisterPage();