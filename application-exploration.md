# Application Exploration

**Application:** PracticeSoftwareTesting Toolshop (v5.0)  
**Scope:** Checkout & Application Flow  
**UI URL:** https://practicesoftwaretesting.com/  
**API URL:** https://api.practicesoftwaretesting.com/api/documentation  
**Exploration Period:** During assessment execution  

---

## 1. Purpose

This document captures observations from exploring the PracticeSoftwareTesting Toolshop application to support requirement analysis, test design, and automation planning for the Checkout & Application Flow. Findings are based on manual exploration of the application, review of the official API documentation, and the QA Practical Assessment acceptance criteria.

---

## 2. Application Overview

PracticeSoftwareTesting Toolshop is a sample e-commerce application for hardware and tools. It provides:

- User registration and authentication (UI and API)
- A paginated product catalog with categories and brands
- Shopping cart management
- Multi-step checkout
- Invoice generation and viewing

The application is intended for black-box testing practice and is supported by a public REST API with interactive documentation.

---

## 3. Business Flow

The end-to-end customer journey for the Checkout & Application Flow is as follows:

1. **Register** — Create a new user account
2. **Login** — Authenticate with registered credentials
3. **Browse products** — View the product catalog
4. **View product details** — Review individual product information
5. **Add products to cart** — Add one or more items to the shopping cart
6. **Update quantities** — Adjust item quantities in the cart
7. **Checkout** — Proceed through the checkout wizard
8. **Enter billing details** — Provide billing address information
9. **Select Cash on Delivery** — Choose Cash on Delivery as the payment method
10. **Confirm order** — Complete the order (including double-confirm for invoice generation)
11. **View invoice under My Invoices** — Verify the generated invoice

This business flow forms the basis for manual testing, API testing, and automation planning within the project scope.

---

## 4. UI Exploration Findings

### 4.1 Key Pages and Routes

| Route | Purpose |
|-------|---------|
| `/auth/register` | User registration |
| `/auth/login` | User login |
| `/` (home) | Product catalog browsing |
| `/checkout` | Multi-step checkout wizard |
| My Invoices | View generated invoices (per assessment AC2) |

### 4.2 Checkout Flow Structure

The checkout page presents a four-step wizard:

1. **Sign in**
2. **Billing Address**
3. **Payment**
4. *(Final step — invoice confirmation)*

This aligns with the assessment end-to-end purchase flow: authenticate, provide billing details, select payment, and complete the order.

### 4.3 UI Behaviours Noted

| Behaviour | Source | Notes |
|-----------|--------|-------|
| Invoice requires **Confirm pressed twice** | Assessment document | Must be validated during manual and UI automation testing |
| Cash on Delivery checkout | Assessment AC2 | Only payment method in scope for this project |
| Cart accessible from main navigation | UI observation | Cart icon visible on checkout page |

---

## 5. API Exploration Findings

### 5.1 Base URL

`https://api.practicesoftwaretesting.com`

Interactive API documentation is available at `/api/documentation`.

### 5.2 Endpoints Identified

| Endpoint | Method | Auth Required | Purpose |
|----------|--------|---------------|---------|
| `/users/register` | POST | No | Register a new user |
| `/users/login` | POST | No | Authenticate and obtain bearer token |
| `/users/me` | GET | Yes | Retrieve authenticated user profile |
| `/products` | GET | No | List products (paginated; supports `in_stock` filter) |
| `/categories` | GET | No | List product categories |
| `/brands` | GET | No | List product brands |
| `/carts` | POST | Yes | Create a new cart |
| `/carts/{cart_id}` | GET | Yes | Retrieve cart with items |
| `/carts/{cart_id}` | POST | Yes | Add product to cart |
| `/invoices` | POST | Yes | Generate invoice from cart |
| `/invoices` | GET | Yes | List user invoices (paginated) |

### 5.3 Authentication

- Login returns `access_token`, `token_type` (`Bearer`), and `expires_in`.
- Authenticated requests require header: `Authorization: Bearer <access_token>`.

### 5.4 Registration Observations

| Field / Rule | Observation |
|--------------|-------------|
| Minimum fields | `first_name`, `last_name`, `email`, `password` are sufficient for registration |
| Password complexity | Must contain uppercase, lowercase, and at least one symbol |
| Password breach check | Common/leaked passwords are rejected (e.g., `Welcome01!`) |
| Optional fields | `dob`, `phone`, and `address` can be included but are not required for successful registration |

### 5.5 Product Catalog Observations

| Attribute | Observation |
|-----------|-------------|
| Total products | 50 products across 6 pages (9 per page) |
| Categories | 19 categories (e.g., Hand Tools, Power Tools, Pliers, Hammer) |
| Brands | 2 brands (ForgeFlex Tools, MightyCraft Hardware) |
| Stock status | Products have `in_stock` flag; filter via `?in_stock=true` |
| Product attributes | `price`, `is_location_offer`, `is_rental`, `co2_rating`, `is_eco_friendly` |

### 5.6 Cart and Invoice Observations

