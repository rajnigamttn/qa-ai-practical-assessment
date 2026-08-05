# Requirements & Planning AI Prompt History

-------------------------------------------------
## Task 1 – Repository Planning

### Objective
Create the initial repository structure based on the assessment requirements.

### Prompt Summary
Used AI to analyze the assessment document and recommend a repository structure aligned with the required deliverables.

### Human Validation
- Verified the structure against the assessment document.
- Decided not to publish the internal PRISM framework.
- Chose to create a clean Playwright project within the `PrismStructure` folder.

### Outcome
Repository scaffold created and committed to GitHub.
-------------------------------------------------

## Task 2 – Requirement Analysis (Initial Draft)

### Objective
Understand the assessment requirements and define the testing scope.

### Prompt Summary
Generated a structured requirement analysis using the assessment document and the selected application scope.

### Human Validation
- Verified alignment with the assessment document.
- Confirmed the scope focuses on the checkout and application flow.
- Removed unsupported assumptions.
- Finalized manual and automation scope.

### Outcome
Requirement Analysis document completed and committed.
-------------------------------------------------

## Task 3 – Requirement Analysis Refinement

### Objective
Review and improve the initial AI-generated Requirement Analysis so that it accurately reflects the assessment requirements, project scope, and an AI-assisted QA engineering workflow.

### Context Provided to AI
- Initial Requirement Analysis generated during project planning.
- QA Practical Assessment document.
- Repository structure and planned deliverables.
- Human review feedback identifying generic wording, unnecessary assumptions, and opportunities to better demonstrate engineering decisions and responsible AI usage.

### Refinement Prompt Summary
Requested AI to enhance the existing document instead of rewriting it from scratch by:
- Rewriting the assessment objective to focus on the engineering purpose of the repository.
- Adding a concise description of the PracticeSoftwareTesting Toolshop application and explaining why the Checkout & Application Flow was selected.
- Simplifying the project scope to focus on testing activities.
- Replacing generic testing objectives with objectives specific to the selected application.
- Refining manual and automation scope to describe representative coverage instead of committing to a fixed number of tests.
- Introducing an Engineering Decisions section documenting implementation choices.
- Adding an additional project risk and mitigation.
- Updating success criteria to describe execution evidence rather than guaranteeing all tests will pass.
- Preserving the existing document structure and avoiding unsupported assumptions.

### AI Output Review
The revised document was manually reviewed to verify:
- Alignment with the assessment objectives.
- Consistency with the selected project scope.
- Accuracy of technical statements.
- Clear distinction between engineering decisions and assessment requirements.
- Professional documentation quality.

### Human Validation
The following improvements were accepted after review:
- More project-specific language replacing generic AI-generated content.
- Clear engineering rationale for automation and repository decisions.
- Better alignment between scope, objectives, and planned deliverables.
- Improved documentation of responsible AI usage and validation practices.
- More realistic success criteria and risk assessment.

### Outcome
The Requirement Analysis document was finalized after iterative refinement and human validation. The approved version serves as the baseline reference for test strategy, manual testing, API testing, automation, and subsequent assessment artifacts.
-------------------------------------------------

## Task 4 – Application Exploration

### Objective
Understand the application and identify the business flow before designing the test strategy.

### Context Provided to AI
The finalized Requirement Analysis and the selected Checkout & Application Flow.

### Human Activities
- Explored the Toolshop application manually.
- Identified the primary user journey.
- Reviewed API documentation relevant to the selected scope.
- Captured observations and screenshots.

### AI Usage
AI was used only to guide the exploration process. The observations were validated manually.

### Outcome
The application understanding was documented and used as the basis for the Test Strategy.
-------------------------------------------------
## Task 5 – Refinement of Application Exploration

### Why refinement was needed
The initial AI-generated document contained a few assumptions (such as implying API execution) and lacked explicit business flow, risk observations, and automation considerations.

### Refinement prompt
Documented review comments were provided to the AI to improve accuracy, traceability, and alignment with the assessment scope while avoiding unsupported claims.

### Validation performed
- Verified that unsupported execution claims were removed.
- Confirmed references only included sources actually used.
- Checked that new sections improved traceability from exploration to testing and automation.
- Reviewed the document for consistency with the finalized Requirement Analysis.

### Outcome
The refined document more accurately reflects the actual exploration process and provides a stronger foundation for the Test Strategy and subsequent testing artifacts.
-------------------------------------------------
