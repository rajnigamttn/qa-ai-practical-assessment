import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../api/api-client.js';
import { AuthApi } from '../../../api/auth.api.js';
import { CartApi } from '../../../api/cart.api.js';
import { InvoiceApi } from '../../../api/invoice.api.js';
import {
  generateBillingDetails,
  generateUser,
} from '../../../utils/test-data.generator.js';

test.describe('API Invoice Negative Regression', () => {
  test(
    'MTC-API-005 Invoice Generation with Invalid or Incomplete Billing Details @Regression',
    { tag: '@Regression' },
    async () => {
      const user = generateUser();
      const client = await ApiClient.create();
      const authApi = new AuthApi(client);

      try {
        const registerResponse = await authApi.register(user);
        expect(registerResponse.ok()).toBeTruthy();

        const loginResponse = await authApi.loginAndGetToken(
          user.email,
          user.password,
        );
        expect(loginResponse.access_token).toBeTruthy();

        const authenticatedClient = client.withToken(loginResponse.access_token);
        const cartApi = new CartApi(authenticatedClient);
        const invoiceApi = new InvoiceApi(authenticatedClient);

        const cartId = await cartApi.createCartAndGetId();
        expect(cartId).toBeTruthy();

        const invalidBilling = generateBillingDetails({
          cart_id: cartId,
          billing_street: '',
          billing_city: '',
          billing_postal_code: '',
        });

        const invoiceResponse = await invoiceApi.createInvoice(invalidBilling);

        expect(invoiceResponse.ok()).toBeFalsy();
        expect([400, 422]).toContain(invoiceResponse.status());
      } finally {
        await client.dispose();
      }
    },
  );
});
