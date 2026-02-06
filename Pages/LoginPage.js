export class LoginPage {
  constructor(page) {
    this.page = page;
    // locators
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.phoneInput = page.getByRole('textbox', { name: 'Please enter your Phone or' });
    this.passwordInput = page.getByRole('textbox', { name: 'Please enter your password' });
    this.loginButton = page.getByRole('button', { name: 'LOGIN' });
  }

  async openModal() {
    await this.page.goto('/');
    await this.loginLink.click();
    // Wait for the textbox to appear to ensure the modal finished its animation
    //await expect(this.phoneInput).toBeVisible();
  }

  async login(phone, password) {
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}