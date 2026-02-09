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

test('User should see the disappearing toast error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.openModal();
  await loginPage.login(process.env.DARAZ_PHONE, 'wrong_password_123');

  // 1. Wait for the toast to appear
  // Playwright's auto-waiting will catch this flash
  await expect(loginPage.toastMessage).toBeVisible({ timeout: 5000 });

  // 2. Capture the text to the console for debugging
  const errorMessage = await loginPage.toastMessage.innerText();
  console.log('Caught Daraz Toast Message:', errorMessage);

  // 3. Final Assertion
  await expect(loginPage.toastMessage).toContainText(/incorrect|invalid/i);
});