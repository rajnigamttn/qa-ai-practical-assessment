import { Page } from '@playwright/test';
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

    await this.click(inStockProduct);
    await this.click(this.page.getByRole('button', { name: 'Add to cart' }));
  }

  async openCart(): Promise<void> {
    await this.goto(UI_ROUTES.checkout);
  }
}
