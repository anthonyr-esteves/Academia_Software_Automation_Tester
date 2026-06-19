// @ts-check
import { test } from "@playwright/test";
import Commons from "../pages/commons";
import LoginPage from "../pages/LoginPage";
import Homepage from "../Pages/Homepage";

test("Login com sucesso", async ({ page }) => {
  // Instanciação das páginas do POM
  const commons = new Commons(page);
  const login = new LoginPage(page);
  const homepage = new Homepage(page);

  // Navega diretamente para a página de login
  await page.goto("/login");

  // Aceita cookies (caso o banner esteja visível)
  await commons.aceitarCookies();

  // Método principal de login (mais limpo e reutilizável)
  await login.realizarLogin("taruhosok@mailinator.com", "Pa$$w0rd!");

  /*
    MÉTODO ALTERNATIVO DE LOGIN
    ---------------------------
    Este bloco mostra como seria o login passo a passo,
    caso quisesses controlar cada ação individualmente.

    É útil para:
      - debugging
      - testar campos individualmente
      - criar cenários onde o login falha
      - perceber melhor o fluxo antes de abstrair tudo num método único

    Exemplo:
    
    await login.preencherEmail("email@gmail.com");
    await login.preencherSenha("senha123");
    await login.clicarBotaoLogin();
  */

  // Valida que o login foi bem-sucedido
  await homepage.loginMessage("Logged in as Caldwell Pena");
});
