# GitHub Workflow Specification

## Repository

- **Repo**: `jonesrussell/me`
- **Primary branch**: `main`
- **Deployment**: GitHub Pages via `.github/workflows/deploy.yml`
- **Base path**: `/me` (set via `BASE_PATH` env var)

## Versioning Model

This is a personal website — no semantic versioning. Changes merge to `main` and auto-deploy.

## CI/CD Pipeline

1. Push/PR to `main` triggers `deploy.yml`
2. **Build job**: Node 20, `npm ci`, `npm run build` with `BASE_PATH=/me`
3. **Unit tests**: `npm run test:unit:run` (parallel with e2e)
4. **E2E tests**: Playwright with Chromium + WebKit (parallel with unit)
5. **Deploy**: Upload to GitHub Pages (main branch only)

## Workflow Rules

1. **All work begins with an issue** — ask for issue number before writing code; create one if missing
2. **Every issue belongs to a milestone** — unassigned issues are incomplete triage
3. **Milestones define the roadmap** — check active milestone before proposing work; don't invent new ones without discussion
4. **PRs must reference issues** — title format: `feat(#N): description`, `fix(#N): description`
5. **Read the drift report** — flag `bin/check-milestones` warnings before beginning work

## PR Title Conventions

| Prefix | Use when |
|--------|----------|
| `feat(#N):` | New feature |
| `fix(#N):` | Bug fix |
| `chore(#N):` | Dependencies, CI, tooling |
| `docs(#N):` | Documentation only |
| `refactor(#N):` | Code restructuring, no behavior change |
| `test(#N):` | Test additions or fixes |

## Branch Naming

- `feat/short-description`
- `fix/short-description`
- `chore/short-description`

## Current Milestones

Run `gh api repos/jonesrussell/me/milestones --jq '.[] | "\(.title) - \(.description) (\(.open_issues) open)"'` to get current list.

## Keeping This Spec Updated

When milestones change (created, closed, renamed), update the "Current Milestones" section above and the drift detection script if patterns change.
