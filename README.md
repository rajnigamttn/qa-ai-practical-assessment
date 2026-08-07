# QA AI Practical Assessment

## Project Overview

This repository contains the deliverables for the **QA AI Capability Exercise** based on the **PracticeSoftwareTesting Toolshop** application.

The assessment demonstrates an AI-assisted QA workflow covering the complete software testing lifecycle, including:

- Requirement Analysis
- Application Exploration
- Risk Assessment
- Test Strategy
- Automation Opportunity Analysis
- Manual UI Test Design
- Manual API Test Design
- Playwright UI Automation
- Playwright API Automation
- Execution Evidence
- AI Prompt History
- Documentation

The selected testing scope focuses on the **Checkout and Invoice Generation** workflow because it represents one of the highest-risk business journeys within the application and satisfies the assessment acceptance criteria for both UI and API testing.

---

## Project Information

| Item | Details |
|------|---------|
| Application | PracticeSoftwareTesting Toolshop |
| Framework | Playwright |
| Language | TypeScript |
| Design Pattern | Page Object Model (POM) |
| UI Automation | Playwright |
| API Automation | Playwright APIRequestContext |
| Reporting | Playwright HTML Report |
| AI Tools Used | ChatGPT, Cursor AI |

---

## Repository Structure

```text
qa-ai-practical-assessment/
├── FunctionalTestCase/
│   ├── UI-TestCases.csv
│   └── API-TestCases.csv
│
├── PrismStructure/
│   ├── pages/
│   ├── tests/
│   ├── utils/
│   ├── playwright.config.ts
│   └── ...
│
├── ExecutionEvidence/
│
├── ai-prompts/
│   ├── requirements-and-planning.md
│   ├── test-design.md
│   ├── automation-and-debugging.md
│   └── documentation-and-summary.md
│
├── requirement-analysis.md
├── application-exploration.md
├── test-strategy.md
├── automation-opportunities.md
├── project-info.md
└── README.md
```

---

## Prerequisites

- Node.js 20 or later
- npm
- Playwright

---

## Installation

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Running Tests

### UI Smoke Suite

```bash
npx playwright test tests/ui --grep @Smoke
```

### API Smoke Suite

```bash
npx playwright test tests/api --grep @Smoke
```

### API Regression Suite

```bash
npx playwright test tests/api --grep @Regression
```

### Run All Automated Tests

```bash
npx playwright test
```

---

## Reports

Generate the Playwright HTML execution report:

```bash
npx playwright show-report
```

Playwright reports are generated automatically after test execution.

Execution screenshots and browser captures are available under:

```text
ExecutionEvidence/
```

---

## Test Data Strategy

- Dynamic users are generated during execution to avoid test data conflicts.
- Billing data and reusable constants are maintained under:

```text
PrismStructure/utils/
```

- Test data is generated using reusable helper utilities to keep automation independent and repeatable.

---

## Manual Test Cases

The manual test suites are available under:

- `FunctionalTestCase/UI-TestCases.csv`
- `FunctionalTestCase/API-TestCases.csv`

These cover representative **Smoke** and **Regression** scenarios, including positive, negative, and edge-case testing.

---

## AI Prompt History

The complete AI-assisted workflow has been documented under:

- `ai-prompts/requirements-and-planning.md`
- `ai-prompts/test-design.md`
- `ai-prompts/automation-and-debugging.md`
- `ai-prompts/documentation-and-summary.md`

These files record the prompts, AI-generated responses, human validation, refinements, debugging activities, and implementation decisions throughout the assessment.

---

## Execution Evidence

The `ExecutionEvidence/` directory contains evidence collected during execution, including:

- UI automation execution screenshots
- API automation execution screenshots
- Browser execution screenshots
- Checkout and Invoice verification screenshots
- Playwright HTML report screenshots

This evidence demonstrates successful execution of the implemented manual and automated test suites.

---

## Notes

- The automation focuses on representative high-value scenarios rather than exhaustive application coverage.
- Checkout automation uses the **Cash on Delivery** payment method.
- Invoice generation requires clicking the **Confirm** button twice, matching the application's implementation.
- Dynamic users are created during execution to ensure repeatable and isolated test runs.
- AI was used to assist with requirement analysis, planning, test design, automation, debugging, and documentation.
- All AI-generated outputs were manually reviewed, validated, and refined before implementation.

---

## Author

**QA AI Practical Assessment**

AI-assisted QA workflow implemented using **ChatGPT** and **Cursor AI** following an iterative development approach with manual validation at every stage.