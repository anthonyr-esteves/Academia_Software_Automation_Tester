import { expect } from "@playwright/test";

class Homepage {
  constructor(page) {
    this.page = page;

    // Localizador da mensagem de sucesso após login.
    this.successLogin = page.getByText("Logged in as Caldwell Pena");
  }

  // Valida que a mensagem de login corresponde ao esperado.
  async loginMessage(message) {
    await expect(this.successLogin).toHaveText(message);
  }
}

export default Homepage;
