import { test, expect } from "@playwright/test";

test.skip("CT-FE-010: Visualizar Detalhes de Livro (ID=1)", async ({
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

  // Acessar diretamente o livro ID=1
  await page.goto("http://localhost:3000/detalhes.html?id=1");

  // Validar imagem
  await expect(page.locator(".book-image img")).toBeVisible();

  // Validar nome do livro
  await expect(page.getByRole("heading", { level: 2 })).toBeVisible();

  // Validar campos obrigatórios
  await expect(page.getByText("Autor:", { exact: false })).toBeVisible();
  await expect(page.getByText("Páginas:", { exact: false })).toBeVisible();
  await expect(page.getByText("Descrição:", { exact: false })).toBeVisible();
  await expect(
    page.getByText("Data de Cadastro:", { exact: false }),
  ).toBeVisible();

  // Validar botões de ação
  await expect(page.getByRole("button", { name: /Favoritos/ })).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Deletar Livro/ }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /Voltar/ })).toBeVisible();
});
