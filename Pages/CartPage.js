export class CartPage {
    constructor(page) {
        this.page = page;
        //locators
        this.cartItems = page.locator('.cart-icon-daraz');
        this.quantityUp = page.locator('.next-number-picker-handler-up');
        this.quantityDown = page.locator('.next-number-picker-handler-down');
        this.removeItemBtn = page.locator('.automation-btn-delete');
        this.emptyCartMessage = page.locator('.cart-empty-text');
        this.confirmDeleteBtn = page.getByRole('button', { name: 'Remove' });
    }
    async goto() {
        await this.page.goto('/cart');
    
    }

    async increaseQuantity() {
        await this.quantityUp.click();
    }

    async removeItem() {
        await this.removeItemBtn.click();
        await this.confirmDeleteBtn.click();
    }


}