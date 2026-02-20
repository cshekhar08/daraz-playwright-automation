import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import path from 'path';

const authFile = path.resolve(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Perform login
    await loginPage.openModal();
    await loginPage.login(process.env.DARAZ_PHONE, process.env.DARAZ_PASSWORD);
    
    // Crucial: Wait until you are definitely logged in
    await expect(page.locator('#myAccountTrigger')).toBeVisible();

    // Save the "snapshot" of your cookies/storage
    await page.context().storageState({ path: authFile });
});