import { test, expect } from "@playwright/test";

test.skip("To Do a Search", async ({ page }) => {
  await page.goto("https://www.google.com/maps");

  await page.getByRole("button", { name: "Aceitar tudo" }).click();

  await expect(page.locator('input[name="q"]')).toBeVisible();

  await page.getByRole("combobox").click();
  await page.getByRole("combobox").fill("Dublin");

  await page.getByRole("button", { name: "Pesquisar" }).click();

  // -----------------------------
  // VALIDAR HEADLINE "Dublin"
  // -----------------------------
  try {
    await expect(page.locator("h1[class*='DUwDvf']")).toBeVisible();
    console.log("Test Passed: Dublin headline found");
  } catch (error) {
    console.log("Test Failed: Dublin headline not found");
    throw error; // mantém o teste a falhar
  }

  await page.getByRole("button", { name: "Direções" }).click();

  // -----------------------------
  // VALIDAR DESTINO "Dublin"
  // -----------------------------
  try {
    await expect(
      page.locator('input[aria-label="Destino Dublin, Irlanda"]'),
    ).toBeVisible();
    console.log("Destination verified: Dublin");
  } catch (error) {
    console.log("Destination not verified");
    throw error;
  }
});
