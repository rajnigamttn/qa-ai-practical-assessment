# Requirement Analysis

**Assessment:** QA AI Capability Exercise  
**Application Under Test:** PracticeSoftwareTesting Toolshop  
**Scope:** Checkout & Application Flow  
**SUT URL:** https://practicesoftwaretesting.com/  
**API Documentation:** https://api.practicesoftwaretesting.com/api/documentation  

---

## 1. Assessment Objective

This repository documents an AI-assisted QA workflow applied to the PracticeSoftwareTesting Toolshop Checkout & Application Flow. Its engineering purpose is to make testing judgment visible across the software testing lifecycle — from requirement understanding and risk analysis through manual test design, UI and API automation, test data planning, execution, debugging, and documentation.

Rather than treating AI as a shortcut to generate test cases, the project demonstrates how AI augments QA decision-making: scoping coverage, designing maintainable tests, validating outputs, and refining automation iteratively. All artifacts in this repository support that traceable, reviewable workflow.

---

## 2. Application Under Test

PracticeSoftwareTesting Toolshop is a sample e-commerce web application that provides user registration, product catalog browsing, shopping cart management, checkout, and invoice viewing. It is supported by a documented REST API for authentication, cart operations, product retrieval, and invoice generation.

The **Checkout & Application Flow** has been selected as the project scope because it represents the core end-to-end user journey described in the assessment acceptance criteria — from account creation and login through product selection, cart updates, Cash on Delivery checkout, and invoice verification. This flow exercises both UI and API surfaces with meaningful positive, negative, and edge-case coverage without expanding into unrelated ecommerce areas.

| Item | Detail |
|------|--------|
| **Application** | PracticeSoftwareTesting Toolshop — a small ecommerce web application |
| **UI URL** | https://practicesoftwaretesting.com/ |
| **API URL** | https://api.practicesoftwaretesting.com/api/documentation |
| **Selected focus** | Checkout & Application Flow |

The assessment provides two high-level acceptance criteria for UI and API testing. A known application behavior for invoice generation is that the user must **press Confirm twice** to generate an invoice.

### UI Acceptance Criteria (from assessment)

**AC1: User Registration & Login**  
The user should be able to register with valid details, log in using the registered credentials, and verify profile information successfully.

**AC2: End-to-End Purchase Flow**  
The user should be able to browse products, add multiple items to the cart (including updating quantity), complete checkout using Cash on Delivery, and successfully view the generated invoice under My Invoices.

### API Acceptance Criteria (from assessment)

**AC1: User Authentication & Cart Creation**  
A new user should be able to register via API, log in with the registered credentials, obtain a valid bearer token, and create a new cart successfully.

**AC2: Product Selection & Invoice Generation**  
Using the bearer token, the user should be able to retrieve products, add selected products to the cart, verify cart contents, and successfully generate an invoice with the required customer and order details.

Example invoice generation payload (from assessment):

```json
{
  "billing_street": "Zoey Shore",
  "billing_city": "Hesselbury",
  "billing_state": "Florida",
  "billing_country": "TG",
  "billing_postal_code": "1234AA",
  "payment_method": "cash-on-delivery",
  "cart_id": "01kx0dctdxxg6sm4wtt1t0nf9r",
  "payment_details": {}
}
```

---

## 3. Scope — In Scope

| Area | In-Scope Items |
|------|----------------|
| **UI flows** | User registration, login, profile verification, product browsing, cart management (add items, update quantity), checkout with Cash on Delivery, invoice viewing under My Invoices |
| **API flows** | User registration, login, bearer token retrieval, cart creation, product retrieval, add products to cart, cart verification, invoice generation |
| **Test types** | Manual functional test cases; UI automation (smoke and E2E/regression); API automation covering core checkout lifecycle |
| **Test categories** | Positive, negative, and edge cases; smoke and regression tagging |
| **Test data** | Test data for UI and API scenarios, including invoice billing fields and payment method (`cash-on-delivery`) |

---

## 4. Out of Scope

| Item | Rationale |
|------|-----------|
| Payment methods other than **Cash on Delivery** | Assessment AC2 specifies Cash on Delivery only |
| Flows outside registration, login, cart, checkout, and invoice | Selected scope is Checkout & Application Flow; assessment ACs do not require broader ecommerce coverage |
| Non-Core stretch scenarios without supporting ACs | Assessment states a clean, well-documented Core alone is a strong result |
| Flows not required by the assessment ACs | Keeps testing focused on the defined Checkout & Application Flow |

---

## 5. Testing Objectives

1. Validate user registration with valid details, successful login with registered credentials, and accurate profile information display.
2. Confirm product browsing, adding multiple items to the cart, and updating item quantities behave as expected.
3. Verify Cash on Delivery checkout completes successfully with required billing details.
4. Confirm invoice generation and visibility under My Invoices, including the double-confirm behavior noted in the assessment.
5. Validate API authentication flow: register, login, obtain a bearer token, and create a cart.
6. Verify API product selection flow: retrieve products, add items to cart, confirm cart contents, and generate an invoice with required customer and order details.
7. Cover negative scenarios such as invalid login credentials, invalid checkout or billing inputs, and failed API requests with invalid auth or payloads.
8. Exercise edge cases supported by the acceptance criteria, including cart quantity boundaries and invoice payload field validation.

---

## 6. Proposed Manual Testing Scope

