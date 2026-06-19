// @ts-check
import { test, expect } from "@playwright/test";

/**
 * ---------------------------------------------------------
 * EXECUÇÃO SEQUENCIAL
 * ---------------------------------------------------------
 * O Playwright, por padrão, executa testes em paralelo.
 * Aqui dizemos explicitamente:
 *   "Corre estes testes um a seguir ao outro".
 *
 * Isto NÃO partilha sessão, cookies ou carrinho.
 * Apenas garante a ordem de execução.
 * ---------------------------------------------------------
 */
test.describe.configure({ mode: "serial" });

// Variáveis globais para guardar dados criados no Teste 1 e Teste 3
let username = "";
let password = "";
let productID = "";
let productName = "";

/**
 * ---------------------------------------------------------
 * FUNÇÃO DE LOGIN (REUTILIZÁVEL)
 * ---------------------------------------------------------
 * Esta função evita repetição de código.
 * Sempre que um teste precisa de login, chamamos login().
 *
 * O JSDoc abaixo ajuda o VSCode a perceber os tipos,
 * remove avisos e melhora o autocomplete.
 * ---------------------------------------------------------
 */

/**
 * Faz login com username e password
 * @param {import('@playwright/test').Page} page - Página atual do Playwright
 * @param {string} username - Username criado no teste 1
 * @param {string} password - Password criada no teste 1
 */
async function login(page, username, password) {
  // Abre o formulário de login
  await page.goto(
    "https://petstore.octoperf.com/actions/Account.action?signonForm=",
  );

  // Preenche credenciais
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);

  // Clica no botão Login
  await page.getByRole("button", { name: "Login" }).click();

  // Valida que o login funcionou (Sign Out aparece)
  await expect(page.getByRole("link", { name: "Sign Out" })).toBeVisible();
}

/**
 * ---------------------------------------------------------
 * TESTE 1 — REGISTO DE NOVO UTILIZADOR
 * ---------------------------------------------------------
 * Este teste cria um utilizador novo e guarda o username
 * e password para os testes seguintes.
 * ---------------------------------------------------------
 */
test("register new account", async ({ page }) => {
  // Criar username único para evitar duplicados
  username = "AE_teste_" + Date.now();
  password = "Seroquel100.";

  // Abrir página de registo
  await page.goto(
    "https://petstore.octoperf.com/actions/Account.action?newAccountForm=",
  );

  // Validar que a página carregou
  await expect(
    page.getByRole("heading", { name: "User Information" }),
  ).toBeVisible();

  // Preencher dados de login
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('input[name="repeatedPassword"]').fill(password);

  // Validar secção seguinte
  await expect(
    page.getByRole("heading", { name: "Account Information" }),
  ).toBeVisible();

  // Preencher dados pessoais
  await page.locator('input[name="account.firstName"]').fill("Teste 1");
  await page.locator('input[name="account.lastName"]').fill("Teste 2");
  await page.locator('input[name="account.email"]').fill("teste@teste.com");
  await page.locator('input[name="account.phone"]').fill("0612345678");
  await page.locator('input[name="account.address1"]').fill("Rua do Teste");
  await page.locator('input[name="account.address2"]').fill("N/A");
  await page.locator('input[name="account.city"]').fill("Porto");
  await page.locator('input[name="account.state"]').fill("Porto");
  await page.locator('input[name="account.zip"]').fill("4050-444");
  await page.locator('input[name="account.country"]').fill("Portugal");

  // Validar secção seguinte
  await expect(
    page.getByRole("heading", { name: "Profile Information" }),
  ).toBeVisible();

  // Preencher preferências
  await page
    .locator('select[name="account.languagePreference"]')
    .selectOption("english");
  await page
    .locator('select[name="account.favouriteCategoryId"]')
    .selectOption("DOGS");
  await page.locator('input[name="account.listOption"]').check();
  await page.locator('input[name="account.bannerOption"]').uncheck();

  // Guardar conta
  await page.getByRole("button", { name: "Save Account Information" }).click();

  // Validação final do registo
  await expect(page.getByRole("link", { name: "Sign In" })).toBeVisible();
});

