import { expect } from '@playwright/test';

class LoginPage {

    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('input[name="username"]');
        this.passwordField = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[value="Login"]');
        this.registerLink = page.getByRole('link', { name: 'Register Now!' });
    }

    async fillUsername(username) {
        await this.usernameField.fill(username);
    }

    async fillPassword(password) {
        await this.passwordField.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async login(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    async clickRegister() {
        await this.registerLink.click();
    }

    async verifyLogin() {
        await expect(this.page).toHaveURL(/Catalog.action/);
    }

}

export default LoginPage