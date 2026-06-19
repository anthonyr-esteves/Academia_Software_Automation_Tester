// @ts-check
import { test, expect } from "@playwright/test";

test.skip("Registrar uma conta", async ({ page }) => {
  await page.goto("/actions/Account.action?newAccountForm=/");
  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle(/Playwright/);
  await page
    .locator('select[name="account.languagePreference"]')
    .selectOption("japanese");

  await page.pause();

  await page
    .locator('select[name="account.languagePreference"]')
    .fill("english");
  await page.locator('input[name="account.listOption"]').setChecked(true);
  await page
    .locator('input[name="account.bannerOption"]')
    .check({ timeout: 15000 });
});
