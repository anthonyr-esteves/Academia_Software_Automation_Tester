// @ts-check
import { test, expect } from '@playwright/test';

test('Google Maps search and directions - simple', async ({ page }) => {
  await page.goto('https://www.google.com/maps');

  // Aceitar cookies se o botão aparecer
  const acceptButton = page.locator('span:has-text("Aceitar tudo")').first();
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Digitar "Dublin" na caixa de busca
  const searchBox = page.locator('#searchboxinput');
  await searchBox.fill('Dublin');
  await searchBox.press('Enter');

  // Esperar título "Dublin" aparecer
  const headline = page.locator('h1:has-text("Dublin")');
  await expect(headline).toBeVisible({ timeout: 50000 });
  await expect(headline).toHaveText('Dublin');

  // Clicar no botão de direções
  const directionsButton = page.getByRole('button', { name: 'Direções' });
  await directionsButton.click();

  // Esperar campo destino visível com texto "Dublin, Irlanda"
  const destinationInput = page.locator('input[aria-label^="Destino Dublin, Irlanda"]');
  await expect(destinationInput).toBeVisible({ timeout: 50000 });
  const destinationValue = await destinationInput.inputValue();
  expect(destinationValue).toContain('Dublin');
});
