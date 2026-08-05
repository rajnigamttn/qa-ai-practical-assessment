# Automation Opportunities

**Project:** QA AI Capability Assessment  
**Application Under Test:** PracticeSoftwareTesting Toolshop  
**Scope:** Checkout & Application Flow  
**Related Documents:** `requirement-analysis.md`, `application-exploration.md`, `test-strategy.md`  

---

## 1. Objective

The purpose of this document is to identify which parts of the Checkout & Application Flow are suitable for Playwright automation and which are better left to manual or exploratory testing. Automation is applied selectively based on business value, repeatability, technical feasibility, and long-term maintainability. — each feature is evaluated against business value, technical feasibility, and maintenance cost.

This document records the engineering rationale behind those decisions. It supports the assessment goal of demonstrating thoughtful QA judgment: choosing representative, high-value automation over exhaustive coverage of every screen and endpoint.

---

## 2. Scope

Automation decisions apply exclusively to the **Checkout & Application Flow** — registration through invoice verification — as defined in the finalized project documents.

Each feature is assessed against:

| Factor | Role in Decision-Making |
|--------|-------------------------|
| **Business value** | Does the feature sit on the critical path to a completed purchase? |
| **Repeatability** | Will the same steps be executed frequently across sprints or CI runs? |
| **Risk** | What is the impact of a failure on the customer journey or assessment acceptance criteria? |
| **Stability** | Are UI elements and API contracts stable enough to sustain reliable automation? |
| **Assessment scope** | Does automation of this feature contribute evidence aligned with the QA Practical Assessment without expanding beyond defined acceptance criteria? |

Features that score well on repeatability and business criticality while remaining technically automatable are prioritized. Features requiring human judgment, visual validation, or unstable selectors are deferred to manual testing.

---

## 3. Automation Evaluation Criteria

The following criteria are applied consistently when assessing each feature:

| Criterion | Description | Weight in This Project |
|-----------|-------------|------------------------|
| **Business Criticality** | Impact on the end-to-end checkout journey and assessment ACs | High — auth, cart, checkout, and invoice are non-negotiable |
| **Execution Frequency** | How often the scenario will be re-run (smoke gates, regression, CI) | High — smoke paths run on every significant change |
| **Repeatability** | Whether steps and expected outcomes are deterministic | High for API flows; moderate for multi-step UI wizard |
| **Stability of UI/API** | Likelihood of selectors, routes, or contracts changing | API endpoints are more stable; UI checkout wizard and invoice confirm are higher risk |
| **Data Dependency** | Reliance on dynamic product data, unique emails, or shared environment state | High impact — shared public environment requires isolated test data |
| **Automation Complexity** | Effort to implement reliable waits, auth handling, and assertions | Moderate for API; higher for UI invoice double-confirm |
| **Maintenance Effort** | Ongoing cost when application behaviour or data changes | Favours fewer, deeper suites over broad shallow coverage |
| **Return on Investment (ROI)** | Value gained per hour invested in automation development | Drives focus on one representative E2E path rather than full catalog coverage |

A feature is automated when ROI is positive: the time saved across repeated executions exceeds the cost of building and maintaining the script, and the scenario contributes directly to assessment evidence.

---

## 4. Automation Opportunity Assessment

| Feature | Business Risk | Automation Candidate | Priority | Reason |
|---------|---------------|---------------------|----------|--------|
| **User Registration** | High — blocks all downstream flows | Yes (UI + API) | P1 | Deterministic API contract; repeatable with unique emails; core to UI AC1 and API AC1 |
| **Login** | High — required for checkout and profile | Yes (UI + API) | P1 | Stable flow; high execution frequency; smoke gate candidate |
| **Product Browsing** | Medium — entry point to purchase | Partial (UI regression only) | P2 | Needed for E2E purchase flow but not worth standalone automation; covered within regression journey |
| **Product Details** | Low–Medium — supports informed purchase | No (standalone) | P3 | Low ROI as isolated automation; validated within browse-to-cart regression path |
| **Search / Filters** | Low — not required by assessment ACs | No | — | Out of critical path; dynamic catalog behaviour adds maintenance without AC value |
| **Cart Management** | High — incorrect cart blocks checkout | Yes (UI + API) | P1 | Repeatable; assertable; central to UI AC2 and API AC2 |
| **Quantity Update** | Medium — part of AC2 multi-item requirement | Partial (UI regression + API) | P2 | API supports increment via re-add; UI mechanism still under confirmation — automate once behaviour is stable |
| **Checkout** | High — revenue path completion | Yes (UI regression) | P1 | Multi-step wizard is complex but high value; one representative COD path is worth automating |
| **Cash on Delivery** | High — only in-scope payment method | Yes (within checkout automation) | P1 | No branching across payment types simplifies automation scope |
| **Invoice Generation** | High — order completion proof | Yes (UI + API) | P1 | API invoice POST is highly automatable; UI requires explicit double-confirm handling |
| **My Invoices** | High — AC2 verification point | Partial (UI regression) | P2 | Assert invoice visibility post-checkout; detailed layout checks remain manual |
| **API Authentication** | High — gates all secured endpoints | Yes (API smoke) | P1 | Fast, stable, high ROI; ideal smoke candidate |
| **Cart APIs** | High — supports full API AC2 | Yes (API regression) | P1 | Clear request/response contracts; low UI flakiness |
| **Invoice APIs** | High — completes API purchase lifecycle | Yes (API regression) | P1 | Payload structure defined in assessment; assertable status and response fields |