/**
 * ---------------------------------------------------------
 * TESTE 2 — LOGIN COM A CONTA CRIADA
 * ---------------------------------------------------------
 * Teste simples que usa a função login().
 * ---------------------------------------------------------
 */
test.skip("login with existing account", async ({ page }) => {
  await login(page, username, password);
});

/**
 * ---------------------------------------------------------
 * TESTE 3 — LOGIN + PESQUISA DE PRODUTO
 * ---------------------------------------------------------
 * Aqui validamos a pesquisa e guardamos o ID e nome do produto.
 * ---------------------------------------------------------
 */
test.skip("Search for a product", async ({ page }) => {
  await login(page, username, password);

  // Abrir catálogo
  await page.goto("https://petstore.octoperf.com/actions/Catalog.action");

  // Pesquisar por angelfish
  await page.getByRole("textbox").fill("angelfish");
  await page.getByRole("button", { name: "Search" }).click();

  // Abrir o produto
  await page
    .getByRole("link", { name: "Salt Water fish from Australia" })
    .click();

  // Guardar valores reais do produto
  productID = await page.getByRole("link", { name: "EST-1" }).innerText();
  productName = await page.getByText("Large Angelfish").innerText();

  // Validar que aparecem na página
  await expect(page.getByText(productID)).toBeVisible();
  await expect(page.getByText(productName)).toBeVisible();
});

/**
 * ---------------------------------------------------------
 * TESTE 4 — LOGIN + ADICIONAR AO CARRINHO
 * ---------------------------------------------------------
 * Aqui garantimos que o produto aparece no carrinho.
 * ---------------------------------------------------------
 */
test.skip("Add product to cart", async ({ page }) => {
  await login(page, username, password);

  // Abrir diretamente o item
  await page.goto(
    "https://petstore.octoperf.com/actions/Catalog.action?viewItem=&itemId=EST-1",
  );

  // Adicionar ao carrinho
  await page.getByRole("link", { name: "Add to Cart" }).click();

  // Validar ID, nome e quantidade
  await expect(page.getByText(productID)).toBeVisible();
  await expect(page.getByText(productName)).toBeVisible();
  await expect(page.locator('input[value="1"]')).toBeVisible();
});

/**
 * ---------------------------------------------------------
 * TESTE 5 — LOGIN + CHECKOUT + FINALIZAR COMPRA
 * ---------------------------------------------------------
 * Este é o fluxo completo de compra.
 * Aqui é importante usar os seletores corretos:
 *   - Continue → é um <input type="submit">
 *   - Confirm → é um <a> (role = link)
 * ---------------------------------------------------------
 */
test("Proceed to Checkout", async ({ page }) => {
  await login(page, username, password);

  // Abrir produto
  await page.goto(
    "https://petstore.octoperf.com/actions/Catalog.action?viewItem=&itemId=EST-1",
  );

  // Adicionar ao carrinho
  await page.getByRole("link", { name: "Add to Cart" }).click();

  // Ir para checkout
  await page.getByRole("link", { name: "Proceed to Checkout" }).click();

  // Validar URL inicial do checkout
  await expect(page).toHaveURL(/\/actions\/Order\.action\?newOrderForm=/);

  // Botão Continue (input type="submit")
  await page.getByRole("button", { name: "Continue" }).click();

  // Validar texto antes do Confirm
  await expect(
    page.getByText("Please confirm the information below"),
  ).toBeVisible();

  // Botão Confirm (é um link)
  await page.getByRole("link", { name: "Confirm" }).click();

  // Mensagem final de sucesso
  await expect(
    page.getByText("Thank you, your order has been submitted."),
  ).toBeVisible();
});
