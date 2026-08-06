import { Page } from '@playwright/test';
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
    await this.fill(this.page.getByLabel('Street'), billing.billing_street);
    await this.fill(this.page.getByLabel('City'), billing.billing_city);
    await this.fill(this.page.getByLabel('State'), billing.billing_state);
    await this.fill(
      this.page.getByLabel('Postal code'),
      billing.billing_postal_code,
    );
    await this.click(this.page.getByTestId('proceed-3'));
  }

  async selectCashOnDelivery(): Promise<void> {
    await this.click(this.page.getByText('Cash on Delivery', { exact: true }));
  }

  async confirmOrder(): Promise<void> {
    await this.click(this.page.getByRole('button', { name: 'Confirm' }));
    await this.click(this.page.getByRole('button', { name: 'Confirm' }));
  }
}
