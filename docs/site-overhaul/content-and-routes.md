# Site content and route contract

Reviewed September 30, 2026. Implementation follows the approved ink, cool-white and electric-blue design in `C:/projects/me/SITE-DESIGN.md` and roadmap #270. Russell authorized implementation with “i want to you see this through” and GoFormX account setup with “you set it up”. Publication remains a separate gate in #276 and #277.

## Copy and evidence

The final reusable service and project copy lives in `src/lib/data/site.ts`; homepage, About and Contact copy lives in the corresponding route components. Services are proposed engagements with scope agreed before work begins, not fixed prices or guarantees. About describes the work and principles demonstrated by the three projects, without invented career history, clients or testimonials.

| Project | Evidence reviewed | Supported claim | Boundary |
| --- | --- | --- | --- |
| GoFormX | `C:/projects/GoFormX/product/PRODUCT-VISION.md`; `local-journey/RESULT.md` (September 29); `release-package/DEPLOYED-2026-09-30.md` | Assistant-managed forms and one human inbox; two-site local rehearsal; separately deployed HTTPS/auth/dashboard | Local rehearsal is not production first-use acceptance. Mail and notification delivery are unqualified. |
| Waaseyaa | `C:/dev/waaseyaa/framework/README.md` and support contracts, September 30 | Modular entity-first PHP 8.5/Symfony framework, API and Nuxt administration, local SQLite S1 profile | Builder journey and downstream S1 certification pending. No universal production-support claim. |
| North Cloud | Public `jonesrussell/north-cloud` README and pipeline documentation through GitHub API, September 30 | Go collection/classification/publishing services, Elasticsearch, Redis Pub/Sub, Vue operations UI | No customer adoption, uptime or quantified publishing claim. |

Project illustrations and flow diagrams are conceptual, labeled on detail pages. Source links point to the actual public projects. Writing uses the existing published article feed, dates, source links and series index. Test fixture titles are confined to tests. Newsletter capture is absent; delivery remains #257.

## Routes and metadata

| Route | Treatment |
| --- | --- |
| `/` | New homepage, real feed excerpt, service/work/about/contact links |
| `/services`, `/about` | New prerendered pages |
| `/projects` | Retained Work index |
| `/projects/goformx`, `/projects/waaseyaa`, `/projects/north-cloud` | New prerendered case studies |
| `/blog`, `/blog/[slug]` | Retained feed/pagination/article URLs and sanitized rendering; static host fallback |
| `/blog/series/[id]`, `/blog/series/psr` | Retained series and legacy redirect; progress and code examples preserved |
| `/resources` | Retained filters, cards and query parameters |
| `/contact` | Retained direct email and qualified public-schema client |
| `/sitemap.xml`, `/robots.txt`, `/404.html` | Retained supporting routes/fallback |

All production paths are rooted at `/me`. Metadata uses the absolute production origin, page-specific title/description and canonical path. The social image is shared. Header current-page state includes project/article descendants. Direct email is `russell@web.ca`; LinkedIn is `https://linkedin.com/in/jonesrussell42`.

## Contact scope

Account owner: Russell's user-supplied GoFormX account. Account creation used normal public registration/login. The account password, session and expiring scoped draft token are encrypted outside the repository and indexed in the local credential-location file.

Prepared draft: `russell-site-contact`, form ID `a6a76b48-51a6-4bd8-9da4-70c79fc8158c`, schema version **1**. Name: 1–100 characters; email: email format, maximum 254 characters; message (“What are you working on?”): 10–5,000 characters. All three are required; extra properties rejected. Production browser origin: `https://jonesrussell.github.io`. Public endpoint origin: `https://api.goformx.com`. No management credential enters the website.

Publication, synthetic submit/replay and authorized dashboard receipt remain pending. Receiving a submission in GoFormX does not prove email notification. The local preview without a configured key presents direct email; this is not approval to ship an email-only release.
