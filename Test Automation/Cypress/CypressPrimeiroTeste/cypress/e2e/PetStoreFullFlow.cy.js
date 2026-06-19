describe("PetStore - Exercício Completo", () => {
  // -----------------------------
  // 1. REGISTO
  // -----------------------------
  it("Registo de Utilizador", () => {
    const user = {
      username: "AE_" + Date.now(),
      password: "12345",
      firstName: "Anthony",
      lastName: "Test",
      email: "test_" + Date.now() + "@test.com",
      phone: "0612345678",
      address1: "Rua do teste",
      address2: "N/A",
      city: "Porto",
      state: "PT",
      zip: "4000",
      country: "Portugal",
      category: "DOGS",
    };

    cy.register(user);

    cy.url().should("include", "Catalog.action");

    cy.login(user.username, user.password);

    cy.contains(`Welcome ${user.firstName}!`).should("be.visible");
  });

  // -----------------------------
  // 2. LOGIN
  // -----------------------------
  it("Login com utilizador válido", () => {
    cy.login("AE_teste", "Seroquel100.");
    cy.contains("Welcome").should("be.visible");
  });

  // -----------------------------
  // 3. PESQUISA, CARRINHO E CHECKOUT
  // Estes testes precisam de login antes de cada um
  // -----------------------------
  describe("Fluxos que exigem login", () => {
    beforeEach(() => {
      cy.login("AE_teste", "Seroquel100.");
    });

    // 3. PESQUISAR PRODUTO
    it("Pesquisar por 'dog' e validar a descrição do produto", () => {
      cy.visit("https://petstore.octoperf.com/actions/Catalog.action");

      cy.searchProduct("dog");
      cy.openFirstResult();
      cy.openItemById("EST-6");
      cy.SeeItemDescription("Friendly dog from England");
    });

    // 4. ADICIONAR AO CARRINHO
    it("Adicionar o producto ao carrinho", () => {
      cy.visit("https://petstore.octoperf.com/actions/Catalog.action");

      cy.searchProduct("dog");
      cy.openFirstResult();
      cy.openItemById("EST-6");
      cy.SeeItemDescription("Friendly dog from England");
      cy.addProductToCart();
      cy.verifyPageTitle("Shopping Cart");
      cy.verifyProductID("K9-BD-01");
      cy.verifyQTY("1");
    });

    // 5. FINALIZAR COMPRA
    it("Proceder para o Checkout", () => {
      cy.visit("https://petstore.octoperf.com/actions/Catalog.action");

      cy.searchProduct("dog");
      cy.openFirstResult();
      cy.openItemById("EST-6");
      cy.SeeItemDescription("Friendly dog from England");
      cy.addProductToCart();
      cy.verifyPageTitle("Shopping Cart");
      cy.verifyProductID("K9-BD-01");
      cy.verifyQTY("1");
      cy.goToCheckout();
      cy.url().should("include", "Order.action?newOrderForm=");
      cy.confirmData();
      cy.url().should("include", "Order.action");
      cy.validateFirstMessage("Please confirm the information below");
      cy.confirmOrder();
      cy.url().should("include", "confirmed=true");
      cy.validateFinalMessage("Thank you, your order has been submitted.");
    });
  });
});
