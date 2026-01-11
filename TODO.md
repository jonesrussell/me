# TODO

Last reviewed: January 2026

## Performance Optimizations

- [ ] Add `enhanced:img` for better image loading
  - Note: Type declarations exist in `app.d.ts` but not implemented
- [ ] Implement proper lazy loading for images
- [ ] Use CSS `content-visibility` for performance
- [ ] Add proper caching strategies
  - Note: Blog service has basic caching, could be improved
- [ ] Implement service worker
- [ ] Add proper code splitting
  - Note: SvelteKit does automatic code splitting; verify if manual config needed
- [ ] Optimize bundle size
- [ ] Add performance monitoring

## Testing Infrastructure

- [ ] Implement test fixtures
- [ ] Add accessibility testing
  - [ ] Add axe-core tests
  - [ ] Add keyboard navigation tests
- [x] Set up E2E testing
  - ✅ Playwright tests exist and run in CI/CD
- [ ] Add performance testing

## Accessibility Improvements

- [ ] Add proper ARIA labels
  - [x] Navigation containers have `aria-label="Main navigation"` ✅
  - [ ] Review if individual navigation links need additional labels
- [ ] Implement keyboard navigation
  - [x] Navigation menu works with keyboard ✅
  - [ ] Verify modal dialogs (if/when implemented)
- [x] Add skip links
  - ✅ SkipToMain component exists and is used
- [ ] Test with screen readers
- [ ] Add focus management
  - [x] Navigation appears to work ✅
  - [ ] Add explicit focus management tests
- [ ] Implement proper landmarks
  - [x] `<main id="main">` and `<nav>` elements exist ✅
  - [ ] Review if additional landmarks needed
- [ ] Test with assistive technologies

## Modern Features

- [ ] Add analytics integration
  - Note: Comment in code suggests placeholder for analytics
- [ ] Implement proper logging
- [ ] Add monitoring

## Security

- [ ] Implement CSP headers
  - Note: For static sites, configure at hosting level (GitHub Pages)
- [ ] Add security headers
  - Note: For static sites, configure at hosting level (GitHub Pages)
- [ ] Implement proper CORS
  - ⚠️ Not relevant for static site - can remove
- [ ] Add rate limiting
  - ⚠️ Not relevant for static site - can remove
- [ ] Implement proper auth
  - ⚠️ Not relevant for static site - can remove
- [ ] Add security monitoring
  - ⚠️ Not relevant for static site - can remove
- [x] Implement proper sanitization
  - ✅ `sanitize-html` is used throughout
- [ ] Add security testing

## Development Experience

- [ ] Add commit hooks (husky/lint-staged)
- [x] Set up CI/CD
  - ✅ GitHub Actions workflow exists with build, unit tests, and E2E tests
- [ ] Add proper debugging
- [ ] Implement proper logging
  - Note: Duplicate of "Modern Features > Implement proper logging"
- [ ] Add development tools
- [x] Create development guide
  - ✅ CLAUDE.md and README.md exist with comprehensive documentation

## Notes

- Many security items (CORS, rate limiting, auth, security monitoring) are not relevant for a static site deployed to GitHub Pages
- Code splitting is handled automatically by SvelteKit
- Security headers and CSP should be configured at the hosting level (GitHub Pages) if needed
- Some accessibility improvements are already implemented (skip links, basic ARIA labels, landmarks)
- E2E testing is fully implemented with Playwright
