// @ts-check
import { test, expect } from '@playwright/test';
import LoginPage from '../pom/LoginPage';

test('Valid login Automation exercice', async ({ page }) => {

  const login = new LoginPage(page);

  await page.goto('https://automationexercise.com/login');

  await login.AceitarCookies();

  await login.PreencherEmail('wataryl@mailinator.com');
  await login.PreencherSenha('Pa$$w0rd!');

  await login.ClicarNoBotaoLogin();

  await login.VerificarSeUsuarioEstaLogado();

});
