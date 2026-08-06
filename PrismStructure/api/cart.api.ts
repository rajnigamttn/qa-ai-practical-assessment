import { APIResponse } from '@playwright/test';
import { API_ROUTES } from '../utils/constants.js';
import { ApiClient } from './api-client.js';

export interface CartResponse {
  id: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  product_id: string;
  cart_id: string;
}

export interface CartDetailsResponse {
  id: string;
  cart_items: CartItem[];
}

export class CartApi {
  constructor(private readonly client: ApiClient) {}

  createCart(): Promise<APIResponse> {
    return this.client.post(API_ROUTES.carts);
  }

  getCart(cartId: string): Promise<APIResponse> {
    return this.client.get(`${API_ROUTES.carts}/${cartId}`);
  }

  addProduct(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<APIResponse> {
    return this.client.post(`${API_ROUTES.carts}/${cartId}`, {
      product_id: productId,
      quantity,
    });
  }

  async createCartAndGetId(): Promise<string> {
    const response = await this.createCart();
    const body = (await response.json()) as CartResponse;
    return body.id;
  }
}
