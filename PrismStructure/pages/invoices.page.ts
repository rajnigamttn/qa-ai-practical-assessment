import { Page } from '@playwright/test';
import { BasePage } from './base.page.js';

export class InvoicesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('/account/invoices');
  }

  async openLatestInvoice(): Promise<void> {
    await this.click(
      this.page.getByRole('link').filter({ hasText: /invoice/i }).first(),
    );
  }
}
