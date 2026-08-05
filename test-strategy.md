# Test Strategy

**Project:** QA AI Capability Assessment  
**Application Under Test:** PracticeSoftwareTesting Toolshop  
**Scope:** Checkout & Application Flow  
**Related Documents:** `requirement-analysis.md`, `application-exploration.md`  

---

## 1. Objective

This test strategy defines **how** testing will be planned, designed, executed, and evidenced for the PracticeSoftwareTesting Toolshop Checkout & Application Flow. It translates the finalized requirement analysis and application exploration into a practical, repeatable approach aligned with the QA Practical Assessment acceptance criteria.

The strategy prioritizes:

- Traceability from assessment acceptance criteria to test artifacts
- Balanced coverage across manual, API, and UI automation tiers
- Smoke-first validation followed by deeper regression coverage
- An AI-assisted workflow with mandatory human review before artifact acceptance

---

## 2. Test Scope

Testing is confined to the Checkout & Application Flow — the end-to-end customer journey from registration through invoice verification. This scope was chosen because it represents the highest-value path defined in the assessment acceptance criteria, exercises both UI and API surfaces, and supports meaningful positive, negative, and edge-case coverage without diluting effort across unrelated ecommerce areas.

**In scope:** Registration, login, profile verification, product browsing, cart management, Cash on Delivery checkout, invoice viewing, and the corresponding API lifecycle.

**Out of scope:** Payment methods other than Cash on Delivery, flows outside the assessment acceptance criteria, and stretch scenarios without supporting requirements.

Detailed scope boundaries are documented in `requirement-analysis.md` and are not repeated here.

---

## 3. Test Types

| Test Type | Application | Purpose |
|-----------|-------------|---------|
| **Functional (manual)** | UI and API flows | Validate expected behaviour against acceptance criteria with human judgment |
| **Exploratory** | UI checkout wizard, invoice confirmation, cart behaviour | Discover gaps, confirm assumptions, and investigate areas flagged during application exploration |
| **Smoke** | Critical path scenarios | Confirm core flows are operational before deeper testing |
| **Regression** | Extended positive, negative, and edge scenarios | Validate broader coverage and error handling after smoke passes |
| **API validation** | REST endpoints supporting checkout lifecycle | Verify request/response contracts, auth, and data integrity independent of UI |
| **UI automation** | Playwright-based browser tests | Provide repeatable execution of key user journeys |
| **API automation** | Playwright API request tests | Provide repeatable execution of backend checkout lifecycle |

---

## 4. Test Levels

| Level | Focus | Execution Method |
|-------|-------|------------------|
| **Component / API** | Individual endpoints (auth, cart, products, invoices) | Manual API test cases, manual API validation using the published API documentation, Playwright API tests |
| **Integration** | API flow across register → cart → invoice | Manual API scenarios, automated API regression suite |
| **System (UI)** | End-to-end user journey through the browser | Manual UI test cases, exploratory sessions, Playwright UI tests |
| **Acceptance-aligned** | Assessment UI AC1/AC2 and API AC1/AC2 | Tagged smoke and regression suites mapped to acceptance criteria |

---

## 5. Overall Test Approach

Testing will follow a phased, risk-based approach:

```
Explore → Design → Review → Execute → Automate → Evidence → Refine
```

| Phase | Activities |
|-------|------------|
| **1. Foundation** | Use `application-exploration.md` findings to confirm flows, identify risks, and prioritize test areas |
| **2. Test design** | Derive manual test cases (CSV) from acceptance criteria; apply positive, negative, and edge-case thinking |
| **3. Human review** | Validate all AI-assisted test designs and scripts before execution or commit |
| **4. Manual execution** | Execute and record manual test cases; perform targeted exploratory sessions on high-risk areas (double-confirm invoice, checkout wizard) |
| **5. API validation** | Validate endpoints and payloads against official API documentation before and alongside automation |
| **6. Automation** | Implement Playwright UI and API suites in `PrismStructure/` with `@Smoke` and `@Regression` tags |
| **7. Evidence** | Capture screenshots, reports, and API results in `execution-evidence/` |
| **8. Iteration** | Refine tests based on execution outcomes, defects, and application behaviour changes |

