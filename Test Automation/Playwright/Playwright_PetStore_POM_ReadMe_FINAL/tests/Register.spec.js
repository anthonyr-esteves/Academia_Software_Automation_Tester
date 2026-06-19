// @ts-check
import { test } from "@playwright/test";
import Homepage from "../pages/Homepage";
import RegisterPage from "../pages/RegisterPage";
import fs from "fs"; // IMPORTAR O MODULO fs (File System) DO NODE.JS

test.skip("Register", async ({ page }) => {
  await page.goto("/actions/Catalog.action");

  const homepage = new Homepage(page);
  const register = new RegisterPage(page);

  // ============================
  // HOMEPAGE
  // ============================
  await homepage.expectHomeURL();
  await homepage.expectSignInLink();
  await homepage.clickSignIn();
  await homepage.expectRegisterLink();
  await homepage.clickRegisterNow();
  await homepage.expectRegisterURL();

  // ============================
  // REGISTER PAGE
  // ============================
  const username = "AE_" + Date.now();
  const password = "Seroquel100.";

  await register.expectUserInfoHeading();
  await register.loginDetails(username, password);

  await register.expectAccountInfoHeading();
  await register.registerForm();

  await register.expectProfileInfoHeading();
  await register.preferences();

  await register.saveAccount();
  await register.verifyAccount();

  // ============================
  // GUARDAR USERNAME E PASSWORD
  // ============================
  fs.writeFileSync(
    "test-data.json",
    JSON.stringify({ username, password }, null, 2),
  );
});
