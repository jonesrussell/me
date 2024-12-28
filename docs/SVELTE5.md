# Svelte 5 Patterns and Solutions

## Project Structure

### Directory Organization
```
src/
├── lib/            # Reusable, publishable code
│   ├── components/ # Reusable UI components
│   ├── utils/      # Utility functions
│   ├── rules/      # Rule-related logic
│   └── directives/ # Svelte directives
├── routes/         # SvelteKit routes (pages)
└── tests/         # Test files
```

### Component Organization

Components should be organized based on their reusability and scope:

✅ Place in `src/lib/components/`:
- Generic UI elements (Badge, Button, etc.)
- Components that could be published
- Components with no app-specific logic
- Components following Svelte 5 patterns

✅ Place in `src/routes/`:
- Page-specific components
- Layout components
- Components with app-specific logic
- Components that use app-specific services

### Import Aliases

Use the defined aliases to maintain clean imports:
```typescript
// ✅ Good
import Badge from '$components/Badge.svelte';
import { someUtil } from '$lib/utils/some-util';
import { someService } from '$services/some-service';

// ❌ Avoid
import Badge from '../../lib/components/Badge.svelte';
import { someUtil } from '../../../lib/utils/some-util';
```

## Props and Type Safety

### Basic Props with Type Safety

For components that need type-safe props with default values:

```svelte
<script lang="ts">
  type BadgeType = 'info' | 'success' | 'warning' | 'error';
  
  let { type = 'info' as const satisfies BadgeType } = $props();
</script>
```

The `as const satisfies BadgeType` pattern ensures:
- The default value is type-checked against the type
- The type is properly inferred for template usage
- TypeScript errors are caught at compile time

### Function Props for Content Rendering

When you need to pass content as a prop (replacing the old slot system):

```svelte
<script lang="ts">
  let { content = $bindable(() => null) } = $props();
</script>

<div>
  {@render content()}
</div>
```

This pattern:
- Replaces the deprecated `<slot>` syntax
- Provides type safety for the content function
- Allows for dynamic content rendering
- Works with TypeScript's type inference

## Common Gotchas and Solutions

### Multiple Props Declaration

❌ Don't declare props multiple times:
```svelte
let { prop1 } = $props();
let { prop2 } = $props(); // Error: Cannot use $props() more than once
```

✅ Instead, declare all props at once:
```svelte
let { prop1, prop2 } = $props();
```

### Type Safety with Default Values

❌ Avoid direct type assertions:
```svelte
let { type = 'info' as BadgeType } = $props(); // Less safe
```

✅ Use const assertion with satisfies:
```svelte
let { type = 'info' as const satisfies BadgeType } = $props(); // More type-safe
```

### Content Rendering

❌ Don't mix old and new syntax:
```svelte
<div>
  <slot /> <!-- Deprecated -->
  {@render content()} <!-- New syntax -->
</div>
```

✅ Use the new render syntax consistently:
```svelte
<div>
  {@render content()}
</div>
```

## Testing Considerations

When testing components with the new props system:

```typescript
import { render } from '@testing-library/svelte';
import Component from './Component.svelte';

test('renders with props', () => {
  const { getByText } = render(Component, {
    props: {
      type: 'success',
      content: () => 'Test Content'
    }
  });
  
  expect(getByText('Test Content')).toBeInTheDocument();
});
```

## Migration Tips

1. Replace all `<slot>` usage with `{@render content()}`
2. Convert props to use type-safe declarations
3. Use `$state` for internal state management
4. Update tests to handle the new props system
5. Remove any usage of `$$slots` or `$$props` 

## Testing Challenges

### Component Updates in Tests

In Svelte 5, the way we test reactive updates has changed. Here are the key differences:

❌ Old way (Svelte 4):
```typescript
const { component } = render(Badge);
component.$set({ type: 'success' }); // No longer works in Svelte 5
```

✅ New way (Svelte 5):
```typescript
const { rerender } = render(Badge);
await rerender({ type: 'success' }); // Use rerender instead
```

### Type Safety in Tests

When testing typed components, you need to be explicit about the component's props:

```typescript
// Define your prop types
type BadgeType = 'info' | 'success' | 'warning' | 'error';
type BadgeProps = { 
  type?: BadgeType;
  content?: () => unknown;
};

// Use them in tests
const { rerender } = render<SvelteComponent<BadgeProps>>(Badge);
```

### Testing Content Props

When testing components that use the new content prop system:

```typescript
test('renders content', () => {
  render(Badge, {
    props: {
      type: 'info',
      content: () => 'Test Content'
    }
  });
  
  expect(screen.getByText('Test Content')).toBeInTheDocument();
});
```

### Testing Gotchas

1. `$set` is no longer available - use `rerender` instead
2. Component types need to be explicitly defined for TypeScript
3. Content props are functions that need to be called in the template
4. State updates might require an `await tick()` to propagate 