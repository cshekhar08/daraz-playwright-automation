export class CartPage {
    constructor(page) {
        this.page = page;
        //locators
        this.cartItems = page.locator('.cart-icon-daraz');
        this.quantityUp = page.locator('.next-number-picker-handler-up');
        this.quantityDown = page.locator('.next-number-picker-handler-down');
        this.removeItemBtn = page.locator('.lazada.lazada-ic-Delete.lazada-icon.icon.delete');
        this.emptyCartMessage = page.locator('.cart-empty-text');
        this.confirmDeleteBtn = page.getByRole('button', { name: 'Remove' });
    }
    async navigateCartPage() {
        await this.cartItems.waitFor({ state: 'visible' });
        await this.cartItems.click();
    
    }

    async increaseQuantity() {
        await this.quantityUp.click();
    }

    async removeItem() {
        await this.removeItemBtn.waitFor({ state: 'visible' });
        await this.removeItemBtn.click();
        await this.confirmDeleteBtn.click();
    }


}