describe("modal spec", () => {
  it("passes", () => {
    cy.visit("/");

    cy.get(
      ":nth-child(2) > :nth-child(2) > ._container_ingridient_6pgrb_1"
    ).click();

    cy.get("._modal_1hbz4_15").should("exist");

    cy.get("._close_button_1ayl7_36").click();

    cy.get("._modal_1hbz4_15").should("not.exist");
  });
});
