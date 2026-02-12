import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { SearchPage } from '../Pages/SearchPage';
import { ProductPage } from '../Pages/ProductPage';

test.describe('Shopping Happy Path', () => {
  // Use the credentials from your .env file
  const phone = process.env.DARAZ_PHONE;
  const password = process.env.DARAZ_PASSWORD;
  
  // Step 1: Login before starting the shopping flow
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openModal();
    await loginPage.login(phone, password);
    
    // Ensure we are logged in by checking for the "Account" or "Logout" indicator
    await expect(page.locator('#myAccountTrigger')).toBeVisible();
  });

  test('Logged in user can search and add item to cart', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);

    // Step 2: Search for the product
    //await searchPage.goto();
    await searchPage.searchFor('laptop');

    // Step 3: Select the product (Stay in same tab)
    await searchPage.selectFirstProduct();

    // Step 4: Add to Cart and Verify
    await productPage.addItemToCart();

    // Verification: Check for the Success Modal
    await expect(productPage.successModal).toBeVisible({ timeout: 10000 });

    // Optional: You can also check for specific text inside the modal
    await expect(productPage.successModal).toContainText('Added to cart');
    console.log('Product successfully added to cart and success modal is visible.');
  });
});