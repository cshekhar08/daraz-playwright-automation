import {test,expect} from '@playwright/test';
import { CartPage } from '../Pages/CartPage';

test.describe('Cart Management', () => {

    // login before performing any action
    test.beforeEach(async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.navigateCartPage();
    });

    test('Logged in user can update item quantity in cart', async ({ page }) => {
        const cartPage = new CartPage(page);
        const initialQuantity = await cartPage.getQuantity();        
        await cartPage.increaseQuantity();
        // Assertion
        expect(await cartPage.getQuantity()).toBe(initialQuantity + 1);
        console.log('Item quantity is updated successfully');
    
}); 
    test('Logged in user can remove item from cart', async ({ page }) => {
        const cartPage = new CartPage(page);
       
        await cartPage.removeItem();

        // Assertion: Assumes this was the only item.
        await expect(cartPage.emptyCartMessage).toBeVisible();
        console.log('Item is removed successfully');
    });
    })