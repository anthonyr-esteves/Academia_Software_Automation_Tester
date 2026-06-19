// @ts-check
import { test, expect } from '@playwright/test';
import HomePage from '../pom/HomePage';
import LoginPage from '../pom/LoginPage';
import ProductSearchPage from '../pom/ProductSearchPage';
import ProductDetailPage from '../pom/ProductDetailPage';
import CartPage from '../pom/CartPage';
import CheckoutPage from '../pom/CheckoutPage';

test('Finalizar Compra', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const search = new ProductSearchPage(page);
    const detail = new ProductDetailPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await home.goToHome();
    await home.clickSignIn();
    await login.login('dirir', '1234');

    await home.clickCategory('Fish');
    await search.clickProduct('FI-SW-01');
    await detail.addToCart();

    await cart.proceedToCheckout();

    await checkout.fillPayment('Visa', '4111111111111111', '12/2025');
    await checkout.fillBilling('John', 'Doe', '123 Main St', '', 'Anytown', 'CA', '12345', 'USA');

    await checkout.continue();
    await checkout.confirm();

    await checkout.verifyConfirmation();
});