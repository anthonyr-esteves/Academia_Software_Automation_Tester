import { expect } from '@playwright/test';

class ProductDetailPage {

    constructor(page) {
        this.page = page;
        this.addToCartLink = page.getByRole('link', { name: 'Add to Cart' }).first();
        this.productHeading = (productName) => this.page.getByRole('heading', { level: 2, name: productName });
    }

    async addToCart() {
        await this.addToCartLink.click();
    }

    async verifyProductDetails(productName) {
        await expect(this.productHeading(productName)).toBeVisible();
    }

}

export default ProductDetailPage