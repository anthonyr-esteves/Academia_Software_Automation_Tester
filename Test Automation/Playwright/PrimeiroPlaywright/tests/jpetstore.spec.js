import { test, expect } from "@playwright/test";

/**
 * Teste 1 - Registar uma nova conta
 */
test.skip("register new account", async ({ page }) => {
  await page.goto(
    "https://petstore.octoperf.com/actions/Account.action?newAccountForm=",
  );

  // Verificar título da página
  await expect(
    page.getByRole("heading", { name: "User Information" }),
  ).toBeVisible();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill("AE_teste");

  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill("Seroquel100.");

  await page.locator('input[name="repeatedPassword"]').click();
  await page.locator('input[name="repeatedPassword"]').fill("Seroquel100.");

  await expect(
    page.getByRole("heading", { name: "Account Information" }),
  ).toBeVisible();

  await page.locator('input[name="account.firstName"]').click();
  await page.locator('input[name="account.firstName"]').fill("Teste 1");

  await page.locator('input[name="account.lastName"]').click();
  await page.locator('input[name="account.lastName"]').fill("Teste 2");

  await page.locator('input[name="account.email"]').click();
  await page.locator('input[name="account.email"]').fill("teste@teste.com");

  await page.locator('input[name="account.phone"]').click();
  await page.locator('input[name="account.phone"]').fill("0612345678");

  await page.locator('input[name="account.address1"]').click();
  await page.locator('input[name="account.address1"]').fill("Rua do Teste");

  await page.locator('input[name="account.address2"]').click();
  await page.locator('input[name="account.address2"]').fill("Rua do Teste");

  await page.locator('input[name="account.city"]').click();
  await page.locator('input[name="account.city"]').fill("Porto");

  await page.locator('input[name="account.state"]').click();
  await page.locator('input[name="account.state"]').fill("Porto");

  await page.locator('input[name="account.zip"]').click();
  await page.locator('input[name="account.zip"]').fill("4050-444");

  await page.locator('input[name="account.country"]').click();
  await page.locator('input[name="account.country"]').fill("Portugal");

  await expect(
    page.getByRole("heading", { name: "Profile Information" }),
  ).toBeVisible();

  await page
    .locator('select[name="account.languagePreference"]')
    .selectOption("english");

  await page
    .locator('select[name="account.favouriteCategoryId"]')
    .selectOption("DOGS");

  await page.locator('input[name="account.listOption"]').check();
  await page.locator('input[name="account.bannerOption"]').uncheck();

  await page.getByRole("button", { name: "Save Account Information" }).click();
});

/**
 * Teste 2 - Fazer login numa conta existente
 */
test.skip("login with existing account", async ({ page }) => {
  await page.goto(
    "https://petstore.octoperf.com/actions/Account.action?signonForm=",
  );

  // Verificar título da página
  await expect(page.getByText("Please enter your username")).toBeVisible();

  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill("AE_teste");

  await page.locator('input[name="password"]').clear();
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill("Seroquel100.");

  await page.getByRole("button", { name: "Login" }).click();
});
