import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../api/api-client.js';
import { AuthApi } from '../../../api/auth.api.js';
import { CartApi, CartDetailsResponse } from '../../../api/cart.api.js';
import { InvoiceApi } from '../../../api/invoice.api.js';
import { ProductApi } from '../../../api/product.api.js';
import {
  generateBillingDetails,
  generateUser,
} from '../../../utils/test-data.generator.js';

test.describe('API Checkout Lifecycle Regression', () => {
  test(
    'MTC-API-002 Complete API Checkout Lifecycle Products Cart and Invoice @Regression',
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
        const productApi = new ProductApi(authenticatedClient);
        const cartApi = new CartApi(authenticatedClient);
        const invoiceApi = new InvoiceApi(authenticatedClient);

        const product = await productApi.getFirstInStockProduct();
        expect(product.id).toBeTruthy();

        const cartId = await cartApi.createCartAndGetId();
        expect(cartId).toBeTruthy();

        const addProductResponse = await cartApi.addProduct(
          cartId,
          product.id,
          1,
        );
        expect(addProductResponse.ok()).toBeTruthy();

        const cartDetailsResponse = await cartApi.getCart(cartId);
        expect(cartDetailsResponse.ok()).toBeTruthy();

        const cartDetails =
          (await cartDetailsResponse.json()) as CartDetailsResponse;
        expect(
          cartDetails.cart_items.some(
            (item) => item.product_id === product.id,
          ),
        ).toBeTruthy();

        const billingDetails = generateBillingDetails({ cart_id: cartId });
        const invoiceResponse = await invoiceApi.createInvoice(billingDetails);
        expect(invoiceResponse.ok()).toBeTruthy();

        const invoice = (await invoiceResponse.json()) as { id: string };
        expect(invoice.id).toBeTruthy();
      } finally {
        await client.dispose();
      }
    },
  );
});