Manual test cases will be documented in CSV format under `FunctionalTestCase/`, covering the Checkout & Application Flow.

| Flow | Manual Coverage Focus | Suggested Tag |
|------|----------------------|---------------|
| Registration & Login | Valid registration, login with registered credentials, profile verification | `@Smoke`, `@Regression` |
| Product & Cart | Browse products, add multiple items, update quantity | `@Regression` |
| Checkout | Complete checkout using Cash on Delivery | `@Smoke`, `@Regression` |
| Invoice | View generated invoice under My Invoices; validate double-confirm behavior | `@Smoke`, `@Regression` |
| Negative / Edge | Invalid login, invalid checkout inputs, cart edge cases as supported by ACs | `@Regression` |

---

## 7. Proposed Automation Scope

Automation will provide representative smoke and regression coverage for the Checkout & Application Flow.

### UI Automation

| Scenario Area | Coverage | Tag |
|---------------|----------|-----|
| Registration & Login | End-to-end user auth and profile verification | `@Smoke` |
| Purchase Flow | Browse → cart (multiple items, quantity update) → checkout (COD) → invoice view | `@Regression` |
| Error Handling | Key negative paths aligned to UI ACs | `@Regression` |

### API Automation

| Scenario Area | Coverage | Tag |
|---------------|----------|-----|
| Auth & Cart | Register → login → bearer token → create cart | `@Smoke` |
| Product & Invoice | Retrieve products → add to cart → verify cart → generate invoice | `@Regression` |
| Error Handling | Invalid auth, invalid payloads, or failed requests as supported by API ACs | `@Regression` |

---

## 8. Engineering Decisions

| Decision | Rationale |
|----------|-----------|
| Use a clean Playwright project within `PrismStructure/` instead of publishing the internal PRISM framework | Keeps the repository self-contained and reviewable without exposing proprietary framework code |
| Focus automation on one representative end-to-end checkout flow | Aligns with assessment ACs and prioritizes depth over broad, shallow automation coverage |
| Maintain AI prompt documentation separately in `ai-prompts/` | Preserves evidence of iterative AI use distinct from final test artifacts |
| Manually review every AI-generated artifact before acceptance | Ensures test cases, scripts, and documentation reflect validated QA judgment rather than unreviewed AI output |

---

## 9. Risks and Assumptions

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Invoice generation requires double Confirm | UI automation may fail if confirm step is handled once | Explicitly test and automate the double-confirm behavior noted in the assessment |
| Shared/public test environment | Data collisions or unstable state between runs | Use unique test data per run; plan cleanup or isolated user accounts |
| AI-generated tests may miss edge cases or assert incorrectly | False confidence in coverage | Human review and validation of all AI-generated cases and scripts |
| Token/session handling in API tests | Flaky or invalid authenticated requests | Centralize auth and cart setup in reusable API helpers |
| Cursor monthly usage limits | Incomplete artifacts if premium model overused | Use lighter models for planning/docs; reserve stronger models for automation and debugging |
| Application behaviour may change during the assessment period | Tests or manual cases may fail unexpectedly; documented behaviour may drift from actual UI/API | Re-verify flows against the live application before finalizing tests; update cases and automation when behaviour changes are confirmed |

### Assumptions

- The Toolshop application and API documentation URLs remain accessible during the assessment period.
- Cash on Delivery is the only payment method required for checkout validation.
- Test execution evidence (logs, reports, screenshots, or API responses) can be captured from local or CI runs.
- The repository will be submitted via public Git with iterative commits (not a single bulk push).
- Browser and Node.js environments required for Playwright are available on the execution machine.

---

## 10. Deliverables Mapping

| Assessment Requirement | Repository Location |
|------------------------|---------------------|
| Requirement and risk analysis | `requirement-analysis.md` |
| Project info and AI workflow description | `project-info.md` |
| Manual test suite (Functional) | `FunctionalTestCase/UI-TestCases.csv`, `FunctionalTestCase/API-TestCases.csv` |
| UI + API automation (Playwright / Prism) | `PrismStructure/` |
| Execution reports | `PrismStructure/` (execution report output) |
| Test setup and execution instructions | `README.md` |
| AI prompt history — requirements and planning | `ai-prompts/requirements-and-planning.md` |
| AI prompt history — test design | `ai-prompts/test-design.md` |
| AI prompt history — automation and debugging | `ai-prompts/automation-and-debugging.md` |
| AI prompt history — documentation and summary | `ai-prompts/documentation-and-summary.md` |
| Cursor AI configuration (rules, skills, optional MCP) | `.cursor/rules/`, `.cursor/skills/`, `.cursor/agent/mcp/` |

---

## 11. Success Criteria

The submission will be considered successful when it demonstrates:

1. **Clear scope and objectives** derived from the Toolshop Checkout & Application Flow and assessment ACs.
2. **Traceability** from requirements to manual test cases and automated scenarios.
3. **Balanced coverage** of positive, negative, and edge cases across manual, UI, and API tiers.
4. **Smoke and regression tagging** applied consistently across test types.
5. **Runnable automation** executable from README instructions with documented smoke and regression commands.
6. **Execution evidence** demonstrating successful execution of the implemented automation suites (reports, logs, screenshots, or API responses).
7. **AI workflow visibility** through iterative prompt history showing review, validation, and refinement — not unreviewed AI output.
8. **Complete artifact set** aligned to the required repository structure and submitted via public Git with iterative commits.
