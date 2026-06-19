it("Register with success", () => {
  const user = {
    username: "AE_" + Date.now(), // <-- username unico
    password: "12345",
    firstName: "Teste2",
    lastName: "Teste2",
    email: "test_" + Date.now() + "@test.com", // <-- email único
    phone: "0612345678",
    address1: "Rua do teste",
    address2: "N/A",
    city: "NY",
    state: "NY",
    zip: "5000",
    country: "Portugal",
    category: "DOGS",
  };

  cy.register(user);

  cy.url().should("include", "Catalog.action");

  cy.visit("https://petstore.octoperf.com/actions/Account.action?signonForm=");

  cy.get('[name="username"]').type(user.username);
  cy.get('#Catalog [name="password"]').clear();
  cy.get('#Catalog [name="password"]').type(user.password);
  cy.get('#Catalog [name="signon"]').click();

  cy.get("#WelcomeContent").should(
    "contain.text",
    `Welcome ${user.firstName}!`,
  );
});
