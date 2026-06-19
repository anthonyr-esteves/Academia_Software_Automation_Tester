import { test, expect } from "@playwright/test";

test.skip("CT-FE-005: Verificar Proteção de Rotas", async ({ page }) => {
  // Garantir que não há sessão ativa
  await page.addInitScript(() => localStorage.clear());

  // Acessar diretamente o dashboard sem estar autenticado
  await page.goto("http://localhost:3000/dashboard.html");

  // Validar redirecionamento automático para login
  await expect(page).toHaveURL(/login\.html$/);

  // Validar comportamento indicando necessidade de login (se existir)
  // Exemplo: mensagem no console, banner, ou texto na página
  // Aqui validamos apenas se a página contém algo relacionado a login
  await expect(page.locator("body")).toContainText(/login/i);
});
