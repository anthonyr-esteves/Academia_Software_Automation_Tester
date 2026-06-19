import { test, expect } from "@playwright/test";

test.skip("CT-FE-007: Adicionar Novo Livro", async ({ page }) => {
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

  await page.goto("http://localhost:3000/livros.html");

  // Listener do alert
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe("Livro adicionado com sucesso!");
    dialog.accept();
  });

  // Preencher formulário usando getByRole
  await page.getByRole("textbox", { name: "Nome do Livro:" }).fill("O Hobbit");
  await page.getByRole("textbox", { name: "Autor:" }).fill("J.R.R. Tolkien");
  await page
    .getByRole("spinbutton", { name: "Número de Páginas:" })
    .fill("310");
  await page
    .getByRole("textbox", { name: "Descrição:" })
    .fill("Um clássico da literatura fantástica.");
  await page
    .getByRole("textbox", { name: "URL da Imagem:" })
    .fill("the-hobbit.jpg");

  // Submeter
  await page.locator('button[type="submit"]').click();

  // Validar limpeza do formulário
  await expect(
    page.getByRole("textbox", { name: "Nome do Livro:" }),
  ).toHaveValue("");
  await expect(page.getByRole("textbox", { name: "Autor:" })).toHaveValue("");
  await expect(
    page.getByRole("spinbutton", { name: "Número de Páginas:" }),
  ).toHaveValue("");
  await expect(page.getByRole("textbox", { name: "Descrição:" })).toHaveValue(
    "",
  );
  await expect(
    page.getByRole("textbox", { name: "URL da Imagem:" }),
  ).toHaveValue("");

  // Validar que o novo livro aparece na lista
  await expect(
    page.locator(".book-card h3", { hasText: "O Hobbit" }),
  ).toBeVisible();
});

test.skip("CT-FE-008: Validação de Campos Obrigatórios", async ({ page }) => {
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

  await page.goto("http://localhost:3000/livros.html");

  const nome = page.getByRole("textbox", { name: "Nome do Livro:" });
  const autor = page.getByRole("textbox", { name: "Autor:" });
  const paginas = page.getByRole("spinbutton", { name: "Número de Páginas:" });
  const descricao = page.getByRole("textbox", { name: "Descrição:" });
  const imagem = page.getByRole("textbox", { name: "URL da Imagem:" });

  const submit = page.locator('button[type="submit"]');

  // 1. Tentar submeter formulário vazio
  await submit.click();

  // Validar mensagens HTML5 (não vazias)
  const nomeMsg = await nome.evaluate((el) => el.validationMessage);
  expect(nomeMsg.length).toBeGreaterThan(0);

  const autorMsg = await autor.evaluate((el) => el.validationMessage);
  expect(autorMsg.length).toBeGreaterThan(0);

  const paginasMsg = await paginas.evaluate((el) => el.validationMessage);
  expect(paginasMsg.length).toBeGreaterThan(0);

  // 2. Preencher apenas um campo e tentar submeter novamente
  await nome.fill("Teste Parcial");
  await submit.click();

  // Autor continua obrigatório
  const autorMsg2 = await autor.evaluate((el) => el.validationMessage);
  expect(autorMsg2.length).toBeGreaterThan(0);

  // Páginas continua obrigatório
  const paginasMsg2 = await paginas.evaluate((el) => el.validationMessage);
  expect(paginasMsg2.length).toBeGreaterThan(0);
});

test.skip("CT-FE-009: Navegação Entre Páginas", async ({ page }) => {
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

  // Capturar erros de console
  const consoleErrors = [];
  page.on("pageerror", (err) => consoleErrors.push(err.message));

  // Acessar dashboard
  await page.goto("http://localhost:3000/dashboard.html");

  // Navegar para Gerenciar Livros
  await page.getByRole("link", { name: "Gerenciar Livros" }).click();
  await expect(page).toHaveURL(/livros\.html/);

  // Navegar para Meus Favoritos
  await page.getByRole("link", { name: "Meus Favoritos" }).click();
  await expect(page).toHaveURL(/favoritos\.html/);

  // Voltar para Dashboard
  await page.getByRole("link", { name: "Dashboard" }).click();
  await expect(page).toHaveURL(/dashboard\.html/);

  // Validar que não houve erros de console
  expect(consoleErrors).toHaveLength(0);
});

