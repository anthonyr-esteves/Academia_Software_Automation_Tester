import { expect } from "@playwright/test";

class Homepage {
  constructor(page) {
    this.page = page;

    // ============================
    // LINKS
    // ============================
    this.signInLink = page.getByRole("link", { name: "Sign In" });
    this.registerLink = page.getByRole("link", { name: "Register Now!" });
  }

  // ============================
  // VALIDATIONS
  // ============================
  async expectHomeURL() {
    await expect(this.page).toHaveURL(/Catalog\.action/);
  }

  async expectSignInLink() {
    await expect(this.signInLink).toBeVisible();
    await expect(this.signInLink).toHaveText("Sign In");
  }

  async expectRegisterLink() {
    await expect(this.registerLink).toBeVisible();
    await expect(this.registerLink).toHaveText("Register Now!");
  }

  async expectRegisterURL() {
    await expect(this.page).toHaveURL(/newAccountForm=/i);
  }

  // ============================
  // ACTIONS
  // ============================
  async clickSignIn() {
    await this.signInLink.click();
  }

  async clickRegisterNow() {
    await this.registerLink.click();
  }
}

export default Homepage;
