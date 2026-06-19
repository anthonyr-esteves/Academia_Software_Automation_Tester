// @ts-check
import { test, expect } from '@playwright/test';
import HomePage from '../pom/HomePage';
import LoginPage from '../pom/LoginPage';
import RegisterPage from '../pom/RegisterPage';

test('Register a user', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const register = new RegisterPage(page);

    await home.goToHome();
    await home.clickSignIn();
    await login.clickRegister();
    
    const username =  'username' + Date.now();
    await register.fillUserInfo(username, 'password123');
    await register.fillAccountInfo('John', 'Doe', 'john@example.com', '1234567890', '123 Main St', '', 'Anytown', 'CA', '12345', 'USA');
    await register.fillProfileInfo('english', 'FISH', true, true);

    await register.submit();
    await register.verifySuccess();
});