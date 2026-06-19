import { expect } from "@playwright/test";

class AddToCartPage {
  constructor(page) {
    this.page = page;

    // ============================
    // HEADINGS
    // ============================
    this.cartHeading = page.getByRole("heading", { name: "Shopping Cart" });

    // ============================
    // LINKS
    // ============================
    this.productLink = page.getByRole("link", { name: "EST-7" });

    // ============================
    // BUTTONS
    // ============================
    this.addToCartButton = page.getByRole("link", { name: "Add to Cart" });

    // ============================
    // LOCATORS
    // ============================
    this.qty = page.locator('input[value="1"]');
    this.itemID = page.getByRole("link", { name: "EST-7" });
  }

  // ============================
  // ACTIONS
  // ============================
  async clickProductLink() {
    await this.productLink.click();
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  // ============================
  // VALIDATIONS
  // ============================
  async expectProductURL() {
    await expect(this.page).toHaveURL(/itemId=EST-7/i);
  }

  async expectCartHeading() {
    await expect(this.cartHeading).toBeVisible();
  }

  async expectItemID() {
    await expect(this.itemID).toBeVisible();
  }

  async expectQTY() {
    await expect(this.qty).toBeVisible();
  }
}

export default AddToCartPage;
