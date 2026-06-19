import { test, expect } from "@playwright/test";

/**
 * Forçar os testes deste ficheiro a correrem em ordem (um após o outro).
 * Isto garante que o teste de login só começa depois do registo terminar.
 */
test.describe.configure({ mode: "serial" });

// Variáveis globais para guardar o username e password criados no registo
let username = "";
let password = "";

/**
 * Teste 1 - Registar uma nova conta
 */
test.skip("register new account", async ({ page }) => {
  // Criar username único para evitar erros de duplicado
  username = "AE_teste_" + Date.now();
  password = "Seroquel100.";

  // Abrir página de registo
  await page.goto(
    "https://petstore.octoperf.com/actions/Account.action?newAccountForm=",
  );

  // Verificar que a secção "User Information" aparece
  await expect(
    page.getByRole("heading", { name: "User Information" }),
  ).toBeVisible();

  // Preencher dados de login
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('input[name="repeatedPassword"]').fill(password);

  // Verificar que a secção "Account Information" aparece
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

  // Verificar que a secção "Profile Information" aparece
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
});

/**
 * Teste 2 - Fazer login com a conta criada
 */
test.skip("login with existing account", async ({ page }) => {
  // Abrir página de login
  await page.goto(
    "https://petstore.octoperf.com/actions/Account.action?signonForm=",
  );

  // Verificar que a página carregou
  await expect(page.getByText("Please enter your username")).toBeVisible();

  // Preencher username e password criados no teste anterior
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').clear();
  await page.locator('input[name="password"]').fill(password);

  // Clicar no botão de login
  await page.getByRole("button", { name: "Login" }).click();

  /**
   * VALIDAÇÃO APÓS LOGIN
   * Se o login for bem sucedido, o botão "Sign Out" aparece no topo da página.
   */
  await expect(page.getByRole("link", { name: "Sign Out" })).toBeVisible();
});
