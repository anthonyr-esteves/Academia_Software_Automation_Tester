import { expect } from '@playwright/test';

class ProductSearchPage {

    constructor(page) {
        this.page = page;
        this.productLink = (productCode) => page.getByRole('link', { name: productCode });
    }

    async clickProduct(productCode) {
        await this.productLink(productCode).click();
    }

}

export default ProductSearchPage