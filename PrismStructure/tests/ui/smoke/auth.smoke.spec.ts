import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page.js';
import { RegisterPage } from '../../../pages/register.page.js';
import { generateUser } from '../../../utils/test-data.generator.js';

test.describe('UI Auth Smoke', () => {
  test(
    'MTC-UI-001 User Registration Login and Profile Verification @Smoke',
    { tag: '@Smoke' },
    async ({ page }) => {
      const user = generateUser();
      const registerPage = new RegisterPage(page);
      const loginPage = new LoginPage(page);

      await registerPage.navigate();
      await registerPage.register(user);
      await expect(page).toHaveURL(/\/auth\/login/);

      await loginPage.navigate();
      await loginPage.login(user.email, user.password);

      await expect(page).toHaveURL(/\/account/);
      await expect(page.locator('[data-test="nav-menu"]')).toContainText(
        `${user.first_name} ${user.last_name}`,
      );
    },
  );
});
