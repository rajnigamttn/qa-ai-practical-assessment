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
  billing_street: 'Zoey Shore',
  billing_city: 'Hesselbury',
  billing_state: 'Florida',
  billing_country: 'TG',
  billing_postal_code: '1234AA',
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