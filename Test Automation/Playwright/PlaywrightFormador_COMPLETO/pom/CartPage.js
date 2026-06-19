import { expect } from '@playwright/test';

class CartPage {

    constructor(page) {
        this.page = page;
        this.proceedToCheckoutButton = page.getByRole('link', { name: 'Proceed to Checkout' });
    }

    async verifyItemInCart(itemId) {
        await expect(this.page.getByText(itemId)).toBeVisible();
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

}

export default CartPage