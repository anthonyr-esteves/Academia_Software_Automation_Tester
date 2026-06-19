import { test, expect } from "@playwright/test";

// Variáveis para gerar dados únicos por execução
let name = "";
let emailAddress = "";

test.skip("To Practice", async ({ page }) => {
  // 1. Abrir o site principal
  await page.goto("https://automationexercise.com/");

  // 2. Aceitar cookies / consentimento
  await page.getByRole("button", { name: "Consent" }).click();

  // 3. Navegar para a página de Signup/Login
  await page.getByRole("link", { name: " Signup / Login" }).click();

  // 4. Validar que estamos na secção correta
  await expect(
    page.getByRole("heading", { name: "New User Signup!" }),
  ).toBeVisible();

  // 5. Criar dados únicos para o novo utilizador
  name = "Test_" + Date.now();
  emailAddress = Date.now() + "@test.com";

  // 6. Preencher o formulário de Signup
  await page.getByRole("textbox", { name: "Name" }).fill(name);
  await page
    .locator("form")
    .filter({ hasText: "Signup" })
    .getByPlaceholder("Email Address")
    .fill(emailAddress);

  // 7. Submeter o formulário
  await page.getByRole("button", { name: "Signup" }).click();

  // 8. Validar que avançou para a página de criação de conta
  await expect(
    page.getByRole("heading", { name: "Enter Account Information" }),
  ).toBeVisible();

  // 9. Preencher dados pessoais obrigatórios
  await page.getByRole("radio", { name: "Mr." }).check();
  await page.getByRole("textbox", { name: "Password *" }).fill("Seroquel100");

  // 10. Selecionar data de nascimento
  await page.locator("#days").selectOption("5");
  await page.locator("#months").selectOption("March");
  await page.locator("#years").selectOption("1975");

  // 11. Preencher dados de nome e morada
  await page.getByRole("textbox", { name: "First name *" }).fill("Test 1");
  await page.getByRole("textbox", { name: "Last name *" }).fill("Test 2");
  await page
    .getByRole("textbox", { name: "Address * (Street address, P." })
    .fill("Rua do teste");
  await page.getByRole("textbox", { name: "Address 2" }).fill("N/A");

  // 12. Selecionar país e preencher restantes campos de endereço
  await page.getByLabel("Country *").selectOption("United States");
  await page.getByRole("textbox", { name: "State *" }).fill("NY");
  await page.getByRole("textbox", { name: "City * Zipcode *" }).fill("NY");
  await page.locator("#zipcode").fill("5000-400");
  await page
    .getByRole("textbox", { name: "Mobile Number *" })
    .fill("0612345678");

  // 13. Criar a conta
  await page.getByRole("button", { name: "Create Account" }).click();

  // 14. Validar que a conta foi criada com sucesso
  await expect(
    page.getByRole("heading", { name: "Account Created!" }),
  ).toBeVisible();

  // 15. Continuar para a área autenticada
  await page.getByRole("link", { name: "Continue" }).click();

  // 16. Validar que o utilizador está autenticado
  await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
});
