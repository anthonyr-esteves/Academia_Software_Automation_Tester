import { test, expect } from "@playwright/test";

test.skip("CT-FE-011: Adicionar Livro aos Favoritos", async ({ page }) => {
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

  // Listener do alert
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe("Adicionado aos favoritos!");
    dialog.accept();
  });

  // Clicar no botão "Adicionar aos Favoritos"
  await page.getByRole("button", { name: /Adicionar aos Favoritos/ }).click();

  // Após reload automático, validar que o botão mudou para "Remover dos Favoritos"
  await expect(
    page.getByRole("button", { name: /Remover dos Favoritos/ }),
  ).toBeVisible();

  // Acessar página de favoritos
  await page.goto("http://localhost:3000/favoritos.html");

  // Validar que o livro aparece na lista de favoritos
  await expect(
    page.locator(".book-card", { hasText: "Clean Code" }),
  ).toBeVisible();
});

test.skip("CT-FE-012: Remover Livro dos Favoritos", async ({ page }) => {
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

  // Listener do alert
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe("Removido dos favoritos!");
    dialog.accept();
  });

  // Clicar no botão "Remover dos Favoritos"
  await page.getByRole("button", { name: /Remover dos Favoritos/ }).click();

  // Após reload automático, validar que o botão voltou para "Adicionar aos Favoritos"
  await expect(
    page.getByRole("button", { name: /Adicionar aos Favoritos/ }),
  ).toBeVisible();

  // Acessar página de favoritos
  await page.goto("http://localhost:3000/favoritos.html");

  // Validar que o livro NÃO aparece mais na lista de favoritos
  await expect(
    page.locator(".book-card", { hasText: "Clean Code" }),
  ).toHaveCount(0);
});

test.skip("CT-FE-013: Listar Livros Favoritos", async ({ page }) => {
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

  // FASE A — Garantir que NÃO há favoritos
  // Acessar página de favoritos
  await page.goto("http://localhost:3000/favoritos.html");

  // Enquanto existir algum favorito, remover manualmente
  while ((await page.locator(".book-card").count()) > 0) {
    // Abrir o primeiro favorito
    await page.locator(".book-card").first().click();

    // Confirmar alerta de remoção
    page.once("dialog", (dialog) => dialog.accept());

    // Clicar em "Remover dos Favoritos"
    await page.getByRole("button", { name: /Remover dos Favoritos/ }).click();

    // Voltar para favoritos
    await page.goto("http://localhost:3000/favoritos.html");
  }

  // Validar mensagem de lista vazia
  await expect(
    page.getByText("Você ainda não tem livros favoritos", { exact: false }),
  ).toBeVisible();

  // Validar que não há cards
  await expect(page.locator(".book-card")).toHaveCount(0);

  // FASE B — Adicionar um favorito manualmente
  // Acessar página de livros
  await page.goto("http://localhost:3000/livros.html");

  // Clicar no card do livro ID=1
  await page.locator(".book-card", { hasText: "Clean Code" }).click();

  // Confirmar alerta de adição
  page.once("dialog", (dialog) => dialog.accept());

  // Clicar em "Adicionar aos Favoritos"
  await page.getByRole("button", { name: /Adicionar aos Favoritos/ }).click();

  // Voltar para favoritos
  await page.goto("http://localhost:3000/favoritos.html");

  // Validar que agora existe pelo menos 1 card
  await expect(page.locator(".book-card")).toHaveCount(1);

  // Validar que a mensagem desapareceu
  await expect(
    page.getByText("Você ainda não tem livros favoritos", { exact: false }),
  ).not.toBeVisible();
});
