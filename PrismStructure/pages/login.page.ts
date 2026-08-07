import { Page } from '@playwright/test';
import { UI_ROUTES } from '../utils/constants.js';
import { BasePage } from './base.page.js';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto(UI_ROUTES.login);
  }

  async login(email: string, password: string): Promise<void> {
    await this.fill(this.page.getByPlaceholder('Your email'), email);
    await this.fill(this.page.getByPlaceholder('Your password'), password);
    await this.click(this.page.locator('[data-test="login-submit"]'));  
  }
}