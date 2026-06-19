import { test, expect } from "@playwright/test";

test.skip("CT-FE-016: Logout", async ({ page }) => {
  // Pré-condição: usuário autenticado
  await page.addInitScript(() => {
    localStorage.setItem(
      "usuario",
      JSON.stringify({
        id: 1,
        nome: "Admin",
        email: "admin@biblioteca.com",
      }),
    );
  });

  // Acessar uma página protegida (dashboard)
  await page.goto("http://localhost:3000/dashboard.html");

  // Clicar no botão de logout
  await page.getByRole("button", { name: /Sair/ }).click();

  // Validar redirecionamento para login.html
  await expect(page).toHaveURL("http://localhost:3000/login.html");

  /*// Validar que o localStorage foi limpo
  const usuario = await page.evaluate(() => localStorage.getItem("usuario"));
  expect(usuario).toBeNull();
  */
});
