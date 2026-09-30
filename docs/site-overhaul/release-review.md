# Site overhaul release review

September 30, 2026. This change implements roadmap #270 through a reviewable local candidate. It is not a deployment record. The contact publication/receipt gate and explicit release authorization remain open in #276 and #277.

## Review surfaces

- Production static preview: `http://127.0.0.1:4173/me/` (local workstation).
- Design contract: `C:/projects/me/SITE-DESIGN.md`.
- Content and retained-route contract: `docs/site-overhaul/content-and-routes.md`.
- Desktop/mobile screenshots: `C:/projects/me/release-evidence/`.
- Source branch: `feat/practice-overhaul`; exact candidate revision is the pull request head.
- Rollback source: `d70a5a89e39b000bad114f8febd04557e97d38ca`, the pre-overhaul main revision.

## Verification

Type checking and lint pass. All changed Svelte files passed the required Svelte MCP autofixer with no remaining issues or suggestions. All **162 unit tests** pass across 27 files. They cover accepted-response confirmation and recovery after a failed Writing fetch, in addition to the existing service/store/component tests. All **80 browser tests** pass across Chromium and WebKit; **10 production static checks** pass under `/me`.

Chromium and WebKit checks cover the shared shell, page content, current-route state, keyboard menu/Escape, skip link, 375px overflow, 200% CSS scaling, reduced motion, Resources filters, Writing pagination/empty/failure/retry, HTML sanitization, keyboard-focusable independently scrolling code blocks, and preserved series progress/code examples. WebKit uses explicit skip-link focus because its default Tab behavior differs from Chromium.

Automated axe checks use WCAG 2 A/AA and WCAG 2.1 AA tags across the ten primary routes, a published article and the PHP-FIG series. Form fixture checks include the exact proposed three-field schema. This is supporting accessibility evidence, not a claim of complete manual conformance.

Production checks use the generated static artifact mounted at `/me`, including the generated 404 SPA fallback for existing dynamic article routes. They verify canonical metadata, internal base paths, route loading, mobile/scale behavior, reduced motion, real published article and series rendering, and the 1200×630 PNG social preview. Source SVG is retained for reproducible export.

Measured WCAG contrast ratios:

| Pair | Ratio |
| --- | --- |
| Ink `#101218` on paper `#FAFBFF` | 18.10:1 |
| Blue `#2855FF` on paper | 5.30:1 |
| Light blue `#7295FF` on ink | 6.65:1 |
| Muted `#4E5668` on paper | 7.11:1 |
| White on blue button | 5.48:1 |

Resources and series use darker blue where tinted badges/controls require it. Code info/warning accents use dark colors on the light code background. Decorative art has no text or interaction.

The build retains the existing gray-matter `eval` warning. There are no reusable GoFormX credential markers in the browser artifact. Management credentials and operational scripts stay outside Git.

## Contact and release gate

GoFormX account and owner workspace were created through normal supported public registration/login. A scoped, expiring draft connection created one site and one draft. No form has been published and no successful real public submission is claimed.

Publish review: **`russell-site-contact`, schema version 1**, form ID `a6a76b48-51a6-4bd8-9da4-70c79fc8158c`. Required name (1–100), email (email format, ≤254), message (10–5,000). Additional properties rejected. Allowed origin: `https://jonesrussell.github.io`. Public collection endpoint: `https://api.goformx.com/v1/public/forms/gfpk_VwPg3JMmBt2RodLc1ZjJBMUK0yhgXRMf/submissions`.

After exact-form/version approval: obtain a separately deliberate publication grant, publish version 1, verify public schema and CORS headers, submit synthetic non-personal data, replay the same idempotency key, prove a single accepted receipt in the authorized account inbox, and only then configure the approved public key for the release. The preview without a key offers direct email; this does not authorize an email-only launch.

Mail notifications are deferred in the GoFormX production record. Inbox collection and mail delivery are separate capabilities. Newsletter signup is absent; #257 remains open.

After deployment approval: update the repository's public contact identifier, merge the reviewed candidate, wait for CI/Pages completion, verify live `/me` routes and the approved contact journey, then record the deployed revision, publication state, actual receipt and rollback reference. A failed synthetic check must be reported separately from the publication state.
