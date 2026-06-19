import { test, expect } from "@playwright/test";

test("CT-API-001 - Registro de novo usuário com sucesso", async ({
  request,
}) => {
  // Criar email único para evitar duplicados
  const emailUnico = `maria${Date.now()}@teste.com`;

  // Enviar requisição POST para /registro
  const response = await request.post("/registro", {
    data: {
      nome: "Maria Silva",
      email: emailUnico,
      senha: "senha123",
    },
  });

  // Validação do status code
  expect(response.status()).toBe(201);

  // Ler corpo da resposta
  const body = await response.json();

  // Validações do PDF
  expect(body.mensagem).toBe("Usuário criado com sucesso");
  expect(body.usuario).toBeDefined();
  expect(body.usuario.id).toBeGreaterThan(0);
  expect(body.usuario.nome).toBe("Maria Silva");
  expect(body.usuario.email).toBe(emailUnico);

  // Validação crítica: senha não deve vir na resposta
  expect(body.usuario.senha).toBeUndefined();
});

test("CT-API-002 - Registro com email duplicado deve falhar", async ({
  request,
}) => {
  // Email que já existe no sistema (conforme PDF)
  const emailDuplicado = "admin@biblioteca.com";

  const response = await request.post("/registro", {
    data: {
      nome: "João Santos",
      email: emailDuplicado,
      senha: "senha456",
    },
  });

  // Validação do status code
  expect(response.status()).toBe(400);

  const body = await response.json();

  // Validação da mensagem de erro
  expect(body.mensagem).toBe("Email já cadastrado");
});
