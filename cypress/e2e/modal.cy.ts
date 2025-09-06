describe("modal spec", () => {
  it("passes", () => {
    cy.visit("/");

    cy.get('[data-cy="burger-ingredients-item"]').first().click();

    cy.get('[data-cy="modal"]').should("exist");

    cy.get('[data-cy="ingredients-details-close-button"]').click();

    cy.get('[data-cy="modal"]').should("not.exist");
  });
});
