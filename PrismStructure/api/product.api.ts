import { APIResponse } from '@playwright/test';
import { API_ROUTES } from '../utils/constants.js';
import { ApiClient } from './api-client.js';

export interface Product {
  id: string;
  name: string;
  in_stock: boolean;
  price: number;
}

export interface ProductsResponse {
  data: Product[];
}

export class ProductApi {
  constructor(private readonly client: ApiClient) {}

  getProducts(inStock = true): Promise<APIResponse> {
    const query = inStock ? '?in_stock=true' : '';
    return this.client.get(`${API_ROUTES.products}${query}`);
  }

  async getFirstInStockProduct(): Promise<Product> {
    const response = await this.getProducts(true);
    const body = (await response.json()) as ProductsResponse;

    if (!body.data.length) {
      throw new Error('No in-stock products available');
    }

    return body.data[0];
  }
}
