# Testing Guide

This document outlines our testing strategy and setup for ensuring code quality and reliability.

## Testing Stack

- **Unit Testing**: Vitest with @testing-library/svelte
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

### Component Tests

Component tests should follow these patterns:

```typescript
import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import MyComponent from './MyComponent.svelte';

describe('MyComponent', () => {
	describe('Rendering', () => {
		test('renders with default props', () => {
			const { container } = render(MyComponent);
			// Use container.querySelector for DOM queries
			// Use getBy* methods for accessibility-focused queries
		});
	});

	describe('State Management', () => {
		test('updates when props change', async () => {
			const { container, rerender } = render(MyComponent, {
				props: { initial: 'value' }
			});

			// Test initial state
			expect(container).toHaveTextContent('value');

			// Update props using rerender
			await rerender({ initial: 'new value' });
			expect(container).toHaveTextContent('new value');
		});
	});
});
```

### Key Testing Patterns

1. **Component Rendering**

   - Use `render` from @testing-library/svelte
   - Query elements using container.querySelector or testing-library queries
   - Check for presence, content, and attributes

2. **State Updates**

   - Use `rerender` for prop updates (replaces $set)
   - Test both initial state and after updates
   - Always await rerender calls

3. **Accessibility Testing**

   - Use role-based queries when possible
   - Test ARIA attributes
   - Verify proper semantic structure

4. **Event Handling**
   - Use fireEvent for triggering events
   - Test both event dispatch and handling
   - Verify state changes after events

### Utility Tests

For utility functions:

```typescript
import { describe, expect, test } from 'vitest';

describe('utility', () => {
	describe('specific function', () => {
		test('expected behavior', () => {
			// Arrange
			const input = 'test';

			// Act
			const result = utilityFunction(input);

			// Assert
			expect(result).toBe('expected');
		});
	});
});
```

## Best Practices

1. **Test Organization**

   - Co-locate tests with components
   - Use descriptive test names
   - Group related tests using describe blocks
   - Follow AAA pattern (Arrange, Act, Assert)

2. **Component Testing**

   - Test both default and custom props
   - Verify reactive updates
   - Check accessibility features
   - Test error states and edge cases

3. **Query Selection**

   - Prefer role-based queries (getByRole)
   - Use data-testid for complex queries
   - Avoid implementation details

4. **State Management**
   - Test initial state
   - Verify state updates
   - Check derived state
   - Test side effects

## Common Gotchas

1. **Svelte 5 Changes**

   - Use `rerender` instead of `$set`
   - Props are passed directly in render options
   - Content props are functions that need to be called
   - State updates might require `await tick()`

2. **Testing Library**

   - Queries throw when element not found
   - Use `queryBy*` for checking absence
   - Container queries don't throw

3. **Async Testing**
   - Always await state updates
   - Use `act` for complex interactions
   - Handle promises properly

## Future Improvements

- [ ] Add visual regression testing
- [ ] Implement end-to-end testing
- [ ] Add test coverage reporting
- [ ] Add performance testing
- [ ] Enhance accessibility testing
