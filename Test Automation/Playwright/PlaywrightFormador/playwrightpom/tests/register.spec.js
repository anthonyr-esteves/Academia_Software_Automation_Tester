// @ts-check
import { test, expect } from '@playwright/test';

test('Register a user', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');

  // Aceitar consentimento, se aparecer
  try {
    await page.getByLabel('Consent', { exact: true }).click();
  } catch { }

  // Preencher etapa 1 - nome e email
  await page.locator("[data-qa='signup-name']").fill('Lacey Massey');
  await page
    .locator("[data-qa='signup-email']")
    .fill('lacey.massey@mailinator7.com');
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.pause();

  // Preencher etapa 2 - detalhes pessoais
  await page.getByText('Mrs.').click(); // Selecionar gênero

  await page.getByLabel('Password *').fill('Senha123!');
  await page.locator('#days').selectOption('10');
  await page.locator('#months').selectOption('10');
  await page.locator('#years').selectOption('1990');

  await page.getByLabel('Sign up for our newsletter!').check();

  await page.getByLabel('First name *').fill('Lacey');
  await page.getByLabel('Last name *').fill('Massey');
  await page.getByLabel('Company', { exact: true }).fill('Empresa XYZ');

  await page.getByLabel('Address * (Street address, P.').fill('Rua Principal, 123');
  await page.getByLabel('Country *').selectOption('United States');
  await page.getByLabel('State *').fill('California');
  await page.getByLabel('City *').fill('Los Angeles');
  await page.locator('#zipcode').fill('90001');
  await page.getByLabel('Mobile Number *').fill('+1234567890');

  await page.getByRole('button', { name: 'Create Account' }).click();

  // Verificar criação da conta
  await expect(page.getByText('Account Created!')).toBeVisible();
});
