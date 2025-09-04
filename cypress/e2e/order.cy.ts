/// <reference types="cypress" />

import "@4tw/cypress-drag-drop";

const email = "example6@mail.com";

describe("template spec", () => {
  it("passes", () => {
    cy.visit("/");

    cy.get("._link_position_last_1srpi_28 > .text").click();
    cy.get(":nth-child(5) > a").click();

    cy.get(":nth-child(2) > .input").type(`login`);
    cy.get(":nth-child(3) > .input").type(`${email}`);
    cy.get(":nth-child(4) > .input").type(`password{enter}`);

    cy.wait(300);

    cy.get(
      ":nth-child(2) > :nth-child(2) > ._container_ingridient_6pgrb_1"
    ).drag("._top_bun_lcx4c_31");

    cy.get(
      ":nth-child(4) > :nth-child(2) > ._container_ingridient_6pgrb_1"
    ).drag("._filling_lcx4c_41");

    cy.get(".button").click();

    cy.wait(15_000);

    cy.get("._order_number_bbsrs_10").should((element) => {
      expect(element.text()).to.not.empty;
    });
  });
});
