# Kumkara Playwright Automation

Playwright and TypeScript project for learning and automating Kumkara in the
approved non-production environment. Tests are organized by business feature,
because one person develops and runs this project. Smoke and regression tiers
are not part of the current workflow.

## Current scope

- SSO authentication is handled by `tests/auth/auth.setup.ts`.
- The setup opens Kumkara and saves an authenticated browser state locally.
- Feature tests use Page Object Model classes in `pages/`.
- The current feature test covers Participant Information for Cozy My Motion:
  opening the page and searching by Policy Holder.

The UI and locators can change. Recheck them in the approved non-production
environment when a test starts failing; do not use production.

## Project structure

```text
pages/                                      Page Object Model classes
pages/SSOLoginPages.ts                      SSO login page
pages/PortalDashboardPage.ts                SSO portal dashboard
pages/ParticipantInformation.ts             Participant Information page
tests/auth/auth.setup.ts                    SSO setup and local storage state
tests/group-life/cozy-mymotion/              Cozy My Motion feature tests
playwright/.auth/                            Local auth state; ignored by Git
playwright.config.ts                         Playwright projects and settings
```

Add a new test under the folder for its feature. For example, tests for another
Group Life product should go in a sibling feature folder under
`tests/group-life/`. Keep page interactions in the relevant POM and scenario
steps plus expected results in the spec.

## Environment and security

Use the approved VPN/network and non-production environment. Never point tests
at production. Create `.env` from `.env.example` and fill in its values through
the approved credential process. `.env` and `playwright/.auth/` are ignored by
Git. Do not print or commit credentials, cookies, tokens, storage state,
sensitive traces, screenshots, or internal data.

## Install

Run these commands from the repository root:

```bash
npm install
npx playwright install firefox
```

macOS/Linux:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

## Run tests

Run the Cozy My Motion feature tests from the repository root:

```bash
npx playwright test tests/group-life/cozy-mymotion --project=authenticated
```

The `authenticated` project depends on `setup`, so Playwright runs the SSO
setup first and refreshes the local storage state. To run all currently
available feature tests:

```bash
npx playwright test --project=authenticated
```

Type-check without opening Kumkara:

```bash
npm run typecheck
```

Open the HTML report after a run:

```bash
npm run report
```

## Git workflow

Work on one device at a time. Commit and push before switching devices; pull
the branch on the next device before continuing. Do not work concurrently on
the same branch from the MacBook and Windows checkout. Check `git status` before
committing, and keep `.env`, `playwright/.auth/`, and sensitive test artifacts
out of commits.