**AI-assisted workflow:** Cursor AI will be used to accelerate test design, automation scaffolding, and debugging. Every AI-generated artifact — test cases, scripts, and documentation — will be manually reviewed, corrected, and approved before acceptance. Prompt history will be maintained in `ai-prompts/` as evidence of responsible AI usage.

**Prioritization principle:** Smoke tests validate the critical path first. Regression tests expand into multi-item carts, quantity updates, negative paths, and edge cases only after smoke stability is confirmed.

---

## 6. Smoke Testing Strategy

Smoke testing confirms that the application is testable and the core checkout path is functional.

| Tier | Smoke Focus | Trigger |
|------|-------------|---------|
| **Manual** | Registration, login, single-product checkout (COD), invoice visibility | Before regression manual execution; after environment or application changes |
| **UI automation** | Registration and login; minimal checkout to invoice | On-demand via README smoke command; before regression suite |
| **API automation** | Register → login → token → create cart | On-demand via README smoke command; before API regression suite |

Smoke scenarios are tagged `@Smoke` and kept lean — sufficient to prove connectivity, authentication, and the primary transaction path without covering every negative or edge case.

---

## 7. Regression Testing Strategy

Regression testing provides broader coverage once smoke passes.

| Tier | Regression Focus | Trigger |
|------|------------------|---------|
| **Manual** | Multi-item cart, quantity updates, negative login/checkout, edge-case inputs | After smoke manual pass; before submission |
| **UI automation** | Full purchase flow (browse → cart → checkout → invoice); key error paths | Scheduled via README regression command |
| **API automation** | Product retrieval → cart population → cart verification → invoice generation; invalid auth and payload scenarios | Scheduled via README regression command |

Regression scenarios are tagged `@Regression`. Negative and edge cases are concentrated at this level to avoid blocking smoke execution with lower-priority failures.

---

## 8. Manual Testing Strategy

Manual test cases will be maintained in CSV format:

| File | Content |
|------|---------|
| `FunctionalTestCase/UI-TestCases.csv` | UI functional, negative, and edge scenarios |
| `FunctionalTestCase/API-TestCases.csv` | API functional, negative, and edge scenarios |

**Design approach:**

- Map each test case to an assessment acceptance criterion and business flow step
- Tag each case as `@Smoke` or `@Regression`
- Classify cases as **positive**, **negative**, or **edge**
- Include explicit expected results and preconditions

**Execution approach:**

- Execute smoke cases first; proceed to regression only if smoke passes or failures are understood
- Perform exploratory testing on high-risk areas identified during application exploration: double-confirm invoice behaviour, checkout wizard transitions, UI cart quantity updates, and My Invoices content
- Record outcomes and observations for traceability

**AI-assisted design:** AI will be used to draft initial test case structures. A human reviewer will validate coverage, correct assertions, remove unsupported scenarios, and approve cases before execution.

---

## 9. API Testing Strategy

API testing validates the checkout lifecycle independently of the UI, aligned with API AC1 and API AC2.

**Validation approach:**

| Area | Method |
|------|--------|
| **Contract validation** | Compare requests and responses against official API documentation at `https://api.practicesoftwaretesting.com/api/documentation` |
| **Authentication** | Verify bearer token issuance, header usage, and rejection of unauthenticated requests |
| **Positive flows** | Execute the expected API workflow: register → login → cart → products → invoice |
| **Negative flows** | Test invalid credentials, missing/invalid payloads, and unauthorized access |
| **Edge cases** | Test password complexity rules, duplicate email rejection, and cart quantity behaviour |

**Execution tooling:** Manual API test cases (CSV), with manual API validation during test design using the published API documentation. Automated API tests will be implemented in Playwright within `PrismStructure/`.

**Evidence:** API request/response outputs and execution results will be stored in `execution-evidence/api-results/`.

---

## 10. UI Automation Strategy (Playwright)

