import { Page } from '@playwright/test';
import { UI_ROUTES } from '../utils/constants.js';
import { BasePage } from './base.page.js';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto(UI_ROUTES.checkout);
  }

  async updateQuantity(quantity: number): Promise<void> {
    const quantityField = this.page.getByLabel(/Quantity for/i).first();
    await quantityField.fill(String(quantity));
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(this.page.getByTestId('proceed-2'));
  }
}
