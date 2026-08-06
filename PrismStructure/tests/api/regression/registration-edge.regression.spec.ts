import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../api/api-client.js';
import { AuthApi } from '../../../api/auth.api.js';
import { generateUser } from '../../../utils/test-data.generator.js';

test.describe('API Registration Edge Regression', () => {
  test(
    'MTC-API-006 User Registration Rejected for Password Policy Violation @Regression',
    { tag: '@Regression' },
    async () => {
      const user = generateUser({ password: 'Welcome01!' });
      const client = await ApiClient.create();
      const authApi = new AuthApi(client);

      try {
        const response = await authApi.register(user);

        expect(response.ok()).toBeFalsy();
        expect([400, 422]).toContain(response.status());
      } finally {
        await client.dispose();
      }
    },
  );
});
