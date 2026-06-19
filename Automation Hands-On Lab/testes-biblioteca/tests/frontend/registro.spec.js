import { test, expect } from "@playwright/test";

test.skip("CT-FE-001: Fluxo Completo de Registro", async ({ page }) => {
  await page.goto("http://localhost:3000/registro.html");

  // Listener do alert
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe("Conta criada com sucesso!");
    dialog.accept();
  });

  // Preencher formulário
  await page.getByRole("textbox", { name: "Nome:" }).fill("Carlos Oliveira");
  await page.getByRole("textbox", { name: "Email:" }).fill("carlos@test.com");
  await page
    .getByRole("textbox", { name: "Senha:", exact: true })
    .fill("senha123");
  await page
    .getByRole("textbox", { name: "Confirmar Senha:", exact: true })
    .fill("senha123");

  // Submeter
  await page.locator('button[type="submit"]').click();

  // Validar redirecionamento
  await expect(page).toHaveURL(/login\.html$/);
});

test.skip("CT-FE-002: Validação de Senhas Não Correspondentes", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/registro.html");

  // Listener do alert
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe("As senhas não coincidem!");
    dialog.accept();
  });

  // Preencher formulário com senhas diferentes
  await page.getByRole("textbox", { name: "Nome:" }).fill("Teste Erro");
  await page.getByRole("textbox", { name: "Email:" }).fill("erro@test.com");
  await page
    .getByRole("textbox", { name: "Senha:", exact: true })
    .fill("senha123");
  await page
    .getByRole("textbox", { name: "Confirmar Senha:", exact: true })
    .fill("senha456");

  // Submeter
  await page.locator('button[type="submit"]').click();

  // Validar que o utilizador permanece na página de registro
  await expect(page).toHaveURL(/registro\.html$/);
});