| Behaviour | Observation |
|-----------|-------------|
| Cart creation | Returns a cart `id` (ULID format) |
| Add to cart | POST to `/carts/{cart_id}` with `product_id` and `quantity` |
| Quantity update | Re-adding the same product increments the existing line-item quantity |
| Cart retrieval | GET `/carts/{cart_id}` returns `cart_items` with nested product details |
| Invoice generation | POST `/invoices` with billing fields, `payment_method`, `cart_id`, and `payment_details` |
| Payment method | Assessment example uses `"cash-on-delivery"` |

Example invoice payload (from assessment):

```json
{
  "billing_street": "Zoey Shore",
  "billing_city": "Hesselbury",
  "billing_state": "Florida",
  "billing_country": "TG",
  "billing_postal_code": "1234AA",
  "payment_method": "cash-on-delivery",
  "cart_id": "<cart_id>",
  "payment_details": {}
}
```

### 5.7 Expected API Flow

Based on the assessment acceptance criteria, application behaviour, and API documentation, the expected workflow is:

1. Register user → receive user `id`
2. Login → receive `access_token`
3. Create cart → receive cart `id`
4. Retrieve in-stock products
5. Add product(s) to cart
6. Verify cart contents via GET
7. Generate invoice via POST
8. Retrieve profile via GET `/users/me`

---

## 6. Mapping to Assessment Acceptance Criteria

| Assessment AC | UI / API Coverage | Exploration Status |
|---------------|-------------------|--------------------|
| **UI AC1:** Registration, login, profile verification | `/auth/register`, `/auth/login`, profile page; API `/users/register`, `/users/login`, `/users/me` | Identified (UI profile page to be validated during manual testing) |
| **UI AC2:** Browse, cart, checkout (COD), invoice | Product catalog, cart, `/checkout` wizard, My Invoices | Identified (checkout wizard structure observed; full UI E2E and double-confirm to be validated) |
| **API AC1:** Register, login, token, create cart | `/users/register`, `/users/login`, `/carts` POST | Documented via API documentation and exploration |
| **API AC2:** Products, cart, verify, invoice | `/products`, `/carts/{id}`, `/invoices` POST | Documented via API documentation and exploration |

---

## 7. Risk Observations

| Risk | Impact |
|------|--------|
| **Shared public environment** | Test data collisions between users or parallel runs may cause inconsistent results or failed assertions |
| **Dynamic product data** | Product availability, pricing, and stock status may change between exploration and test execution, affecting cart and checkout scenarios |
| **Double-confirm invoice behaviour** | UI automation may fail or produce false negatives if the second Confirm action is not handled |
| **Unique email requirement** | Registration failures due to duplicate emails can block downstream login, cart, and checkout flows |
| **Possible API behaviour changes** | Endpoint contracts, validation rules, or response structures may change during the assessment period, requiring test updates |

---

## 8. Testing Implications

| Area | Implication |
|------|-------------|
| **Test data** | Use unique email addresses per run; generate passwords meeting complexity and breach-check rules |
| **Product selection** | Prefer `in_stock=true` products for checkout scenarios to avoid ordering unavailable items |
| **Cart quantity** | API quantity updates via re-adding the same product; UI quantity update behaviour to be confirmed separately |
| **Invoice UI** | Account for double-confirm behaviour in manual and automated UI tests |
| **Authentication** | API tests must handle bearer token lifecycle (register → login → authorize) |
| **Shared environment** | Public application; test data isolation is important to avoid collisions |

---

## 9. Automation Considerations

The following areas are suitable automation candidates based on the business flow and exploration findings. These will later be implemented as `@Smoke` and `@Regression` automation suites.

| Area | Automation Candidate | Suggested Tag |
|------|---------------------|---------------|
| **Registration** | Valid user registration via UI and API | `@Smoke` |
| **Login** | Authenticate with registered credentials | `@Smoke` |
| **Product search** | Browse and locate products in the catalog | `@Regression` |
| **Cart validation** | Add items, update quantities, verify cart contents | `@Regression` |
| **Checkout** | Complete checkout with billing details and Cash on Delivery | `@Regression` |
| **Invoice verification** | Confirm invoice generation and visibility under My Invoices | `@Smoke`, `@Regression` |
| **API authentication** | Register, login, and obtain bearer token | `@Smoke` |
| **Cart lifecycle** | Create cart, add products, verify cart state via API | `@Regression` |
| **Invoice generation** | Generate invoice with required billing and payment details via API | `@Regression` |

---

## 10. Items to Verify Further

The following items were identified during exploration and require confirmation during manual testing or deeper UI automation:

| Item | Priority |
|------|----------|
| Double-confirm behaviour on invoice generation (UI) | High |
| Full UI checkout flow with Cash on Delivery end-to-end | High |
| Profile information displayed after login matches registration data | Medium |
| UI cart quantity update mechanism | Medium |
| My Invoices page content and invoice detail view | Medium |
| Negative scenarios: invalid login, empty cart checkout, invalid billing fields | Medium |

---

## 11. References

- QA Practical Assessment document (acceptance criteria and scope)
- `requirement-analysis.md` (project scope and testing objectives)
- Live PracticeSoftwareTesting application: https://practicesoftwaretesting.com/
- Official API documentation: https://api.practicesoftwaretesting.com/api/documentation

---

## Conclusion

The exploration findings documented here directly informed the test strategy, manual test cases, API test scenarios, and automation planning for the Checkout & Application Flow. This document serves as the factual baseline for subsequent test design and implementation within the QA AI Capability Assessment.
