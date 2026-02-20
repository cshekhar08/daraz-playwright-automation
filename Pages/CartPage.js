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
        this.quantityInput = page.locator('.next-number-picker-input input');
        this.cartItemRows = page.locator('.checkout-shop-children');
    }
    async navigateCartPage() {
        await this.page.goto('/');
        await this.cartItems.waitFor({ state: 'visible' });
        await this.cartItems.click();
    
    }

    
    async getQuantity() {
        // Helper to get the current number as an integer
        const value = await this.quantityInput.first().inputValue();
        return parseInt(value);
    }

    async getItemCount() {
        // Helper to see how many items are currently in the cart
        return await this.cartItemRows.count();
    }

    async increaseQuantity() {
        await this.quantityUp.first().click();
    }

    async removeItem() {
        await this.removeItemBtn.first().waitFor({ state: 'visible' });
        await this.removeItemBtn.first().click();
        await this.confirmDeleteBtn.waitFor({ state: 'visible' });
        await this.confirmDeleteBtn.click();
    }


}