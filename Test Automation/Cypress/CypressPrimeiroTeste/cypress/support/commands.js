// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ==========================================
// STEP 2 — LOGIN
// ==========================================

// 2.1 — Login com credenciais válidas
Cypress.Commands.add("login", (email, password) => {
  cy.visit("https://petstore.octoperf.com/actions/Account.action?signonForm=");

  cy.get('[name="username"]').clear().type(email);

  cy.get('#Catalog [name="password"]')
    .invoke("val", "") // limpa autofill
    .type(password);

  cy.contains("Login").click();
});

// 2.2 — Login com credenciais inválidas (espera falhar)
Cypress.Commands.add("loginFailure", (email, password) => {
  cy.visit("https://petstore.octoperf.com/actions/Account.action?signonForm=");

  cy.get('[name="username"]').clear().type(email);

  cy.get('#Catalog [name="password"]')
    .invoke("val", "") // limpa autofill
    .type(password);

  cy.contains("Login").click();
});

// ==========================================
// STEP 1 — REGISTO
// ==========================================

Cypress.Commands.add("register", (user) => {
  cy.visit(
    "https://petstore.octoperf.com/actions/Account.action?newAccountForm=",
  );

  cy.url().should("include", "newAccountForm");

  cy.get('[name="username"]').type(user.username);
  cy.get('#Catalog [name="password"]').type(user.password);
  cy.get('#Catalog [name="repeatedPassword"]').type(user.password);

  cy.get('#Catalog [name="account.firstName"]').type(user.firstName);
  cy.get('#Catalog [name="account.lastName"]').type(user.lastName);
  cy.get('#Catalog [name="account.email"]').type(user.email);
  cy.get('#Catalog [name="account.phone"]').type(user.phone);
  cy.get('#Catalog [name="account.address1"]').type(user.address1);
  cy.get('#Catalog [name="account.address2"]').type(user.address2);
  cy.get('#Catalog [name="account.city"]').type(user.city);
  cy.get('#Catalog [name="account.state"]').type(user.state);
  cy.get('#Catalog [name="account.zip"]').type(user.zip);
  cy.get('#Catalog [name="account.country"]').type(user.country);

  cy.get('#Catalog [name="account.favouriteCategoryId"]').select(user.category);
  cy.get('#Catalog [name="account.listOption"]').check();
  cy.get('#Catalog [name="account.languagePreference"]').select("english");
  cy.get('#Catalog [name="account.bannerOption"]').check();

  cy.get('#Catalog [name="newAccount"]').click();
});

// ==========================================
// STEP 3 — PESQUISA DE PRODUTO
// ==========================================

// 3.1 — Pesquisar produto pelo nome
Cypress.Commands.add("searchProduct", (item) => {
  cy.get('#SearchContent [name="keyword"]').click();
  cy.get('#SearchContent [name="keyword"]').type(item);
  cy.get('#SearchContent [name="searchProducts"]').click();
});

// 3.2 — Abrir o primeiro resultado da lista
Cypress.Commands.add("openFirstResult", () => {
  cy.get("#Catalog td:nth-child(1) a").first().click();
});

// 3.3 — Abrir item específico pelo ID
Cypress.Commands.add("openItemById", (ID) => {
  cy.get(
    `#Catalog a[href="/actions/Catalog.action?viewItem=&itemId=${ID}"]`,
  ).click();
});

// 3.4 — Validar descrição do item
Cypress.Commands.add("SeeItemDescription", (expectedText) => {
  cy.get("#Catalog tr:nth-child(1) td").should("contain.text", expectedText);
});

// ==========================================
// STEP 4 — ADICIONAR PRODUCTO AO CARRINHO
// ==========================================

// 4.1 - Adicionar ao carrinho
Cypress.Commands.add("addProductToCart", () => {
  cy.get("#Catalog a.Button").first().click();
});

// 4.2 - Validar titulo da página do carrinho
Cypress.Commands.add("verifyPageTitle", (pageTitle) => {
  cy.get("#Cart h2").should("contain.text", pageTitle);
});

// 4.3 - Validar Product ID
Cypress.Commands.add("verifyProductID", (productID) => {
  cy.get("#Cart tr:nth-child(2) td:nth-child(2)").should(
    "contain.text",
    productID,
  );
});

// 4.4 - Validar Quantidade
Cypress.Commands.add("verifyQTY", (qty) => {
  cy.get('#Cart [name="EST-6"]').should("have.value", qty);
});

// ==========================================
// STEP 5 — FINALIZAR A COMPRA
// ==========================================

// 5.1 - Ir para o Checkout
Cypress.Commands.add("goToCheckout", () => {
  cy.get('#Cart a[href*="newOrderForm"]').click();
});

// 5.2 - Confirmar dados
Cypress.Commands.add("confirmData", () => {
  cy.get('#Catalog [name="newOrder"]').click();
});

// 5.3 - Validar mensagem
Cypress.Commands.add("validateFirstMessage", (firstMessage) => {
  cy.get("#Catalog").should("contain.text", firstMessage);
});

// 5.4 - Confirmar encomenda
Cypress.Commands.add("confirmOrder", () => {
  cy.get("#Catalog a.Button").should("contain.text", "Confirm").click();
});

// 5.5 - Validar mensagem final
Cypress.Commands.add("validateFinalMessage", (finalMessage) => {
  cy.get("#Content ul.messages > li").should("contain.text", finalMessage);
});
