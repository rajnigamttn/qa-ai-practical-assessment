import { APIResponse } from '@playwright/test';
import { API_ROUTES } from '../utils/constants.js';
import { BillingDetails } from '../utils/test-data.generator.js';
import { ApiClient } from './api-client.js';

export interface InvoiceResponse {
  id: string;
}

export class InvoiceApi {
  constructor(private readonly client: ApiClient) {}

  createInvoice(billingDetails: BillingDetails): Promise<APIResponse> {
    return this.client.post(API_ROUTES.invoices, billingDetails);
  }

  getInvoices(): Promise<APIResponse> {
    return this.client.get(API_ROUTES.invoices);
  }

  async createInvoiceAndGetId(
    billingDetails: BillingDetails,
  ): Promise<string> {
    const response = await this.createInvoice(billingDetails);
    const body = (await response.json()) as InvoiceResponse;
    return body.id;
  }
}