UI automation will be implemented using Playwright in a clean project structure under `PrismStructure/`.

**Design principles:**

| Principle | Implementation |
|-----------|----------------|
| **Page Object Model** | Separate page interactions from test logic for maintainability |
| **Tag-driven execution** | `@Smoke` and `@Regression` tags for selective suite runs |
| **Stable selectors** | Prefer role-based and accessible selectors over brittle CSS |
| **Data independence** | Generate unique user credentials per test run |
| **Known behaviour handling** | Explicitly handle double-confirm on invoice generation |

**Smoke automation:** Registration, login, and a minimal checkout-to-invoice path.

**Regression automation:** Full end-to-end purchase flow with multiple cart items, quantity updates, Cash on Delivery checkout, and invoice verification under My Invoices. Key negative UI paths aligned to acceptance criteria.

**Execution:** Suites runnable from README commands with no manual intervention beyond environment setup. Reports generated to `execution-evidence/reports/`; failure screenshots to `execution-evidence/screenshots/`.

**AI-assisted development:** AI will assist with page object scaffolding and spec file generation. All scripts will be reviewed for correct assertions, wait strategies, and handling of application-specific behaviour before commit. All AI-generated automation code was executed locally, reviewed, and refined before being committed.

---

## 11. API Automation Strategy (Playwright)

API automation will use Playwright's `request` API within the same `PrismStructure/` project, sharing configuration and reporting with UI tests.

**Design principles:**

| Principle | Implementation |
|-----------|----------------|
| **Reusable auth helpers** | Centralize register → login → token retrieval |
| **Fixture-based setup** | Create cart and authenticate once per test where appropriate |
| **Response assertions** | Validate status codes, response body fields, and error messages |
| **Tag-driven execution** | `@Smoke` for auth/cart; `@Regression` for full lifecycle and negatives |

**Smoke automation:** Register, login, obtain bearer token, create cart.

**Regression automation:** Retrieve products, add to cart, verify cart contents, generate invoice with assessment-aligned billing payload and `cash-on-delivery` payment method. Negative tests for invalid auth and payloads.

**Evidence:** API test results captured in Playwright reports and `execution-evidence/api-results/`. All AI-generated automation code was executed locally, reviewed, and refined before being committed.

---

## 12. Test Data Strategy

| Data Type | Strategy |
|-----------|----------|
| **User accounts** | Generate unique email addresses per test run to avoid collisions on the shared public environment |
| **Passwords** | Meet API complexity requirements (uppercase, lowercase, symbol); avoid commonly breached passwords |
| **Products** | Prefer in-stock products (`in_stock=true`) for checkout scenarios |
| **Billing details** | Use assessment-provided invoice payload as baseline; vary fields only for negative/edge cases |
| **Payment method** | `cash-on-delivery` only (in scope per assessment AC2) |
| **Cart data** | Create fresh carts per API test; avoid hardcoded cart IDs |

**AI-assisted generation:** AI may suggest test data values. All data will be validated against API registration rules and application constraints before use.

**Storage:** Test data conventions and generation approach will be documented in `project-info.md` and README.

---

## 13. Environment Strategy

| Item | Approach |
|------|----------|
| **Target environment** | Public PracticeSoftwareTesting Toolshop — `https://practicesoftwaretesting.com/` |
| **API base URL** | `https://api.practicesoftwaretesting.com` |
| **Browser** | Chromium (default Playwright browser); additional browsers if configured |
| **Local setup** | Node.js and Playwright dependencies installed per README instructions |
| **Isolation** | Unique test data per run; no shared static accounts across parallel executions |
| **Configuration** | Environment URLs and settings managed in `PrismStructure/playwright.config.ts` |

No dedicated staging environment is assumed. Tests are designed to tolerate the constraints of a shared public application.

---

## 14. Entry Criteria

Testing activities for each phase begin only when:

