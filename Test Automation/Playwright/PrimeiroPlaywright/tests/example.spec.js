// @ts-check
import { test, expect } from "@playwright/test";

test.skip("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  await page.getByRole("link", { name: "Docs" }).click();
  await page.getByRole("link", { name: "Community" }).click();
  await page.locator('[class="DocSearch-Button-Placeholder"]').click();

  await page.getByRole("searchbox", { name: "Search" }).fill("Hover");

  await page.getByRole("link", { name: "hover ElementHandle" }).click();

  await page.waitForTimeout(3000);

  await expect(
    page.getByRole("heading", { name: "hoverDirect link to hover" }),
  ).toBeVisible();
});

test.skip("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});