**Summary:** P1 features form the automation backbone. P2 features are automated as part of broader journeys, not as isolated suites. Features marked No are intentionally excluded to avoid maintenance cost without assessment benefit.

---

## 5. Recommended UI Automation

UI automation will be implemented in Playwright under `PrismStructure/` using Page Object Model, `@Smoke` and `@Regression` tags, and unique test data per run.

### Smoke (`@Smoke`)

| Scenario | Rationale |
|----------|-----------|
| User registration with valid credentials | Proves account creation works; fast gate before deeper testing |
| Login with registered credentials | Confirms authentication path; prerequisite for all secured UI flows |
| Minimal checkout to invoice (single in-stock product, COD) | Validates the critical transaction path end-to-end |

Smoke UI automation is intentionally lean — three scenarios sufficient to confirm the application is testable and the primary journey is functional.

### Regression (`@Regression`)

| Scenario | Rationale |
|----------|-----------|
| Full purchase flow: browse → add multiple items → update quantity → checkout (COD) → My Invoices | Covers UI AC2 with realistic cart complexity |
| Profile verification after login | Confirms UI AC1 profile display |
| Invalid login credentials | Representative negative path with clear expected error |
| Invalid or incomplete checkout billing inputs | Validates error handling without automating every field permutation |

Regression UI automation prioritizes the representative E2E checkout flow over catalog-wide coverage. Search, filters, and standalone product detail pages are exercised within the purchase journey rather than as separate automated suites.

All AI-generated automation code will be executed locally, reviewed, and refined before being committed.

---

## 6. Recommended API Automation

API automation provides the highest ROI for this project. Endpoints have stable contracts, deterministic assertions, and no browser rendering dependencies.

### Smoke (`@Smoke`)

| Flow | Endpoints | Rationale |
|------|-----------|-----------|
| Auth and cart creation | `POST /users/register` → `POST /users/login` → `POST /carts` | Fast execution; confirms token issuance and cart creation (API AC1) |

### Regression (`@Regression`)

| Flow | Endpoints | Rationale |
|------|-----------|-----------|
| Product selection and invoice | `GET /products` → `POST /carts/{id}` → `GET /carts/{id}` → `POST /invoices` | Completes API AC2 with assertable cart and invoice state |
| Profile retrieval | `GET /users/me` | Lightweight assertion that auth context is correct |
| Negative: invalid login | `POST /users/login` with bad credentials | Clear status code and error message |
| Negative: unauthorized cart access | `POST /carts` without bearer token | Validates auth enforcement |
| Negative: invalid invoice payload | `POST /invoices` with missing or invalid billing fields | Confirms API validation without UI dependency |

API automation will use Playwright's `request` API with centralized auth helpers. Results will be captured in `execution-evidence/api-results/` alongside Playwright reports.

Categories and brands endpoints (`GET /categories`, `GET /brands`) are not automated standalone — they add no direct value to the checkout lifecycle defined in the assessment acceptance criteria.

---

## 7. Manual Testing Recommendations

Not every scenario benefits from automation. The following are better suited to manual or exploratory testing:

| Scenario | Why Manual / Exploratory |
|----------|--------------------------|
| **Visual verification** | Product images, layout, and checkout wizard presentation require human observation; automating visual checks adds flakiness without assessment value |
| **UI usability** | Navigation clarity, form labelling, and error message readability are judgment-based |
| **Exploratory checkout behaviour** | First-pass validation of the four-step checkout wizard, wizard transitions, and double-confirm invoice flow before scripting |
| **Profile data accuracy** | Confirming displayed profile matches registration input benefits from human comparison during initial validation |
| **UI cart quantity mechanism** | Update behaviour not fully confirmed during exploration; manual verification precedes reliable automation |
| **My Invoices detail view** | Invoice content layout and field presentation are better validated manually once generation is confirmed |
| **Edge cases requiring human judgement** | Password breach rejection messages, boundary inputs, and ambiguous error states where expected behaviour is not fully specified |
| **Negative UI permutations** | A representative sample is automated; exhaustive field-level negative testing remains in manual CSV suites |

Manual test cases in `FunctionalTestCase/UI-TestCases.csv` and `FunctionalTestCase/API-TestCases.csv` cover positive, negative, and edge scenarios that complement — not duplicate — the automated suites.