| Criterion | Applies To |
|-----------|------------|
| `requirement-analysis.md` and `application-exploration.md` are finalized | All phases |
| Test strategy reviewed and agreed | All phases |
| Manual test cases drafted, reviewed, and stored in `FunctionalTestCase/` | Manual execution |
| Application and API are accessible | All execution |
| Playwright project is configured and installable from README | Automation |
| Test data generation approach is defined | Manual and automated execution |
| Smoke test cases identified and tagged | Smoke execution |

---

## 15. Exit Criteria

Testing for the assessment submission is considered complete when:

| Criterion | Evidence |
|-----------|----------|
| Manual smoke and regression cases executed with outcomes recorded | CSV test cases with execution status |
| Exploratory findings on high-risk areas documented or reflected in test cases | Test case updates or exploration notes |
| UI smoke and regression automation suites implemented and runnable from README | `PrismStructure/` test specs |
| API smoke and regression automation suites implemented and runnable from README | `PrismStructure/` API specs |
| Execution evidence captured | `execution-evidence/screenshots/`, `reports/`, `api-results/` |
| AI prompt history maintained with validation notes | `ai-prompts/` folder |
| Known failures understood and documented (if any) | Test reports or README notes |
| All artifacts committed iteratively to public Git repository | Git history |

---

## 16. Defect Management Approach

| Activity | Approach |
|----------|----------|
| **Identification** | Defects found during manual, exploratory, API, or automated execution |
| **Logging** | Document with steps to reproduce, expected vs actual result, environment, and severity |
| **Severity classification** | Critical (blocks core flow), High (major function broken), Medium (workaround exists), Low (cosmetic/minor) |
| **Triage** | Prioritize defects affecting smoke paths and assessment acceptance criteria first |
| **Retest** | Re-execute affected test cases after fix or workaround confirmation |
| **Automation update** | Update Playwright tests if application behaviour change is confirmed |

For this assessment project, defects will be tracked within test execution notes, prompt history (where AI-assisted debugging occurred), and README documentation. A formal defect tracking tool is not required.

---

## 17. Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Shared public environment causing data collisions | Unique emails and isolated test data per run |
| Dynamic product availability affecting checkout | Filter for in-stock products; re-validate product selection before execution |
| Double-confirm invoice behaviour breaking UI automation | Explicit handling in UI tests; manual exploratory validation |
| AI-generated tests with incorrect assertions | Mandatory human review before acceptance |
| Token/session flakiness in API tests | Centralized auth helpers; fresh login per test where needed |
| Application or API behaviour changes during assessment | Re-verify flows against live application; update tests when changes are confirmed |
| Over-investment in automation at expense of artifacts | Follow phased approach; prioritize lifecycle artifacts per assessment guidance |

---

## 18. Deliverables

| Deliverable | Location |
|-------------|----------|
| Requirement analysis | `requirement-analysis.md` |
| Application exploration | `application-exploration.md` |
| Test strategy | `test-strategy.md` |
| Manual test suite (UI) | `FunctionalTestCase/UI-TestCases.csv` |
| Manual test suite (API) | `FunctionalTestCase/API-TestCases.csv` |
| UI and API automation | `PrismStructure/` |
| Execution evidence | `execution-evidence/` |
| Project info and AI workflow | `project-info.md` |
| Setup and execution instructions | `README.md` |
| AI prompt history | `ai-prompts/` |

---

## 19. Success Criteria

The test strategy will be considered successfully executed when:

1. Testing approach is traceable from assessment acceptance criteria through manual cases and automated suites.
2. Smoke and regression coverage is implemented and distinguishable via tags across manual and automated tiers.
3. Positive, negative, and edge scenarios are represented across UI and API testing.
4. Exploratory findings on high-risk areas are incorporated into test design or documented.
5. Playwright automation suites are runnable from README with documented smoke and regression commands.
6. Execution evidence demonstrates successful runs of implemented automation (reports, logs, screenshots, API results).
7. AI-assisted workflow is visible through prompt history with evidence of human validation and refinement.
8. All artifacts are committed iteratively to the public repository with a complete, reviewable structure.

---

*This strategy is derived from `requirement-analysis.md` and `application-exploration.md`. Scope and acceptance criteria details are maintained in those documents and are intentionally not duplicated here.*
