import { APIRequestContext, request } from '@playwright/test';
import { apiBaseUrl } from '../config/environment.js';
import { TIMEOUTS } from '../utils/constants.js';

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

export class ApiClient {
  constructor(
    private readonly requestContext: APIRequestContext,
    private readonly token?: string,
  ) {}

  static async create(token?: string): Promise<ApiClient> {
    const requestContext = await request.newContext({
      baseURL: apiBaseUrl,
      extraHTTPHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: TIMEOUTS.api,
    });

    return new ApiClient(requestContext, token);
  }

  withToken(token: string): ApiClient {
    return new ApiClient(this.requestContext, token);
  }

  async dispose(): Promise<void> {
    await this.requestContext.dispose();
  }

  get(path: string, options?: RequestOptions) {
    return this.requestContext.get(path, {
      ...options,
      headers: this.mergeHeaders(options?.headers),
    });
  }

  post(path: string, data?: unknown, options?: RequestOptions) {
    return this.requestContext.post(path, {
      ...options,
      data,
      headers: this.mergeHeaders(options?.headers),
    });
  }

  put(path: string, data?: unknown, options?: RequestOptions) {
    return this.requestContext.put(path, {
      ...options,
      data,
      headers: this.mergeHeaders(options?.headers),
    });
  }

  delete(path: string, options?: RequestOptions) {
    return this.requestContext.delete(path, {
      ...options,
      headers: this.mergeHeaders(options?.headers),
    });
  }

  private mergeHeaders(headers?: Record<string, string>): Record<string, string> {
    const merged: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    };

    if (this.token) {
      merged.Authorization = `Bearer ${this.token}`;
    }

    return merged;
  }
}
