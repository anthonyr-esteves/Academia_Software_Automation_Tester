import { expect } from '@playwright/test';

class RegisterPage {

    constructor(page) {
        this.page = page;
        this.userIdField = page.locator('input[name="username"]');
        this.newPasswordField = page.locator('input[name="password"]');
        this.repeatPasswordField = page.locator('input[name="repeatedPassword"]');
        this.firstNameField = page.locator('input[name="account.firstName"]');
        this.lastNameField = page.locator('input[name="account.lastName"]');
        this.emailField = page.locator('input[name="account.email"]');
        this.phoneField = page.locator('input[name="account.phone"]');
        this.address1Field = page.locator('input[name="account.address1"]');
        this.address2Field = page.locator('input[name="account.address2"]');
        this.cityField = page.locator('input[name="account.city"]');
        this.stateField = page.locator('input[name="account.state"]');
        this.zipField = page.locator('input[name="account.zip"]');
        this.countryField = page.locator('input[name="account.country"]');
        this.languagePreference = page.locator('select[name="account.languagePreference"]');
        this.favouriteCategory = page.locator('select[name="account.favouriteCategoryId"]');
        this.enableMyList = page.locator('input[name="account.listOption"]');
        this.enableMyBanner = page.locator('input[name="account.bannerOption"]');
        this.saveButton = page.locator('input[value="Save Account Information"]');
    }

    async fillUserInfo(userId, password) {
        await this.userIdField.fill(userId);
        await this.newPasswordField.fill(password);
        await this.repeatPasswordField.fill(password);
    }

    async fillAccountInfo(firstName, lastName, email, phone, address1, address2, city, state, zip, country) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
        await this.phoneField.fill(phone);
        await this.address1Field.fill(address1);
        await this.address2Field.fill(address2);
        await this.cityField.fill(city);
        await this.stateField.fill(state);
        await this.zipField.fill(zip);
        await this.countryField.fill(country);
    }

    async fillProfileInfo(language, category, myList, myBanner) {
        await this.languagePreference.selectOption(language);
        await this.favouriteCategory.selectOption(category);
        if (myList) await this.enableMyList.check();
        if (myBanner) await this.enableMyBanner.check();
    }

    async submit() {
        await this.saveButton.click();
    }

    async verifySuccess() {
        await expect(this.page).toHaveURL(/Catalog.action/);
    }

}

export default RegisterPage