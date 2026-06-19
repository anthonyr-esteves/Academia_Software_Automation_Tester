class LoginPage {
  constructor(page) {
    this.page = page;

    // Campo de email dentro do formulário de Login.
    // O uso de filter() é válido, mas pode tornar-se frágil se o texto mudar.
    this.campoEmail = page
      .locator("form")
      .filter({ hasText: "Login" })
      .getByPlaceholder("Email Address");

    // Campo de password. getByRole é estável e recomendado.
    this.campoSenha = page.getByRole("textbox", { name: "Password" });

    // Botão de login.
    this.botaoLogin = page.getByRole("button", { name: "Login" });
  }

  // Preenche o campo de email.
  async preencherEmail(email) {
    await this.campoEmail.fill(email);
  }

  // Preenche o campo de senha.
  async preencherSenha(senha) {
    await this.campoSenha.fill(senha);
  }

  // Clica no botão de login.
  async clicarBotaoLogin() {
    await this.botaoLogin.click();
  }

  // Método completo de login (mais limpo e reutilizável).
  async realizarLogin(email, senha) {
    await this.preencherEmail(email);
    await this.preencherSenha(senha);
    await this.clicarBotaoLogin();
  }
}

export default LoginPage;
