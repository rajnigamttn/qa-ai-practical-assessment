import { test, expect } from '@playwright/test';
import { CartPage } from '../../../pages/cart.page.js';
import { CheckoutPage } from '../../../pages/checkout.page.js';
import { HomePage } from '../../../pages/home.page.js';
import { InvoicesPage } from '../../../pages/invoices.page.js';
import { LoginPage } from '../../../pages/login.page.js';
import { RegisterPage } from '../../../pages/register.page.js';
import { generateUser } from '../../../utils/test-data.generator.js';

test.describe('UI Checkout Smoke', () => {
  test(
    'MTC-UI-002 Single-Product Checkout with Cash on Delivery and Invoice Confirmation @Smoke',
    { tag: '@Smoke' },
    async ({ page }) => {
      const user = generateUser();

      const registerPage = new RegisterPage(page);
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);
      const invoicesPage = new InvoicesPage(page);

      await registerPage.navigate();
      await registerPage.register(user);

      await expect(page).toHaveURL(/\/auth\/login/);

      await loginPage.navigate();
      await loginPage.login(user.email, user.password);
      await expect(page).toHaveURL(/\/account/);
      await expect(
        page.locator('[data-test="nav-menu"]')
      ).toContainText(`${user.first_name} ${user.last_name}`);


      await homePage.navigate();
      await homePage.addFirstAvailableProductToCart();
      await homePage.openCart();

      await cartPage.proceedToCheckout();
      await checkoutPage.completeBillingDetails();
      await checkoutPage.selectCashOnDelivery();
      await checkoutPage.confirmOrder();

      await invoicesPage.navigate();
      await expect(
        page.getByRole('link', { name: 'Details' }).first(),
      ).toBeVisible();
    },
  );
});
