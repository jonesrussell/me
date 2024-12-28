# TODO

## Components Implementation

- [ ] Convert existing code blocks to use new Terminal component
- [ ] Create RuleViewer component for displaying cursor rules
  - [ ] Add cycling through different rule files
  - [ ] Add rule customization interface
  - [ ] Support rule file export
- [ ] Use Tree component for project structure visualization
- [ ] Implement Table component for structured data display
- [ ] Add Menu component for improved navigation

## Layout & Design

- [x] Convert all text content to use monospace font
- [x] Align all elements to character grid
- [ ] Implement ASCII art borders consistently
- [x] Add responsive character-based layouts

## Content Structure

- [ ] Organize documentation by topic
- [x] Create consistent file naming scheme:
  - Use kebab-case for file names (e.g., `my-component.svelte`)
  - Component files end with `.svelte`
  - Test files end with `.test.ts`
  - Utility files end with `.ts`
- [x] Standardize component folder structure:
  - `src/lib/components/` for reusable UI components
  - `src/routes/` for page-specific components
  - Component-specific utilities in same directory
  - Tests alongside components
- [ ] Add component documentation templates
- [ ] Create component showcase pages

## Features

- [x] Add rule file viewer/editor
- [ ] Implement rule file combination tool
- [ ] Add export functionality for custom rulesets
- [ ] Create interactive ASCII art editor
- [x] Add dark/light theme support for Terminal component

## Documentation

- [ ] Document component usage
- [ ] Add examples for each component
- [ ] Create style guide for ASCII art
- [ ] Document rule file format

## Technical Improvements

- [x] Add TypeScript types for rule files
- [x] Implement rule file parser
- [x] Add unit tests for components
- [x] Set up CI/CD for rule validation

## Build & Deploy

- [x] Optimize GitHub Actions workflow with caching
- [x] Configure ESLint for modern JavaScript features
- [ ] Add performance monitoring
- [ ] Implement automated accessibility testing
- [ ] Add bundle size monitoring

## Testing

- [x] Set up Playwright for integration tests
- [x] Configure Vitest for unit testing
- [ ] Add visual regression testing
- [ ] Implement end-to-end testing scenarios:
  - [ ] Test rule file editing workflow
  - [ ] Test theme switching
  - [ ] Test component interactions
  - [ ] Test responsive layouts
  - [ ] Test keyboard navigation
  - [ ] Test accessibility features
- [ ] Add test coverage reporting

## Separation of Concerns Improvements

### Services Layer
- [ ] Create dedicated service files for different domains:
  - [ ] Add userService for user-related operations
  - [ ] Add themeService for theme management
  - [ ] Add ruleService for rule processing
  - [ ] Add analyticsService for tracking
- [ ] Move business logic from components to services
- [ ] Add TypeScript interfaces for service contracts
- [ ] Implement service dependency injection pattern

### State Management
- [ ] Create `src/lib/stores` directory structure:
  - [ ] Add applicationStore for app-wide state
  - [ ] Add userStore for user preferences
  - [ ] Add themeStore for theme state
  - [ ] Add ruleStore for rule management
- [ ] Implement store factories for reusable state patterns
- [ ] Add store documentation and usage examples

### Component Organization
- [ ] Restructure components into subdirectories:
  - [ ] `src/lib/components/layout` for layout components
  - [ ] `src/lib/components/forms` for form elements
  - [ ] `src/lib/components/common` for shared components
  - [ ] `src/lib/components/terminal` for terminal-related components
- [ ] Extract complex component logic into composables
- [ ] Add component API documentation

### Type System
- [ ] Create `src/lib/types` directory:
  - [ ] Add domain-specific types
  - [ ] Add utility types
  - [ ] Add service interfaces
  - [ ] Add store types
- [ ] Implement strict type checking
- [ ] Add type documentation

### Utils & Helpers
- [ ] Create `src/lib/utils` directory:
  - [ ] Add pure utility functions
  - [ ] Add side-effect utilities
  - [ ] Add type guards
  - [ ] Add common formatters
- [ ] Add unit tests for utilities
- [ ] Document utility functions

### Constants
- [ ] Create `src/lib/constants` directory:
  - [ ] Add configuration constants
  - [ ] Add business constants
  - [ ] Add theme constants
  - [ ] Add validation constants
- [ ] Add constant documentation
- [ ] Implement constant type safety

### API Layer
- [ ] Create `src/lib/api` directory:
  - [ ] Add API client abstraction
  - [ ] Add request/response types
  - [ ] Add error handling
  - [ ] Add retry logic
- [ ] Implement API documentation
- [ ] Add API testing utilities
