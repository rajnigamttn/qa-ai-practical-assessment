import { expect, Page } from '@playwright/test';
import { UI_ROUTES, DEFAULT_BILLING } from '../utils/constants.js';
import { BillingDetails } from '../utils/test-data.generator.js';
import { BasePage } from './base.page.js';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto(UI_ROUTES.checkout);
  }

  async completeBillingDetails(
    billing: BillingDetails = DEFAULT_BILLING,
  ): Promise<void> {

    await this.page
  .getByTestId('country')
  .selectOption({ label: billing.billing_country });

  const postal = this.page.getByTestId('postal_code');

  await postal.click();
  await postal.clear();
  await postal.fill(billing.billing_postal_code);

  const house = this.page.getByTestId('house_number');

  await house.click();
  await house.clear();
  await house.fill(billing.billing_house_number);

  
    // Wait until auto-fill completes
// Wait for address lookup to complete
await expect(this.page.getByTestId('street')).not.toHaveValue('', {
  timeout: 15000,
});

await expect(this.page.getByTestId('city')).not.toHaveValue('', {
  timeout: 15000,
});

await expect(this.page.getByTestId('state')).not.toHaveValue('', {
  timeout: 15000,
});
await this.page.waitForTimeout(1000);
    const proceed = this.page.getByTestId('proceed-3');
  
    await expect(proceed).toBeEnabled({
      timeout: 15000,
    });
    await proceed.click();
  }

  async selectCashOnDelivery(): Promise<void> {
    await this.page
    .getByTestId('payment-method')
    .selectOption({
      value: 'cash-on-delivery',
    });
    }

    async confirmOrder(): Promise<void> {
      const confirm = this.page.getByTestId('finish');
    
      // First confirm
      await expect(confirm).toBeEnabled();
      await confirm.click();
    
      // Wait until payment is actually processed
      await expect(
        this.page.getByTestId('payment-success-message'),
      ).toBeVisible();
    
      // Second confirm creates invoice
      await expect(confirm).toBeEnabled();
      await confirm.click();
    
      // Wait until order confirmation appears
      await expect(
        this.page.locator('#order-confirmation'),
      ).toContainText(
        'Thanks for your order!',
        {
          timeout: 15000,
        },
      );
    }
}
