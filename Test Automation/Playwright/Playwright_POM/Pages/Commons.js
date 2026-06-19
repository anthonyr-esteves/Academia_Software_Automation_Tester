// Classe com ações comuns a várias páginas (ex: aceitar cookies)
class Commons {
  constructor(page) {
    this.page = page;

    // Localizador do botão de consentimento de cookies.
    // getByRole garante maior estabilidade e acessibilidade.
    this.consentButton = page.getByRole("button", { name: "Consent" });
  }

  // Aceita cookies caso o botão esteja visível.
  async aceitarCookies() {
    // Verifica se o botão aparece antes de tentar clicar.
    if (await this.consentButton.isVisible()) {
      await this.consentButton.click();
    }
  }
}

export default Commons;
