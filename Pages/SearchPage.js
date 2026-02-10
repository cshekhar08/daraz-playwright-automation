export class SearchPage {
  constructor(page) {
    this.page = page;
    // navigate to search field
    this.searchInput = page.getByRole('searchbox', { name: 'Search in Daraz' });
    
    // This targets the "breadcrumb" or result header that appears after search
    this.searchResultTitle = page.locator('.JrAyI');
    
    // This targets the product cards in the search grid
    this.productCards = page.locator('.Ms6aG').first();
  }

  async goto() {
    await this.page.goto('/');
  }

  async searchFor(term) {
    await this.searchInput.click();
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
    // Wait for the network to settle so results have time to load
    await this.page.waitForLoadState('networkidle');
  }

  async selectBrand(brandName) {
    // Click on the brand filter checkbox for the specified brand
    const brandCheckbox = this.page.locator(`label:has-text("${brandName}")`).first();
    await brandCheckbox.click();
    // Wait for results to update after filtering
    await this.page.waitForLoadState('networkidle');
  }
}