// @ts-check
import { test, expect } from '@playwright/test';
import HomePage from '../pom/HomePage';
import LoginPage from '../pom/LoginPage';
import ProductSearchPage from '../pom/ProductSearchPage';
import ProductDetailPage from '../pom/ProductDetailPage';
import CartPage from '../pom/CartPage';

test('Adicionar ao Carrinho', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const search = new ProductSearchPage(page);
    const detail = new ProductDetailPage(page);
    const cart = new CartPage(page);

    await home.goToHome();
    await home.clickSignIn();
    await login.login('dirir', '1234');
    await home.clickCategory('Fish');
    await search.clickProduct('FI-SW-01');
    await detail.addToCart();

    await cart.verifyItemInCart('FI-SW-01');
});