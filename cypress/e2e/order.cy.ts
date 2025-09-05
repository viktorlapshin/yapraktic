/// <reference types="cypress" />

import "@4tw/cypress-drag-drop";

const email = "example22226@mail.com";

describe("template spec", () => {
  it("passes", () => {
    cy.visit("/");

    cy.get('[data-cy="profile-header-link"]').click();
    cy.get('[data-cy="login-register-link"]').click();

    cy.get('[data-cy="register-name-input"]').type(`login`);
    cy.get('[data-cy="register-email-input"]').type(`${email}`);
    cy.get('[data-cy="register-password-input"]').type(`password{enter}`);

    cy.wait(300);

    cy.get('[data-cy="burger-ingredient-item"]')
      .first()
      .drag('[data-cy="bun-constructor-ingredients-item"]');

    cy.get('[data-cy="burger-ingredients-item"]')
      .eq(3)
      .drag('[data-cy="burger-constructor-drop-ingredient"]');

    cy.get('[data-cy="button-order"]').click();

    cy.wait(15_000);

    cy.get('[data-cy="order-details-number"]').should((element) => {
      expect(element.text()).to.not.empty;
    });
  });
});
