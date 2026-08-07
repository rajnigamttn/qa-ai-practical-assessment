import { expect, Page } from '@playwright/test';
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
  // Step 1 -> Step 2
  const proceed1 = this.page.getByTestId('proceed-1');

  await expect(proceed1).toBeVisible();
  await proceed1.click();

  // Step 2 -> Step 3
  const proceed2 = this.page.getByTestId('proceed-2');

  await expect(proceed2).toBeVisible({
    timeout: 10000,
  });

  await proceed2.click();
  await expect(this.page.getByLabel('Street')).toBeVisible({
    timeout: 10000,
  });
    }
    
}