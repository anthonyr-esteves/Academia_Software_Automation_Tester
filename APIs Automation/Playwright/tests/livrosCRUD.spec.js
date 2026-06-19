// @ts-check
import { test, expect } from "@playwright/test";

const livro = {
  nome: "O Alquimista Playwright",
  autor: "Paulo Coelho Playwright",
  paginas: 210,
};

/**
 * @type {any}
 */
let livroId;

test.beforeEach(async ({ request }) => {
  let response = await request.post("/livros", {
    data: livro,
  });
  expect(response.status()).toBe(201);

  const body = await response.json();
  livroId = body.id;

  expect(body.nome).toBe("O Alquimista Playwright");
  expect(body.autor).toBe("Paulo Coelho Playwright");
  expect(body.paginas).toBe(210);
});

test("Listar todos os livros", async ({ request }) => {
  let response = await request.get("/livros");
  // comparar resposta com status
  expect(response.status()).toBe(200);

  const respostajson = await response.json();

  expect(Array.isArray(respostajson)).toBe(true);
});

test("Listar livro especifico", async ({ request }) => {
  let response = await request.get(`/livros/${livroId}`);
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(livroId);
  expect(body.nome).toBe("O Alquimista Playwright");
  expect(body.autor).toBe("Paulo Coelho Playwright");
  expect(body.paginas).toBe(210);
});

test("Editar livro especifico", async ({ request }) => {
  let response = await request.put(`/livros/${livroId}`, {
    data: {
      nome: "O Alquimista Editado Playwright",
      autor: "Paulo Coelho Editado Playwright",
      paginas: 210,
    },
  });
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(livroId);
  expect(body.nome).toBe("O Alquimista Editado Playwright");
  expect(body.autor).toBe("Paulo Coelho Editado Playwright");
  expect(body.paginas).toBe(210);
});

test("Eliminar livro especifico", async ({ request }) => {
  const response = await request.delete(`/livros/${livroId}`);
  expect(response.status()).toBe(204);
});
