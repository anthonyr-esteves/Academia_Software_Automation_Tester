// @ts-check
import { test } from "@playwright/test";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import ProductSearchPage from "../pages/ProductSearchPage";
import ProductListPage from "../pages/ProductListPage";
import AddToCartPage from "../pages/AddToCart";
import CheckoutPage from "../pages/CheckoutPage";
import fs from "fs"; // IMPORTAR O MODULO fs (File System) DO NODE.JS

test.skip("Checkout", async ({ page }) => {
  // LER USERNAME E PASSWORD DO FICHEIRO
  const data = JSON.parse(fs.readFileSync("test-data.json", "utf8"));

  await page.goto("/actions/Catalog.action");

  const homepage = new Homepage(page);
  const login = new LoginPage(page);
  const search = new ProductSearchPage(page);
  const list = new ProductListPage(page);
  const addToCart = new AddToCartPage(page);
  const checkout = new CheckoutPage(page);

  // ============================
  // LOGIN PAGE
  // ============================
  await homepage.expectSignInLink(); // ← Homepage
  await homepage.clickSignIn(); // ← Homepage

  await login.expectLoginPage(); // ← LoginPage
  await login.loginDetails(data.username, data.password);
  await login.clickLogin();
  await login.expectLoggedIn();

  // ============================
  // SEARCH
  // ============================
  await search.searchFor("dog");
  await search.openProduct("Friendly dog from England");

  await list.expectProductVisible("Bulldog");

  // ============================
  // ADD TO CART
  // ============================
  await addToCart.clickProductLink();
  await addToCart.expectProductURL();
  await addToCart.clickAddToCart();
  await addToCart.expectCartHeading();
  await addToCart.expectItemID();
  await addToCart.expectQTY();

  // ============================
  // CHECKOUT
  // ============================
  await checkout.clickCheckoutButton();
  await checkout.expectCheckoutURL();
  await checkout.clickContinueButton();
  await checkout.expectCheckoutMessage();
  await checkout.clickConfirmButton();
  await checkout.expectCheckoutFinalMessage();
});
