# In Progress

- [ ] Modernize CSS Architecture (2025)

  - [x] Implement CSS Nesting in all components
    - [x] Resources page
    - [x] ResourceSection component
    - [ ] Apply to remaining components
  - [x] Add CSS Container Queries for responsive layouts
    - [x] Resources page container
    - [x] ResourceSection component
    - [ ] Apply to remaining components
  - [ ] Use `:has()` selector for complex state styling
    - [ ] Add for resource card hover states
    - [ ] Add for navigation active states
  - [ ] Implement CSS Cascade Layers
    - [ ] Define base layer
    - [ ] Define component layer
    - [ ] Define utility layer
  - [x] Use CSS Logical Properties for RTL support
    - [x] Add to resources layout
    - [ ] Apply to remaining components
  - [ ] Add CSS View Transitions for animations
    - [ ] Add page transitions
    - [ ] Add component transitions
  - [ ] Implement CSS Color Mixing for themes
    - [ ] Add color mixing utilities
    - [ ] Update theme system
  - [ ] Add CSS Subgrid for complex layouts
    - [ ] Apply to resource grid
    - [ ] Apply to project grid

- [ ] Svelte 5 Migration

  - [x] Convert components to use runes
    - [x] Badge component
    - [x] NewsletterCTA component
    - [ ] Convert remaining components
  - [x] Replace `let` with `$state`
    - [x] Badge component
    - [x] NewsletterCTA component
    - [ ] Convert remaining components
  - [ ] Use `$derived` for computed values
    - [ ] Add to form validation
    - [ ] Add to navigation state
  - [ ] Implement `$effect` for side effects
    - [ ] Add for analytics tracking
    - [ ] Add for local storage sync
  - [x] Add proper TypeScript types for props
    - [x] Badge component
    - [x] NewsletterCTA component
    - [ ] Add to remaining components
  - [x] Use `{@render}` instead of slots
    - [x] Badge component
    - [ ] Convert remaining components
  - [ ] Add proper error boundaries
    - [ ] Add to form submissions
    - [ ] Add to data fetching
  - [ ] Implement component lifecycle hooks
    - [ ] Add cleanup for event listeners
    - [ ] Add cleanup for subscriptions

- [ ] Performance Optimizations

  - [ ] Add `enhanced:img` for better image loading
  - [ ] Implement proper lazy loading
  - [ ] Use CSS `content-visibility`
  - [ ] Add proper caching strategies
  - [ ] Implement service worker
  - [ ] Add proper code splitting
  - [ ] Optimize bundle size
  - [ ] Add performance monitoring

- [ ] Testing Infrastructure

  - [x] Add Vitest configuration
  - [x] Set up Testing Library
  - [x] Add component test utilities
  - [ ] Implement test fixtures
    - [x] Navigation tests
    - [x] Form tests
    - [ ] Add remaining fixtures
  - [ ] Add accessibility testing
    - [x] Basic ARIA testing
    - [ ] Add axe-core tests
    - [ ] Add keyboard navigation tests
  - [ ] Set up E2E testing
  - [ ] Add performance testing
  - [x] Implement snapshot testing

- [ ] Accessibility Improvements

  - [ ] Add proper ARIA labels
    - [x] Form inputs
    - [x] Buttons
    - [ ] Navigation items
  - [ ] Implement keyboard navigation
    - [x] Form controls
    - [ ] Navigation menu
    - [ ] Modal dialogs
  - [ ] Add skip links
  - [ ] Test with screen readers
  - [x] Add focus management
    - [x] Form inputs
    - [x] Buttons
    - [ ] Navigation
  - [ ] Implement proper landmarks
  - [x] Add proper form validation
    - [x] Email validation
    - [x] Required fields
    - [x] Error messages
  - [ ] Test with assistive technologies

- [ ] Modern Features

  - [ ] Add interactive guides
    - [ ] Docker setup guide
    - [ ] Kubernetes deployment guide
    - [ ] CI/CD pipeline setup guide
  - [ ] Add blog post previews
  - [ ] Create projects showcase
  - [x] Add contact form
    - [x] Newsletter signup
    - [ ] General contact form
  - [x] Implement proper error handling
    - [x] Form submissions
    - [x] API responses
    - [ ] Network errors
  - [ ] Add analytics integration
  - [ ] Implement proper logging
  - [ ] Add monitoring

- [ ] Documentation

  - [ ] Add component documentation
    - [x] Badge component
    - [x] NewsletterCTA component
    - [ ] Document remaining components
  - [ ] Implement style guide
  - [ ] Add usage examples
  - [x] Create testing guidelines
    - [x] Component testing
    - [x] Form testing
    - [ ] Add remaining guidelines
  - [ ] Add accessibility guidelines
  - [ ] Document build process
  - [ ] Add deployment guide
  - [ ] Create contribution guide

- [ ] Security

  - [ ] Implement CSP headers
  - [ ] Add security headers
  - [ ] Implement proper CORS
  - [ ] Add rate limiting
  - [ ] Implement proper auth
  - [ ] Add security monitoring
  - [ ] Implement proper sanitization
  - [ ] Add security testing

- [ ] Development Experience

  - [x] Add proper linting
  - [x] Implement proper formatting
  - [ ] Add commit hooks
  - [ ] Set up CI/CD
  - [ ] Add proper debugging
  - [ ] Implement proper logging
  - [ ] Add development tools
  - [ ] Create development guide

- [ ] Code Cleanup
  - [x] Audit and remove unused components from `/src/lib/components/`
  - [ ] Remove unused CSS styles
  - [ ] Remove unused utility functions
  - [ ] Remove unused TypeScript types
