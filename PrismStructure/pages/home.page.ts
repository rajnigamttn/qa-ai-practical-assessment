import { expect, Page } from '@playwright/test';
import { UI_ROUTES } from '../utils/constants.js';
import { BasePage } from './base.page.js';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto(UI_ROUTES.home);
  }

  async addFirstAvailableProductToCart(): Promise<void> {
    const inStockProduct = this.page
      .getByRole('link')
      .filter({ hasNotText: 'Out of stock' })
      .filter({ hasText: /\$/ })
      .first();
  
    await inStockProduct.click();
  
    await this.page.waitForURL(/\/product\//);
    await this.page.waitForLoadState('networkidle');
  
    const addToCart = this.page.getByTestId('add-to-cart');
  
    await addToCart.click();
  
    await expect(this.page.getByTestId('cart-quantity')).toHaveText('1');
  }

  async openCart(): Promise<void> {
    await this.page.getByTestId('nav-cart').click();
  }
}