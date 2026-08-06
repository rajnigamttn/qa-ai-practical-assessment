import { Page } from '@playwright/test';
import { UI_ROUTES } from '../utils/constants.js';
import { TestUser } from '../utils/test-data.generator.js';
import { BasePage } from './base.page.js';

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto(UI_ROUTES.register);
  }

  async register(user: TestUser): Promise<void> {
    await this.fill(this.page.getByLabel('First name'), user.first_name);
    await this.fill(this.page.getByLabel('Last name'), user.last_name);
    await this.fill(this.page.getByLabel('Date of Birth *'), '1990-01-15');
    await this.page.getByLabel('Your country *').selectOption({ index: 1 });
    await this.fill(this.page.getByLabel('Email address'), user.email);
    await this.fill(this.page.getByLabel('Password'), user.password);
    await this.click(this.page.getByRole('button', { name: 'Register' }));
  }
}
