describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    // rite the query to find the list item for the correct day and click it
    cy.contains('[data-testid = day]', "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected");

  });
  
});