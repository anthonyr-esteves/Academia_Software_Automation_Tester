import { test, expect } from "@playwright/test";

test.skip("CT-FE-006: Visualizar Dashboard com Estatísticas", async ({
  page,
}) => {
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

  // Acessar dashboard
  await page.goto("http://localhost:3000/dashboard.html");

  // Validar que os cards de estatísticas existem
  await expect(page.getByText("Total de Livros")).toBeVisible();
  await expect(page.getByText("Total de Páginas")).toBeVisible();
  await expect(page.getByText("Usuários Cadastrados")).toBeVisible();

  // Validar que os valores numéricos estão formatados corretamente
  const stats = page.locator(".stat-value");
  const count = await stats.count();

  for (let i = 0; i < count; i++) {
    const value = await stats.nth(i).innerText();
    expect(value).toMatch(/^\d+$/); // apenas números
  }

  // Validar grid de "Últimos Livros Adicionados"
  const cards = page.locator(".book-card");

  // Deve haver pelo menos 1 livro
  await expect(cards).not.toHaveCount(0);

  // Deve exibir no máximo 5 livros
  const totalCards = await cards.count();
  expect(totalCards).toBeLessThanOrEqual(5);

  // Validar que cada card contém imagem, nome e autor
  for (let i = 0; i < totalCards; i++) {
    const card = cards.nth(i);

    await expect(card.locator("img")).toBeVisible();
    await expect(card.locator("h3")).not.toBeEmpty();
    await expect(card.locator("p", { hasText: "Autor" })).toBeVisible();
  }
});
