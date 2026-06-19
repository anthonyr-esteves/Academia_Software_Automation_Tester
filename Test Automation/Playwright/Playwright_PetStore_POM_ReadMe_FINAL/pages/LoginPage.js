import { expect } from "@playwright/test";

class LoginPage {
  constructor(page) {
    this.page = page;

    // ============================
    // HEADINGS
    // ============================
    this.signInHeading = page.getByRole("link", { name: "Sign In" });

    // ============================
    // LOGIN FIELDS
    // ============================
    this.userID = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');

    // ============================
    // BUTTONS
    // ============================
    this.loginButton = page.getByRole("button", { name: "Login" });

    // ============================
    // VERIFICATION
    // ============================
    this.signOutLink = page.getByRole("link", { name: "Sign Out" });
  }

  // ============================
  // VALIDATIONS
  // ============================
  async expectLoginPage() {
    await expect(this.signInHeading).toBeVisible();
  }

  async expectLoggedIn() {
    await expect(this.signOutLink).toBeVisible();
  }

  // ============================
  // LOGIN FORM FILLING
  // ============================
  async loginDetails(username, password) {
    await this.userID.clear();
    await this.userID.fill(username);
    await this.password.clear();
    await this.password.fill(password);
  }

  // ============================
  // ACTIONS
  // ============================
  async clickLogin() {
    await this.loginButton.click();
  }
}

export default LoginPage;
