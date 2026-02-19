import {test,expect} from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { CartPage } from '../Pages/CartPage';

test.describe('Cart Management', () => {

    const phone = process.env.DARAZ_PHONE;
    const password = process.env.DARAZ_PASSWORD;
    
    // login before performing any action
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.openModal();
        await loginPage.login(phone, password);

        await expect(page.locator('#myAccountTrigger')).toBeVisible();
    });
    test('Logged in user can update item quantity in cart', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.navigateCartPage();
        await cartPage.increaseQuantity();
        console.log('Item quantity is updated successfully');
    
}); 
    test('Logged in user can remove item from cart', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.navigateCartPage();
        await cartPage.removeItem();
        await expect(cartPage.emptyCartMessage).toBeVisible();
        console.log('Item is removed successfully');
    });
    })