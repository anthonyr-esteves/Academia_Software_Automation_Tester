import { expect } from "@playwright/test";

class ProductListPage {
  constructor(page) {
    this.page = page;

    // ============================
    // HEADINGS
    // ============================
    // Nota: heading dinâmico, criado via método
  }

  // ============================
  // LOCATORS (DINÂMICOS)
  // ============================
  productTitle(name) {
    return this.page.getByRole("heading", { name });
  }

  // ============================
  // VALIDATIONS
  // ============================
  async expectProductVisible(name) {
    await expect(this.productTitle(name)).toBeVisible();
  }
}

export default ProductListPage;
