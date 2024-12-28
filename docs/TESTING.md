# Testing Guide

This document outlines our testing strategy and setup for ensuring code quality and reliability.

## Testing Stack

- **Unit Testing**: Vitest
- **Integration Testing**: Playwright
- **Type Checking**: TypeScript
- **Linting**: ESLint
- **Formatting**: Prettier

## Running Tests

```bash
# Run all tests
npm run test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run type checking
npm run check

# Run linting
npm run lint
```

## Test Structure

### Unit Tests

Unit tests are located alongside the code they test with a `.test.ts` extension:

```typescript
// Example unit test for grid utilities
import { expect, test } from 'vitest';
import { alignToGrid } from './grid';

test('alignToGrid rounds up to nearest character unit', () => {
  expect(alignToGrid(15.2)).toBe(16);
  expect(alignToGrid(15.8)).toBe(16);
});
```

### Integration Tests

Integration tests are located in the `tests` directory and use Playwright:

```typescript
// Example integration test
import { test, expect } from '@playwright/test';

test('navigation works correctly', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/projects"]');
  await expect(page).toHaveURL('/projects');
});
```

## Testing Guidelines

### Unit Tests

- Test each utility function
- Test component logic
- Mock external dependencies
- Keep tests focused and isolated
- Use descriptive test names

### Integration Tests

- Test user workflows
- Verify page navigation
- Test responsive layouts
- Check theme switching
- Verify component interactions

### Type Testing

- Ensure proper type definitions
- Test type inference
- Verify generic constraints
- Check interface implementations

## Continuous Integration

Tests run automatically on:
- Pull requests
- Pushes to main branch
- Deployment to production

The GitHub Actions workflow includes:
- Dependency caching
- Parallel test execution
- Test result reporting
- Coverage reporting (coming soon)

## Writing Good Tests

1. **Arrange**: Set up test conditions
2. **Act**: Perform the action
3. **Assert**: Verify the results

Example:
```typescript
test('newsletter subscription works', async () => {
  // Arrange
  const { getByRole } = render(NewsletterCTA);
  const input = getByRole('textbox');
  const button = getByRole('button');

  // Act
  await fireEvent.input(input, { target: { value: 'test@example.com' } });
  await fireEvent.click(button);

  // Assert
  expect(getByText('Thanks for subscribing!')).toBeInTheDocument();
});
```

## Test Coverage

We aim for high test coverage but prioritize meaningful tests over coverage numbers. Focus areas:

- Critical business logic
- User interactions
- Edge cases
- Error handling
- Responsive behavior

## Debugging Tests

### Unit Tests

```bash
# Run tests in watch mode
npm run test:unit -- --watch

# Debug specific test
npm run test:unit -- --grep "test name"
```

### Integration Tests

```bash
# Run with debug mode
npm run test:integration -- --debug

# Show browser
npm run test:integration -- --headed
```

## Future Improvements

- [ ] Add visual regression testing
- [ ] Implement end-to-end testing
- [ ] Add test coverage reporting
- [ ] Add performance testing
- [ ] Implement accessibility testing 