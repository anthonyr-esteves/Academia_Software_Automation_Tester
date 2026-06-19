// @ts-check
import { test, expect } from '@playwright/test';
import HomePage from '../pom/HomePage';
import LoginPage from '../pom/LoginPage';

test('Login', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await home.goToHome();
    await home.clickSignIn();

    await login.login('dirir', '1234');
    await login.verifyLogin();
});