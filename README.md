# Kumkara Playwright

Playwright + TypeScript practice project for a Manual QA learning Automation QA/SDET. Tests are organized by business feature so the project stays easy to understand and maintain for one learner/developer.

## Learning goals

- Understand the relationship between a test spec and its Page Object Model (POM).
- Keep page locators and user interactions in `pages/`; keep scenario steps and expected results in feature specs.
- Add coverage feature by feature, based on behavior observed in the approved non-production application.
- Learn reliable assertions, test isolation, authentication setup, and debugging with Playwright reports and traces.

The current organization is by feature. Smoke and regression folders or execution tiers are not part of the current workflow. A test can be added or improved alongside the feature it covers without first classifying it into a tier.

## Current feature coverage

- **Group Life → Cozy My Motion → Participant Information**: search by Policy Holder and check for a matching result; search by Participant Name and check for a matching Participant/Product row.
- **Group Life → Product Setup → Package Setup**: check that the expected 10 Cozy package codes are displayed and each has Active status.

These tests depend on the current non-production UI and test records. Recheck the UI and approved test data when a locator or assertion fails; do not assume an old screenshot or note still matches the application.

## Project layout

```text
pages/
  SSOLoginPages.ts
  PortalDashboardPage.ts
  ParticipantInformation.ts
  ProductSetup.ts
tests/
  auth/
    auth.setup.ts
  group-life/
    cozy-mymotion/
      participant/
        checkParticipant.spec.ts
      product-setup/
        packageSetup.spec.ts
playwright.config.ts
playwright/.auth/                 # local authentication state; ignored by Git
```

Add a spec under the folder for the feature being automated. Keep locators and page actions in its POM. Keep the user journey and assertions in the spec so the expected behavior remains visible in the test.

## Environment and security

Run this project only from an approved device and network/VPN, against an explicitly confirmed non-production environment. Never use production.

Create `.env` from `.env.example` and populate it through the approved credential process. Do not paste or print `.env`, credentials, cookies, tokens, or authentication state. `.env` and `playwright/.auth/` are ignored by Git. Do not commit or share reports, traces, screenshots, or logs if they contain internal URLs, personal/company data, or authentication material.

Browser inspection and test flows should be read-only. Do not submit, save, create, edit, delete, approve, export, or otherwise change business data. Avoid opening real participant or policy records unless the task explicitly requires an approved test record and its scope is clear.

## Set up on a device

Clone the private repository using the company's approved GitHub access, then open a terminal in the cloned `Kumkara-Playwright` folder.

Install the locked dependencies and the browser configured by this checkout (currently Firefox):

```bash
npm ci
npx playwright install firefox
```

Create the local environment file:

macOS/Linux:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Fill `.env` only through the approved credential process. Do not commit it.

## Run and verify

Type-checking checks TypeScript only; it does not log in or prove that the current UI and locators work:

```bash
npm run typecheck
```

Run one feature spec from the repository root:

```bash
npx playwright test tests/group-life/cozy-mymotion/participant/checkParticipant.spec.ts --project=authenticated
npx playwright test tests/group-life/cozy-mymotion/product-setup/packageSetup.spec.ts --project=authenticated
```

The `authenticated` project depends on `setup`. Playwright runs `tests/auth/auth.setup.ts` first to create/refresh the local authentication state, then runs the selected feature spec. These runs require the approved VPN/network and a usable non-production SSO session. Do not share the generated auth state.

Run all currently available authenticated feature specs:

```bash
npx playwright test --project=authenticated
```

Open the local HTML report after a run:

```bash
npm run report
```

Treat the report and any trace or screenshot as potentially sensitive. Keep them local unless the company approves sharing and they have been sanitized.

## Git workflow across devices

Use one device at a time for this branch. Before switching devices, check the active branch and working tree, commit the intended changes, and push. On the next device, pull the same branch before continuing. Do not work concurrently on the same branch from the MacBook and Windows checkout.

Keep `.env`, `playwright/.auth/`, and sensitive test artifacts out of commits. Before committing, inspect the staged file list and staged diff; prefer adding the intended paths rather than staging unrelated work.