---

## 8. Risks of Automation

| Risk | Impact on Automation | Mitigation |
|------|---------------------|------------|
| **Shared public environment** | Parallel runs may collide on data; unrelated users affect product availability | Generate unique emails per run; prefer in-stock products via API filter; avoid hardcoded shared accounts |
| **Dynamic product data** | Product IDs, stock status, and pricing may change between runs | Query `in_stock=true` products at runtime; avoid hardcoded product references |
| **Test data management** | Registration requires unique emails and complexity-compliant passwords | Centralize data generation in test helpers; document conventions in README |
| **Timing issues** | Multi-step checkout wizard and page transitions may cause intermittent failures | Use Playwright auto-waiting and role-based selectors; avoid fixed sleeps |
| **Double-confirm invoice behaviour** | Single Confirm click leaves order incomplete; automation reports false failure | Explicitly handle two Confirm actions in UI invoice step; validate manually before scripting |
| **Application behaviour changes** | Selectors or API contracts may drift during the assessment period | Re-verify against live application; update scripts when changes are confirmed |
| **Over-automation** | Broad coverage increases maintenance without improving assessment evidence | Automate representative paths only; defer low-ROI features to manual testing |

---

## 9. Recommended Automation Roadmap

Automation will be implemented in three phases, aligned with the test strategy's smoke-first approach:

### Phase 1 — Foundation and Smoke

| Deliverable | Tier |
|-------------|------|
| API auth helper (register → login → token) | API infrastructure |
| API smoke: register, login, create cart | `@Smoke` |
| UI smoke: registration and login | `@Smoke` |
| Playwright project structure in `PrismStructure/` | Infrastructure |
| README smoke execution commands | Documentation |

**Goal:** Confirm the application is automatable and the auth path is stable before investing in E2E flows.

### Phase 2 — Core Checkout Lifecycle

| Deliverable | Tier |
|-------------|------|
| UI regression: full purchase flow (browse → cart → COD checkout → invoice) | `@Regression` |
| API regression: products → cart → verify → invoice | `@Regression` |
| UI smoke: minimal checkout to invoice | `@Smoke` |
| Double-confirm handling in UI invoice step | UI reliability |
| Execution evidence (screenshots, reports, API results) | `execution-evidence/` |

**Goal:** Deliver the representative end-to-end paths required by UI AC2 and API AC2.

### Phase 3 — Negative, Edge, and Hardening

| Deliverable | Tier |
|-------------|------|
| API regression: invalid auth, invalid invoice payload | `@Regression` |
| UI regression: invalid login, invalid billing inputs | `@Regression` |
| Quantity update in multi-item cart (UI and API) | `@Regression` |
| Profile verification assertion | `@Regression` |
| Refine flaky tests; document known limitations in README | Maintenance |

**Goal:** Extend coverage to negative and edge scenarios after core paths are stable; avoid blocking Phase 2 delivery with lower-priority failures.
---
## 10. Traceability to Assessment

The automation recommendations directly support the assessment acceptance criteria.

| Assessment Requirement | Automation Coverage |
|------------------------|--------------------|
| UI AC1 | Registration, Login, Profile |
| UI AC2 | Product → Cart → Checkout → Invoice |
| API AC1 | Register → Login → Create Cart |
| API AC2 | Products → Cart → Invoice |
---
## 11. AI Validation Note

AI was used to help identify automation candidates and organize this document.

All recommendations were manually reviewed against:

- assessment acceptance criteria
- application exploration findings
- technical feasibility
- engineering judgement

Final automation decisions reflect human validation rather than direct AI output.
---
## 12. Conclusion

Automation for this assessment is deliberately scoped to **representative, high-value scenarios** rather than complete application coverage. The Checkout & Application Flow contains fourteen evaluable features, but automating all of them would produce a broad, shallow suite that is costly to maintain on a shared public environment with dynamic product data.

The engineering decision is to invest automation effort where ROI is highest:

- **API smoke and regression** for the auth → cart → invoice lifecycle — fast, stable, directly mapped to API AC1 and AC2
- **UI smoke** for registration, login, and a minimal checkout path — confirms the critical user journey is operational
- **UI regression** for one full purchase flow with Cash on Delivery — covers UI AC2 without automating search, filters, or catalog-wide browsing

Everything else — visual checks, exploratory wizard behaviour, usability, and exhaustive negative permutations — remains in manual and exploratory testing where human judgment adds more value than script maintenance.

This selective approach aligns with the assessment expectation of a clean, well-documented Core with strong artifacts, and demonstrates that automation is a strategic tool applied with engineering discipline, not a default for every test case.

---

*Automation decisions in this document are derived from `requirement-analysis.md`, `application-exploration.md`, and `test-strategy.md`. Implementation details and execution approach are maintained in those documents and are not repeated here.*
