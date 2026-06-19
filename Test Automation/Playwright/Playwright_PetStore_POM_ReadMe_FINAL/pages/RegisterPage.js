import { expect } from "@playwright/test";

class RegisterPage {
  constructor(page) {
    this.page = page;

    // ============================
    // HEADINGS
    // ============================
    this.userInfo = page.getByRole("heading", { name: "User Information" });
    this.accountInfo = page.getByRole("heading", {
      name: "Account Information",
    });
    this.profileInfo = page.getByRole("heading", {
      name: "Profile Information",
    });

    // ============================
    // LOGIN FIELDS
    // ============================
    this.userID = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.repeatPassword = page.locator('input[name="repeatedPassword"]');

    // ============================
    // ACCOUNT FIELDS
    // ============================
    this.firstName = page.locator('input[name="account.firstName"]');
    this.lastName = page.locator('input[name="account.lastName"]');
    this.emailAddress = page.locator('input[name="account.email"]');
    this.phone = page.locator('input[name="account.phone"]');
    this.address1 = page.locator('input[name="account.address1"]');
    this.address2 = page.locator('input[name="account.address2"]');
    this.city = page.locator('input[name="account.city"]');
    this.state = page.locator('input[name="account.state"]');
    this.zipCode = page.locator('input[name="account.zip"]');
    this.country = page.locator('input[name="account.country"]');

    // ============================
    // PREFERENCES
    // ============================
    this.languagePref = page.locator(
      'select[name="account.languagePreference"]',
    );
    this.favouriteCat = page.locator(
      'select[name="account.favouriteCategoryId"]',
    );
    this.listOption = page.locator('input[name="account.listOption"]');
    this.bannerOption = page.locator('input[name="account.bannerOption"]');

    // ============================
    // BUTTONS
    // ============================
    this.saveButton = page.getByRole("button", {
      name: "Save Account Information",
    });

    // ============================
    // VERIFICATION
    // ============================
    this.accountVerif = page.getByRole("link", { name: "Sign In" });
  }

  // ============================
  // VALIDATIONS
  // ============================
  async expectUserInfoHeading() {
    await expect(this.userInfo).toBeVisible();
  }

  async expectAccountInfoHeading() {
    await expect(this.accountInfo).toBeVisible();
  }

  async expectProfileInfoHeading() {
    await expect(this.profileInfo).toBeVisible();
  }

  // ============================
  // FORM FILLING
  // ============================
  async loginDetails(username, password) {
    await this.userID.fill(username);
    await this.password.fill(password);
    await this.repeatPassword.fill(password);
  }

  async registerForm() {
    await this.firstName.fill("Teste 1");
    await this.lastName.fill("Teste 2");
    await this.emailAddress.fill("teste@gmail.com");
    await this.phone.fill("0612345678");
    await this.address1.fill("Rua do Teste");
    await this.address2.fill("N/A");
    await this.city.fill("Porto");
    await this.state.fill("Porto");
    await this.zipCode.fill("5000");
    await this.country.fill("Portugal");
  }

  async preferences() {
    await this.languagePref.selectOption("english");
    await this.favouriteCat.selectOption("DOGS");
    await this.listOption.check();
    await this.bannerOption.uncheck();
  }

  // ============================
  // ACTIONS
  // ============================
  async saveAccount() {
    await this.saveButton.click();
  }

  async verifyAccount() {
    await expect(this.accountVerif).toBeVisible();
  }
}

export default RegisterPage;
