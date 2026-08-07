export const UI_ROUTES = {
  home: '/',
  register: '/auth/register',
  login: '/auth/login',
  checkout: '/checkout',
} as const;

export const API_ROUTES = {
  register: '/users/register',
  login: '/users/login',
  me: '/users/me',
  products: '/products',
  categories: '/categories',
  brands: '/brands',
  carts: '/carts',
  invoices: '/invoices',
} as const;

export const PAYMENT_METHOD = {
  CASH_ON_DELIVERY: 'cash-on-delivery',
} as const;

export const DEFAULT_BILLING = {
  billing_country: 'United States of America (the)',
  billing_postal_code: '90210',
  billing_house_number: '42',
  billing_street: '',
  billing_city: '',
  billing_state: '',
  payment_method: PAYMENT_METHOD.CASH_ON_DELIVERY,
  payment_details: {},
} as const;

export const TIMEOUTS = {
  default: 30_000,
  navigation: 15_000,
  action: 10_000,
  api: 10_000,
} as const;

export const TAGS = {
  SMOKE: '@Smoke',
  REGRESSION: '@Regression',
} as const;