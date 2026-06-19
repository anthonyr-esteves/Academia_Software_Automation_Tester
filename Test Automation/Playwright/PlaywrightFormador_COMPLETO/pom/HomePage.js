import { expect } from '@playwright/test';

class HomePage {

    constructor(page) {
        this.page = page;
        this.signInLink = page.getByRole('link', { name: 'Sign In' });
        this.fishCategory = page.getByRole('link', { name: 'Fish' });
        this.dogsCategory = page.getByRole('link', { name: 'Dogs' });
        this.catsCategory = page.getByRole('link', { name: 'Cats' });
        this.birdsCategory = page.getByRole('link', { name: 'Birds' });
        this.reptilesCategory = page.getByRole('link', { name: 'Reptiles' });
    }

    async goToHome() {
        await this.page.goto('https://petstore.octoperf.com/actions/Catalog.action');
    }

    async clickSignIn() {
        await this.signInLink.click();
    }

    async clickCategory(category) {
        const categories = {
            Fish: 'FISH',
            Dogs: 'DOGS',
            Reptiles: 'REPTILES',
            Cats: 'CATS',
            Birds: 'BIRDS',
        };

        const categoryKey = categories[category];
        if (!categoryKey) {
            throw new Error(`Categoria inválida: ${category}`);
        }

        const link = this.page.locator(`a[href*="categoryId=${categoryKey}"]`);
        await link.first().click();

        await expect(this.page).toHaveURL(new RegExp(`categoryId=${categoryKey}`));
    }

}

export default HomePage