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
