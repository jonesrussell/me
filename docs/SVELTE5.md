# Svelte 5 Patterns and Solutions

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