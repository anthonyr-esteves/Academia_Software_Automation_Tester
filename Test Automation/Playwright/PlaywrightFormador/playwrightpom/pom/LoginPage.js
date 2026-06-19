
import { expect } from '@playwright/test';

class LoginPage {

    constructor(page) {
        this.page = page;
        this.botaoConsent = page.getByRole('button', { name: 'Consent' });
        this.campoEmail = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.campoSenha = page.getByRole('textbox', { name: 'Password' });
        this.botaoLogin = page.getByRole('button', { name: 'Login' });
        this.mensagemBoasVindas = page.getByRole('heading', { name: 'Full-Fledged practice website' });
    }

    async AceitarCookies() {
        await this.botaoConsent.click();
    }

    async PreencherEmail(email) {
        await this.campoEmail.fill(email);
    }

    async PreencherSenha(pass) {
        await this.campoSenha.fill(pass);
    }

    async ClicarNoBotaoLogin() {
        await this.botaoLogin.click();
    }

    async VerificarSeUsuarioEstaLogado() {
        await expect(this.page).toHaveURL(/automationexercise.com/);
        const messageText = await this.mensagemBoasVindas.innerText();
        expect(messageText).toContain("Automation Engineers");

    }

}

export default LoginPage