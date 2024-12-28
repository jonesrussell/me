# TODO

## High Priority (In Progress)

### Component System
- [ ] Convert existing code blocks to use new Terminal component
- [ ] Create RuleViewer component for displaying cursor rules
  - [ ] Add cycling through different rule files
  - [ ] Add rule customization interface
  - [ ] Support rule file export
- [ ] Implement Table component for structured data display
- [ ] Use Tree component for project structure visualization
- [ ] Add Menu component for improved navigation

### Core Architecture
- [ ] Create `src/lib/stores` for state management:
  - [ ] Add themeStore (priority for dark/light mode)
  - [ ] Add ruleStore (for rule management)
  - [ ] Add applicationStore (for app-wide state)
- [ ] Establish services layer in `src/lib/services`:
  - [ ] Add ruleService (priority for rule processing)
  - [ ] Add themeService (for theme management)
- [ ] Implement `src/lib/types` directory:
  - [ ] Add rule-related types (priority)
  - [ ] Add service interfaces
  - [ ] Add store types

### Documentation & Testing
- [ ] Document component usage (priority for new components)
- [ ] Add examples for each component
- [ ] Document rule file format
- [ ] Add visual regression testing
- [ ] Implement key end-to-end tests:
  - [ ] Test rule file editing workflow
  - [ ] Test theme switching
  - [ ] Test component interactions

### Svelte 5 Migration & Testing
- [ ] Remove `test-types.ts` and update testing approach:
  - [ ] Migrate to Svelte 5's new testing patterns
  - [ ] Use built-in types from @testing-library/svelte@5
  - [ ] Update existing tests to use new patterns
  - [ ] Add test examples to documentation
- [ ] Update component tests for Svelte 5:
  - [ ] Replace $set with rerender
  - [ ] Update state management tests
  - [ ] Add content prop testing examples
- [ ] Improve test organization:
  - [ ] Create test utils for common patterns
  - [ ] Add testing guidelines to docs
  - [ ] Set up proper test coverage reporting

## Completed Features ✅
- [x] Convert all text content to use monospace font
- [x] Align all elements to character grid
- [x] Add responsive character-based layouts
- [x] Create consistent file naming scheme
- [x] Standardize component folder structure
- [x] Add rule file viewer/editor
- [x] Add dark/light theme support for Terminal component
- [x] Add TypeScript types for rule files
- [x] Implement rule file parser
- [x] Add unit tests for components
- [x] Set up CI/CD for rule validation
- [x] Optimize GitHub Actions workflow with caching
- [x] Configure ESLint for modern JavaScript features
- [x] Set up Playwright for integration tests
- [x] Configure Vitest for unit testing

## Future Enhancements

### Component Improvements
- [ ] Implement ASCII art borders consistently
- [ ] Create interactive ASCII art editor
- [ ] Create component showcase pages
- [ ] Add component documentation templates
- [ ] Restructure components into subdirectories:
  - [ ] `layout/` for layout components
  - [ ] `forms/` for form elements
  - [ ] `common/` for shared components
  - [ ] `terminal/` for terminal-related components

### Architecture & Infrastructure
- [ ] Create `src/lib/utils` for shared utilities:
  - [ ] Add pure utility functions
  - [ ] Add type guards
  - [ ] Add common formatters
- [ ] Create `src/lib/constants`:
  - [ ] Add theme constants
  - [ ] Add validation constants
- [ ] Create `src/lib/api`:
  - [ ] Add API client abstraction
  - [ ] Add request/response types
- [ ] Implement store factories for reusable state patterns
- [ ] Extract complex component logic into composables

### Testing & Performance
- [ ] Add performance monitoring
- [ ] Implement automated accessibility testing
- [ ] Add bundle size monitoring
- [ ] Add test coverage reporting
- [ ] Test responsive layouts
- [ ] Test keyboard navigation
- [ ] Test accessibility features

### Documentation
- [ ] Create style guide for ASCII art
- [ ] Add API documentation
- [ ] Add store documentation and usage examples
- [ ] Add utility function documentation
- [ ] Add type documentation
