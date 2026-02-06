import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

test('User should login successfully via modal', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Use the credentials from your .env file
  const phone = process.env.DARAZ_PHONE;
  const password = process.env.DARAZ_PASSWORD;

  await loginPage.openModal();
  await loginPage.login(phone, password);

  // Assertion: Check for a successful login marker
  // Daraz usually shows "Hello, [Name]" or a "Logout" link in the header
  const accountSection = page.locator('#myAccountTrigger'); 
  
  await expect(accountSection).toBeVisible({ timeout: 10000 });
  
  console.log('Login successful: Account menu is now visible.');
});