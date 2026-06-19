import { expect } from '@playwright/test';

class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.cardType = page.locator('select[name="order.cardType"]');
        this.cardNumber = page.locator('input[name="order.creditCard"]');
        this.expiryDate = page.locator('input[name="order.expiryDate"]');
        this.firstName = page.locator('input[name="order.billToFirstName"]');
        this.lastName = page.locator('input[name="order.billToLastName"]');
        this.address1 = page.locator('input[name="order.billAddress1"]');
        this.address2 = page.locator('input[name="order.billAddress2"]');
        this.city = page.locator('input[name="order.billCity"]');
        this.state = page.locator('input[name="order.billState"]');
        this.zip = page.locator('input[name="order.billZip"]');
        this.country = page.locator('input[name="order.billCountry"]');
        this.continueButton = page.locator('input[value="Continue"]');
        this.confirmButton = page.locator('[class="Button"]');
    }

    async fillPayment(cardType, cardNumber, expiry) {
        await this.cardType.selectOption(cardType);
        await this.cardNumber.fill(cardNumber);
        await this.expiryDate.fill(expiry);
    }

    async fillBilling(firstName, lastName, address1, address2, city, state, zip, country) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.address1.fill(address1);
        await this.address2.fill(address2);
        await this.city.fill(city);
        await this.state.fill(state);
        await this.zip.fill(zip);
        await this.country.fill(country);
    }

    async continue() {
        await this.continueButton.click();
    }

    async confirm() {
        await this.confirmButton.click();
    }

    async verifyConfirmation() {
        await expect(this.page.getByText('Thank you, your order has been submitted.')).toBeVisible();
    }

}

export default CheckoutPage