# Project Information

## Project Summary

This repository contains the deliverables for the QA AI Capability Exercise using the PracticeSoftwareTesting Toolshop application.

The assessment focuses on the Checkout and Application Flow, covering the complete customer journey from user registration through invoice generation. The project demonstrates an AI-assisted QA workflow across requirement analysis, test planning, manual test design, Playwright UI and API automation, debugging, execution, documentation, and human validation.

Rather than attempting exhaustive application coverage, the project prioritizes representative high-value scenarios that satisfy the assessment acceptance criteria while demonstrating sound QA engineering practices.

---

## Primary AI Tool(s) Used

- ChatGPT (planning, documentation, test design, debugging guidance)
- Cursor AI (Playwright implementation, code assistance, iterative development)

---

## Application Under Test

**PracticeSoftwareTesting Toolshop**

Website:
https://practicesoftwaretesting.com/

API Documentation:
https://api.practicesoftwaretesting.com/api/documentation

Selected Scope:

- User Registration
- User Login
- Product Selection
- Cart Management
- Checkout
- Cash on Delivery
- Invoice Generation
- My Invoices
- Core Checkout APIs

The Checkout and Invoice Generation workflow was selected because it represents one of the highest-risk business journeys within the application and exercises both UI and API functionality.

---

## Assessment Timeline

The project was completed following an iterative development approach consisting of:

- Requirement Analysis
- Application Exploration
- Risk Assessment
- Test Strategy
- Automation Opportunity Analysis
- Manual Test Planning
- Manual Test Case Design
- Playwright Framework Setup
- UI Automation
- API Automation
- Debugging
- Execution Evidence
- Documentation
- Final Review

---

## Tools Used

| Category | Tool |
|----------|------|
| UI Automation | Playwright |
| API Automation | Playwright APIRequestContext |
| Language | TypeScript |
| Runtime | Node.js |
| Package Manager | npm |
| Version Control | Git & GitHub |
| AI Assistance | ChatGPT, Cursor AI |
| Reporting | Playwright HTML Report |

---

# Setup Summary

## 1. Project and System Context

Before generating any test artifacts, AI was provided with:

- The QA Practical Assessment guide
- Assessment email instructions
- Repository structure
- Selected application scope
- PracticeSoftwareTesting Toolshop website
- API documentation
- Assessment acceptance criteria

Providing sufficient project context allowed AI to generate responses aligned with the assessment objectives instead of generic testing outputs.

---

## 2. Requirement Analysis

AI assisted with:

- Breaking down assessment objectives
- Identifying functional scope
- Determining testing boundaries
- Highlighting business risks
- Organizing documentation

All generated content was manually reviewed, refined, and adjusted to ensure alignment with the assessment requirements.

---

## 3. Test Planning and Strategy

AI was used to help prepare:

- Test Strategy
- Risk Analysis
- Automation Opportunities
- Smoke vs Regression strategy
- Manual vs Automated testing approach
- Test prioritization

The generated strategy was manually validated against the selected application flow and assessment acceptance criteria before being finalized.

---

## 4. Manual Test Case Design

AI assisted in designing representative manual test suites for both UI and API.

The final manual test suites include:

- Smoke scenarios
- Regression scenarios
- Positive tests
- Negative tests
- Edge cases

Coverage was intentionally limited to representative business-critical scenarios in accordance with the assessment guidance rather than attempting exhaustive application testing.

---

## 5. Automation Design

AI assisted with designing the Playwright automation framework by recommending:

- Page Object Model architecture
- Folder organization
- Reusable utilities
- API helper classes
- Test data strategy
- Smoke and Regression organization
- Naming conventions

During implementation, all generated code was manually reviewed, refined, and integrated into the project.

---

## 6. Validation and Refinement of AI Output

AI-generated outputs were never accepted without review.

Each major deliverable underwent manual validation including:

- Requirement Analysis
- Application Exploration
- Test Strategy
- Automation Opportunities
- Manual Test Planning
- CSV Test Cases
- Playwright Automation
- Documentation

Where necessary, prompts were refined, outputs corrected, and implementation decisions adjusted based on actual application behaviour observed during testing.

---

## 7. Test Data Generation

AI assisted in generating reusable test data including:

- Dynamic user accounts
- Billing information
- API payloads
- Checkout data
- Invoice request bodies

Automation uses dynamically generated users to ensure repeatable execution without data conflicts.

---

## 8. Debugging with AI

AI was extensively used during automation debugging to analyze:

- Playwright execution failures
- Locator issues
- Disabled controls
- Checkout timing behaviour
- Invoice generation flow
- Payment confirmation workflow
- Application-specific implementation details

A significant example involved identifying that invoice generation required two separate confirmation actions, matching the application's implementation and assessment guidance.

Throughout debugging, AI suggestions were validated by manually reproducing issues within the application before applying code changes.

---

## 9. Responsible AI Usage

Only project-related information was shared with AI.

Sensitive information such as:

- Personal credentials
- Private repository details
- Confidential business information
- Organization-specific data

was intentionally excluded.

AI was treated as a productivity assistant rather than an authoritative source, with all outputs being manually verified before inclusion in the repository.

---

## 10. Reusing this Workflow in Real Projects

This AI-assisted workflow can be applied to production QA projects by:

- Accelerating requirement analysis
- Improving test planning
- Generating initial test scenarios
- Designing automation architecture
- Assisting with debugging
- Producing technical documentation

The workflow remains effective because human validation is incorporated throughout the testing lifecycle, ensuring engineering judgment is maintained while reducing repetitive effort.

---

# AI Workflow Summary

The project followed an iterative AI-assisted development process:

1. Understand requirements
2. Explore the application
3. Design the testing strategy
4. Identify automation opportunities
5. Plan manual testing
6. Generate manual test cases
7. Design Playwright framework
8. Implement UI automation
9. Implement API automation
10. Debug and refine automation
11. Execute tests
12. Collect execution evidence
13. Produce final documentation

Each stage included manual validation before proceeding to the next phase.

---

# Key Deliverables

The repository contains:

- Requirement Analysis
- Application Exploration
- Test Strategy
- Automation Opportunities
- Manual UI Test Cases
- Manual API Test Cases
- Playwright UI Automation
- Playwright API Automation
- Execution Evidence
- AI Prompt History
- README
- Project Information

---

# Reflection

This assessment demonstrated how AI can effectively support software testing when combined with QA engineering expertise.

AI significantly improved productivity during planning, documentation, test design, automation development, and debugging. However, successful delivery depended on continuous human validation, exploratory testing, application analysis, and engineering judgment.

The completed repository represents an AI-assisted QA workflow that emphasizes traceability, maintainability, responsible AI usage, and iterative refinement rather than relying on unreviewed AI-generated outputs.