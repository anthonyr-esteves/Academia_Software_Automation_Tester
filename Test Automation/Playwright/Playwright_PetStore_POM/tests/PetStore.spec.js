// @ts-check
import { test } from "@playwright/test";
import Homepage from "../pages/Homepage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ProductSearchPage from "../pages/ProductSearchPage";
import ProductListPage from "../pages/ProductListPage";
import AddToCartPage from "../pages/AddToCart";
import CheckoutPage from "../pages/CheckoutPage";

test("PetStorePOM", async ({ page }) => {
  await page.goto("/actions/Catalog.action");

  const homepage = new Homepage(page);
  const register = new RegisterPage(page);
  const login = new LoginPage(page);
  const search = new ProductSearchPage(page);
  const list = new ProductListPage(page);
  const addToCart = new AddToCartPage(page);
  const checkout = new CheckoutPage(page);

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
  // LOGIN PAGE
  // ============================
  await homepage.expectSignInLink(); // ← Homepage
  await homepage.clickSignIn(); // ← Homepage

  await login.expectLoginPage(); // ← LoginPage
  await login.loginDetails(username, password);
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
