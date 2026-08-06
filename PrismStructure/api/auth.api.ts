import { APIResponse } from '@playwright/test';
import { API_ROUTES } from '../utils/constants.js';
import { TestUser } from '../utils/test-data.generator.js';
import { ApiClient } from './api-client.js';

export interface RegisterResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export class AuthApi {
  constructor(private readonly client: ApiClient) {}

  register(user: TestUser): Promise<APIResponse> {
    return this.client.post(API_ROUTES.register, {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
    });
  }

  login(email: string, password: string): Promise<APIResponse> {
    return this.client.post(API_ROUTES.login, { email, password });
  }

  async loginAndGetToken(email: string, password: string): Promise<LoginResponse> {
    const response = await this.login(email, password);
    return response.json() as Promise<LoginResponse>;
  }
}
