# Execution Evidence

## UI Smoke

Executed successfully.

Command:

npx playwright test tests/ui --grep @Smoke

Evidence:

- HTML report screenshots

---

## API Smoke

Executed successfully.

Command:

npx playwright test tests/api --grep @Smoke

Evidence:

- HTML report screenshot

---

## API Regression

Executed successfully.

Command:

npx playwright test tests/api --grep @Regression

Evidence:

- HTML report screenshot

---

Note:

Occasional instability was observed in the public PracticeSoftwareTesting environment (e.g., address auto-fill timing and invoice confirmation), which was documented during automation debugging and hence one UI smoke and API regression test is getting failed sometimes