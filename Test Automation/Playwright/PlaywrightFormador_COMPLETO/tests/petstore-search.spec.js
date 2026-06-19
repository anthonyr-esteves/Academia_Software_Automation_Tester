// @ts-check
import { test, expect } from '@playwright/test';
import HomePage from '../pom/HomePage';
import LoginPage from '../pom/LoginPage';
import ProductSearchPage from '../pom/ProductSearchPage';
import ProductDetailPage from '../pom/ProductDetailPage';

test('Busca de Produto', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const search = new ProductSearchPage(page);
    const detail = new ProductDetailPage(page);

    await home.goToHome();
    await home.clickSignIn();
    await login.login('dirir', 'password123');

    await home.clickCategory('Fish');
    await search.clickProduct('FI-SW-01');
    await detail.verifyProductDetails('Angelfish');
});