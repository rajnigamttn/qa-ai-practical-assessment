import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../api/api-client.js';
import { AuthApi, RegisterResponse } from '../../../api/auth.api.js';
import { API_ROUTES } from '../../../utils/constants.js';
import { generateUser } from '../../../utils/test-data.generator.js';

test.describe('API Auth and Cart Smoke', () => {
  test(
    'MTC-API-001 User Registration Login and Cart Creation @Smoke',
    { tag: '@Smoke' },
    async () => {
      const user = generateUser();
      const client = await ApiClient.create();
      const authApi = new AuthApi(client);

      try {
        const registerResponse = await authApi.register(user);
        expect(registerResponse.ok()).toBeTruthy();

        const registeredUser =
          (await registerResponse.json()) as RegisterResponse;
        expect(registeredUser.id).toBeTruthy();
        expect(registeredUser.email).toBe(user.email);

        const loginResponse = await authApi.loginAndGetToken(
          user.email,
          user.password,
        );
        expect(loginResponse.access_token).toBeTruthy();
        expect(loginResponse.token_type.toLowerCase()).toBe('bearer');

        const authenticatedClient = client.withToken(loginResponse.access_token);
        const cartResponse = await authenticatedClient.post(API_ROUTES.carts);
        expect(cartResponse.ok()).toBeTruthy();

        const cart = (await cartResponse.json()) as { id: string };
        expect(cart.id).toBeTruthy();
      } finally {
        await client.dispose();
      }
    },
  );
});
