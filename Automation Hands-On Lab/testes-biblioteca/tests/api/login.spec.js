import { test, expect } from "@playwright/test";

test("CT-API-003 - Login com credenciais válidas", async ({ request }) => {
  const inicio = Date.now();

  const response = await request.post("/login", {
    data: {
      email: "admin@biblioteca.com",
      senha: "123456",
    },
  });

  // Status code
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Validações do PDF
  expect(body.mensagem).toBe("Login realizado com sucesso");
  expect(body.usuario).toBeDefined();
  expect(body.usuario.email).toBe("admin@biblioteca.com");
  expect(body.usuario.senha).toBeUndefined();

  // Tempo de resposta < 2 segundos
  const duracao = Date.now() - inicio;
  expect(duracao).toBeLessThan(2000);
});

test("CT-API-004 - Login com credenciais inválidas deve falhar", async ({
  request,
}) => {
  const response = await request.post("/login", {
    data: {
      email: "admin@biblioteca.com",
      senha: "senhaerrada",
    },
  });

  // Status code
  expect(response.status()).toBe(401);

  const body = await response.json();

  // Mensagem de erro conforme PDF
  expect(body.mensagem).toBe("Email ou senha incorretos");
});
