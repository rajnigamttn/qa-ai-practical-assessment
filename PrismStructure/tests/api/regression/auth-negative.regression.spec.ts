import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../api/api-client.js';
import { AuthApi } from '../../../api/auth.api.js';
import { API_ROUTES } from '../../../utils/constants.js';

test.describe('API Auth Negative Regression', () => {
  test(
    'MTC-API-003 Login with Invalid Credentials @Regression',
    { tag: '@Regression' },
    async () => {
      const client = await ApiClient.create();
      const authApi = new AuthApi(client);

      try {
        const response = await authApi.login(
          'invalid.user@mailinator.com',
          'InvalidPass!1',
        );

        expect(response.status()).toBe(401);
        expect(response.ok()).toBeFalsy();
      } finally {
        await client.dispose();
      }
    },
  );

  test(
    'MTC-API-004 Guest User Can Create Cart Without Authentication @Regression',
    { tag: '@Regression' },
    async () => {
      const client = await ApiClient.create();

      try {
        const response = await client.post(API_ROUTES.carts);

        expect(response.status()).toBe(201);
        expect(response.ok()).toBeTruthy();
        
        const cart = await response.json();
        expect(cart.id).toBeTruthy();
      } finally {
        await client.dispose();
      }
    },
  );
});
