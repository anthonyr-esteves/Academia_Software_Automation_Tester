class ProductSearchPage {
  constructor(page) {
    this.page = page;

    // ============================
    // SEARCH FIELDS
    // ============================
    this.searchField = page.getByRole("textbox");

    // ============================
    // BUTTONS
    // ============================
    this.searchButton = page.getByRole("button", { name: "Search" });
  }

  // ============================
  // ACTIONS
  // ============================
  async searchFor(term) {
    await this.searchField.fill(term);
    await this.searchButton.click();
  }

  async openProduct(productName) {
    await this.page.getByRole("link", { name: productName }).click();
  }
}

export default ProductSearchPage;
