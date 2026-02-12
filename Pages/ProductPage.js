export class ProductPage {
  constructor(page) {
    this.page = page;
    // Daraz's specific "Add to Cart" button class
    this.addToCartBtn = page.locator('xpath=.//*[@id="module_add_to_cart"]/div/button[2]');
    // The success message or the cart badge
    this.successModal = page.locator('.next-dialog-body');
  }

  async addItemToCart() {
    // Wait for the button to be stable and click its
    await this.addToCartBtn.waitFor({ state: 'visible' });
    await this.addToCartBtn.click();
  }
}