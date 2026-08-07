import { DEFAULT_BILLING } from './constants';

export interface TestUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface BillingDetails {
  billing_street: string;
  billing_city: string;
  billing_state: string;
  billing_country: string;
  billing_postal_code: string;
  billing_house_number: string;
  payment_method: string;
  payment_details: Record<string, unknown>;
  cart_id?: string;
}

export function generateUniqueEmail(prefix = 'qa'): string {
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `${prefix}.${unique}@mailinator.com`;
}

export function generateValidPassword(): string {
  const suffix = Math.random().toString(36).slice(2, 10);
  return `QaTest!${suffix}`;
}

export function generateUser(overrides: Partial<TestUser> = {}): TestUser {
  return {
    first_name: 'QA',
    last_name: 'Tester',
    email: generateUniqueEmail(),
    password: generateValidPassword(),
    ...overrides,
  };
}

export function generateBillingDetails(
  overrides: Partial<BillingDetails> = {},
): BillingDetails {
  return {
    ...DEFAULT_BILLING,
    payment_details: { ...DEFAULT_BILLING.payment_details },
    ...overrides,
  };
}