test.skip("CT-FE-014: Deletar Livro com Confirmação (criando e removendo livro temporário)", async ({
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

  // Gerar nome único para o livro
  const nomeLivro = `Livro Teste Delete ${Date.now()}`;

  // Acessar página de livros
  await page.goto("http://localhost:3000/livros.html");

  // Criar livro temporário
  await page.getByRole("textbox", { name: "Nome do Livro:" }).fill(nomeLivro);
  await page.getByRole("textbox", { name: "Autor:" }).fill("Autor Teste");
  await page
    .getByRole("spinbutton", { name: "Número de Páginas:" })
    .fill("123");
  await page
    .getByRole("textbox", { name: "Descrição:" })
    .fill("Descrição teste");
  await page
    .getByRole("textbox", { name: "URL da Imagem:" })
    .fill("the-hobbit.jpg");

  // Alert de sucesso ao adicionar
  page.once("dialog", (dialog) => dialog.accept());

  await page.getByRole("button", { name: /Adicionar Livro/ }).click();

  // Validar que o livro aparece na lista
  await expect(
    page.locator(".book-card", { hasText: nomeLivro }),
  ).toBeVisible();

  // Abrir o livro
  await page.locator(".book-card", { hasText: nomeLivro }).click();

  // Confirm dialog de deleção
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toContain("Tem certeza que deseja deletar");
    dialog.accept();
  });

  // Clicar em "Deletar Livro"
  await page.getByRole("button", { name: /Deletar Livro/ }).click();

  // Alert de sucesso
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe("Livro deletado com sucesso!");
    dialog.accept();
  });

  // Validar redirecionamento
  await expect(page).toHaveURL("http://localhost:3000/livros.html");

  // Validar que o livro foi removido
  await expect(page.locator(".book-card", { hasText: nomeLivro })).toHaveCount(
    0,
  );
});

test.skip("CT-FE-015: Cancelar Deleção de Livro", async ({ page }) => {
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

  // Criar nome único para o livro
  const nomeLivro = `Livro Teste Cancel Delete ${Date.now()}`;

  // Acessar página de livros
  await page.goto("http://localhost:3000/livros.html");

  // Criar livro temporário
  await page.getByRole("textbox", { name: "Nome do Livro:" }).fill(nomeLivro);
  await page.getByRole("textbox", { name: "Autor:" }).fill("Autor Teste");
  await page
    .getByRole("spinbutton", { name: "Número de Páginas:" })
    .fill("123");
  await page
    .getByRole("textbox", { name: "Descrição:" })
    .fill("Descrição teste");
  await page
    .getByRole("textbox", { name: "URL da Imagem:" })
    .fill("the-hobbit.jpg");

  // Alert ao adicionar
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: /Adicionar Livro/ }).click();

  // Validar que o livro aparece na lista
  await expect(
    page.locator(".book-card", { hasText: nomeLivro }),
  ).toBeVisible();

  // Abrir o livro
  await page.locator(".book-card", { hasText: nomeLivro }).click();

  // Cancelar o confirm de deleção
  page.once("dialog", (dialog) => {
    expect(dialog.message()).toContain("Tem certeza que deseja deletar");
    dialog.dismiss(); // CANCELAR
  });

  // Clicar em "Deletar Livro"
  await page.getByRole("button", { name: /Deletar Livro/ }).click();

  // Validar que continuamos na página de detalhes (sem redirecionamento)
  await expect(page).toHaveURL(/detalhes\.html/);

  // Validar que o livro NÃO foi apagado
  await page.goto("http://localhost:3000/livros.html");

  await expect(
    page.locator(".book-card", { hasText: nomeLivro }),
  ).toBeVisible();
});
