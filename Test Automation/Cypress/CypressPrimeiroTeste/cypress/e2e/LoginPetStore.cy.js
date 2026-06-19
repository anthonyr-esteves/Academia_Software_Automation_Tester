describe("PetStoreTests", () => {
  it("Login with sucess", () => {
    cy.login("dakeluzu", "1234");
    cy.contains("Welcome Kay!")
      .invoke("text")
      .should("contains", "Welcome Kay!");
    cy.wait(5000);
    cy.log("console");
  });

  it("Login failure", () => {
    cy.loginFailure("bruno", "123");
    cy.contains("Invalid username or password").should("be.visible");
  });
});
