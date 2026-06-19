import { test, expect } from "@playwright/test";

test("CT-API-011 - Obter estatísticas da biblioteca", async ({ request }) => {
  const response = await request.get("/estatisticas");

  // Status code conforme PDF
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Validar campos obrigatórios
  expect(body).toHaveProperty("totalLivros");
  expect(body).toHaveProperty("totalPaginas");
  expect(body).toHaveProperty("totalUsuarios");

  // Todos devem ser inteiros não-negativos
  expect(Number.isInteger(body.totalLivros)).toBe(true);
  expect(body.totalLivros).toBeGreaterThanOrEqual(0);

  expect(Number.isInteger(body.totalPaginas)).toBe(true);
  expect(body.totalPaginas).toBeGreaterThanOrEqual(0);

  expect(Number.isInteger(body.totalUsuarios)).toBe(true);
  expect(body.totalUsuarios).toBeGreaterThanOrEqual(0);

  // Validar que totalPaginas é coerente com a soma dos livros
  const livrosResponse = await request.get("/livros");
  expect(livrosResponse.status()).toBe(200);

  const livros = await livrosResponse.json();
  const somaPaginas = livros.reduce((acc, livro) => acc + livro.paginas, 0);

  expect(body.totalPaginas).toBe(somaPaginas);
});
