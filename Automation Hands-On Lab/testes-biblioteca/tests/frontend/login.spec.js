import { test, expect } from "@playwright/test";

test.skip("CT-FE-003: Login com Sucesso", async ({ page }) => {
  await page.goto("http://localhost:3000/login.html");

  // Listener do alert
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe("Login realizado com sucesso!");
    dialog.accept();
  });

  // Preencher email e senha
  await page
    .getByRole("textbox", { name: "Email:" })
    .fill("admin@biblioteca.com");
  await page.getByRole("textbox", { name: "Senha:" }).fill("123456");

  // Submeter
  await page.locator('button[type="submit"]').click();

  // Validar redirecionamento
  await expect(page).toHaveURL(/dashboard\.html$/);

  // Validar nome no header
  await expect(page.getByText("Admin")).toBeVisible();

  // Validar localStorage
  const userData = await page.evaluate(() => localStorage.getItem("usuario"));
  expect(userData).not.toBeNull();
});

test.skip("CT-FE-004: Login com Credenciais Inválidas", async ({ page }) => {
  await page.goto("http://localhost:3000/login.html");

  // Listener do alert
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe("Email ou senha incorretos");
    dialog.accept();
  });

  // Preencher email e senha inválidos
  await page
    .getByRole("textbox", { name: "Email:" })
    .fill("admin@biblioteca.com");
  await page.getByRole("textbox", { name: "Senha:" }).fill("senhaerrada");

  // Submeter
  await page.locator('button[type="submit"]').click();

  // Validar que o utilizador permanece na página de login
  await expect(page).toHaveURL(/login\.html$/);

  // Validar que os campos NÃO foram limpos
  await expect(page.getByRole("textbox", { name: "Email:" })).toHaveValue(
    "admin@biblioteca.com",
  );
  await expect(page.getByRole("textbox", { name: "Senha:" })).toHaveValue(
    "senhaerrada",
  );
});
