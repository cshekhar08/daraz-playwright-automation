import { test, expect } from '@playwright/test';
import { SearchPage } from '../Pages/SearchPage';

test.describe('Daraz Search Functionality', () => {
  
  test('Should display relevant results for a valid search', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.goto();
    await searchPage.searchFor('laptop');

    // Assertion 1: Check if the search result header matches our term
    await expect(searchPage.searchResultTitle).toContainText('laptop', { ignoreCase: true });

    // Assertion 2: Verify that at least one product card is displayed
    const count = await searchPage.productCards.count();
    expect(count).toBeGreaterThan(0);
    
    console.log(`Found ${count} products for "laptop"`);
  });

  test('Should show no results message for invalid search', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.goto();
    await searchPage.searchFor('xyz123abc999');

    // Daraz usually shows an "error-content" or "no results" div
    const noResultsMessage = page.locator('.jG0xV'); 
    await expect(noResultsMessage).toBeVisible();
    await expect(noResultsMessage).toContainText(/no result/i);
  });

});