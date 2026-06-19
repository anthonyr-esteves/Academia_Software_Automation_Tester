import { expect } from "@playwright/test";

class CheckoutPage {
  constructor(page) {
    this.page = page;

    // ============================
    // BUTTONS
    // ============================
    this.checkoutButton = page.getByRole("link", {
      name: "Proceed to Checkout",
    });
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.confirmButton = page.getByRole("link", { name: "Confirm" });

    // ============================
    // VERIFICATIONS
    // ============================
    this.checkoutMessage = page.getByText(
      "Please confirm the information below",
    );
    this.checkoutFinalMessage = page.getByText(
      "Thank you, your order has been submitted.",
    );
  }

  // ============================
  // ACTIONS
  // ============================
  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
  async clickContinueButton() {
    await this.continueButton.click();
  }
  async clickConfirmButton() {
    await this.confirmButton.click();
  }

  // ============================
  // VALIDATIONS
  // ============================
  async expectCheckoutURL() {
    await expect(this.page).toHaveURL(/newOrderForm=/i);
  }
  async expectCheckoutMessage() {
    await expect(this.checkoutMessage).toBeVisible();
  }
  async expectCheckoutFinalMessage() {
    await expect(this.checkoutFinalMessage).toBeVisible();
  }
}

export default CheckoutPage;
