import { test, expect } from "@playwright/test";

test("CT-API-005 - Listar todos os livros", async ({ request }) => {
  const response = await request.get("/livros");

  // Status code
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Resposta deve ser um array
  expect(Array.isArray(body)).toBe(true);

  // Validar estrutura de cada livro
  for (const livro of body) {
    expect(livro).toHaveProperty("id");
    expect(livro).toHaveProperty("nome");
    expect(livro).toHaveProperty("autor");
    expect(livro).toHaveProperty("paginas");
    expect(livro).toHaveProperty("descricao");
    expect(livro).toHaveProperty("imagemUrl");
    expect(livro).toHaveProperty("dataCadastro");

    // paginas deve ser inteiro positivo
    expect(livro.paginas).toBeGreaterThan(0);

    // dataCadastro deve estar em formato ISO 8601
    const dataValida = !isNaN(Date.parse(livro.dataCadastro));
    expect(dataValida).toBe(true);
  }
});

test("CT-API-006 - Buscar livro por ID existente", async ({ request }) => {
  const response = await request.get("/livros/1");

  // Status code
  expect(response.status()).toBe(200);

  const livro = await response.json();

  // Validar ID
  expect(livro.id).toBe(1);

  // Validar campos obrigatórios
  expect(livro).toHaveProperty("nome");
  expect(livro).toHaveProperty("autor");
  expect(livro).toHaveProperty("paginas");
  expect(livro).toHaveProperty("descricao");
  expect(livro).toHaveProperty("imagemUrl");
  expect(livro).toHaveProperty("dataCadastro");

  // Nome não pode estar vazio
  expect(livro.nome.trim().length).toBeGreaterThan(0);
});

test("CT-API-007 - Buscar livro por ID inexistente deve retornar 404", async ({
  request,
}) => {
  const response = await request.get("/livros/9999");

  // Status code conforme PDF
  expect(response.status()).toBe(404);

  const body = await response.json();

  // Mensagem de erro conforme PDF
  expect(body.mensagem).toBe("Livro não encontrado");
});

test("CT-API-008 - Adicionar novo livro com sucesso", async ({ request }) => {
  const novoLivro = {
    nome: "Código Limpo",
    autor: "Robert C. Martin",
    paginas: 425,
    descricao: "Manual de boas práticas",
    imagemUrl: "https://exemplo.com/imagem.jpg",
  };

  const response = await request.post("/livros", {
    data: novoLivro,
  });

  // Status code conforme PDF
  expect(response.status()).toBe(201);

  const body = await response.json();

  // Deve retornar o livro criado
  expect(body).toHaveProperty("id");
  expect(body.id).toBeGreaterThan(0);

  // dataCadastro deve existir
  expect(body).toHaveProperty("dataCadastro");

  // Validar que os valores enviados foram aplicados
  expect(body.nome).toBe(novoLivro.nome);
  expect(body.autor).toBe(novoLivro.autor);
  expect(body.paginas).toBe(novoLivro.paginas);
  expect(body.descricao).toBe(novoLivro.descricao);
  expect(body.imagemUrl).toBe(novoLivro.imagemUrl);

  // Validar formato da data
  const dataValida = !isNaN(Date.parse(body.dataCadastro));
  expect(dataValida).toBe(true);
});

test("CT-API-009 - Atualizar livro existente com sucesso", async ({
  request,
}) => {
  // Primeiro, buscar o livro original para comparar depois
  const originalResponse = await request.get("/livros/1");
  expect(originalResponse.status()).toBe(200);

  const livroOriginal = await originalResponse.json();

  // Dados atualizados
  const livroAtualizado = {
    nome: "Código Limpo - Edição Revisada",
    autor: "Robert C. Martin",
    paginas: 450,
    descricao: "Versão atualizada do clássico de boas práticas",
    imagemUrl: "https://exemplo.com/imagem-atualizada.jpg",
  };

  // Enviar atualização
  const updateResponse = await request.put("/livros/1", {
    data: livroAtualizado,
  });

  // Status code conforme PDF
  expect(updateResponse.status()).toBe(200);

  const body = await updateResponse.json();

  // ID deve permanecer o mesmo
  expect(body.id).toBe(livroOriginal.id);

  // dataCadastro deve permanecer igual
  expect(body.dataCadastro).toBe(livroOriginal.dataCadastro);

  // Validar que os novos valores foram aplicados
  expect(body.nome).toBe(livroAtualizado.nome);
  expect(body.autor).toBe(livroAtualizado.autor);
  expect(body.paginas).toBe(livroAtualizado.paginas);
  expect(body.descricao).toBe(livroAtualizado.descricao);
  expect(body.imagemUrl).toBe(livroAtualizado.imagemUrl);
});

test("CT-API-010 - Remover livro existente com sucesso", async ({
  request,
}) => {
  // Primeiro, criar um livro temporário para remover
  const novoLivro = {
    nome: "Livro Temporário",
    autor: "Autor Teste",
    paginas: 123,
    descricao: "Livro criado apenas para teste de remoção",
    imagemUrl: "https://exemplo.com/temp.jpg",
  };

  const createResponse = await request.post("/livros", {
    data: novoLivro,
  });

  expect(createResponse.status()).toBe(201);

  const livroCriado = await createResponse.json();
  const idLivro = livroCriado.id;

  // Agora remover o livro criado
  const deleteResponse = await request.delete(`/livros/${idLivro}`);

  // Status code conforme PDF
  expect(deleteResponse.status()).toBe(200);

  const body = await deleteResponse.json();

  // Mensagem conforme PDF
  expect(body.mensagem).toBe("Livro removido com sucesso");

  // Validar que o livro realmente não existe mais
  const getResponse = await request.get(`/livros/${idLivro}`);
  expect(getResponse.status()).toBe(404);
});
