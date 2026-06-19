import { test, expect } from "@playwright/test";

test("CT-API-012 - Adicionar livro aos favoritos", async ({ request }) => {
  const payload = {
    usuarioId: 1,
    livroId: 1,
  };

  const response = await request.post("/favoritos", {
    data: payload,
  });

  // Status code conforme PDF
  expect(response.status()).toBe(201);

  const body = await response.json();

  // Mensagem conforme PDF
  expect(body.mensagem).toBe("Livro adicionado aos favoritos");
});

test("CT-API-013 - Listar favoritos de um usuário", async ({ request }) => {
  const response = await request.get("/favoritos/1");

  // Status code conforme PDF
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Resposta deve ser um array
  expect(Array.isArray(body)).toBe(true);

  // Validar estrutura de cada livro retornado
  for (const livro of body) {
    expect(livro).toHaveProperty("id");
    expect(livro).toHaveProperty("nome");
    expect(livro).toHaveProperty("autor");
    expect(livro).toHaveProperty("paginas");
    expect(livro).toHaveProperty("descricao");
    expect(livro).toHaveProperty("imagemUrl");
    expect(livro).toHaveProperty("dataCadastro");

    // Validar que o livro realmente está nos favoritos do usuário 1
    // (Opcional, mas profissional)
    expect(livro.favoritadoPor).toContain(1);
  }
});
