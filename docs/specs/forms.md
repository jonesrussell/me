# Forms & Newsletter Subsystem Specification

## File Map

| File | Purpose |
|------|---------|
| `src/lib/services/form-service.ts` | Singleton GoFormX API client with validation |
| `src/lib/config/env.ts` | Environment variable configuration for form endpoints |
| `src/lib/components/composables/useNewsletterForm.svelte.ts` | Svelte 5 composable for newsletter form state |
| `src/lib/components/newsletter/NewsletterForm.svelte` | Newsletter signup form component |
| `src/lib/components/newsletter/NewsletterCTA.svelte` | Call-to-action newsletter block |
| `src/lib/components/newsletter/NewsletterHeader.svelte` | Newsletter section header |
| `src/lib/components/newsletter/StatusMessages.svelte` | Form submission status display |
| `src/lib/components/newsletter/SubmitButton.svelte` | Styled submit button with loading state |
| `src/lib/components/forms/ContactForm.svelte` | Contact page form |
| `src/lib/types/newsletter.ts` | SubmitStatus type |
| `src/routes/contact/+page.svelte` | Contact page |

## Interface Signatures

### SubmitStatus (type)
```typescript
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';
```

### FormService (singleton)
```typescript
class FormService {
  static getInstance(): FormService;
  submitForm(formId: string, data: FormData): Promise<FormSubmissionResponse>;
  getFormSchema(formId: string): Promise<FormSchema>;
  validateField(field: string, value: string, rules: ValidationRule[]): string | null;
}
```

### Environment Config
```typescript
// src/lib/config/env.ts
VITE_GOFORMS_API_URL: string;          // GoFormX API endpoint
VITE_GOFORMS_API_KEY: string;          // API key
VITE_GOFORMS_CONTACT_FORM_ID: string;  // Contact form ID
VITE_GOFORMS_NEWSLETTER_FORM_ID: string; // Newsletter form ID
```

### useNewsletterForm composable
```typescript
// Returns reactive form state and handlers
export function useNewsletterForm(): {
  email: string;
  status: SubmitStatus;
  errorMessage: string;
  handleSubmit: (e: SubmitEvent) => Promise<void>;
  reset: () => void;
};
```

## Data Flow

### Current state
1. Contact page renders `ContactForm.svelte` with GoFormX integration
2. Home page CTA links to `/contact`
3. Newsletter surfaces render placeholder (GoFormX not yet wired)

### Data flow (GoFormX integrated)
1. User fills form → composable manages reactive state
2. On submit: `useNewsletterForm.handleSubmit()` called
3. Composable calls `FormService.getInstance().submitForm(formId, data)`
4. FormService sends POST to `VITE_GOFORMS_API_URL`
5. Response updates `status` to 'success' or 'error'
6. `StatusMessages.svelte` displays result

### Root layout integration
- `+layout.svelte` has a dedicated grid slot for newsletter CTA
- Will render `NewsletterCTA` when GoFormX newsletter integration is ready

## Configuration

- Environment variables set in `.github/workflows/deploy.yml` for production
- Variables prefixed with `VITE_` for client-side access
- `env.ts` provides typed access with defaults

## Edge Cases

- Missing env vars: FormService should gracefully handle missing API URL/key
- Double submission: composable should disable submit while `status === 'loading'`
- Email validation: client-side validation before API call
- API timeout: FormService should handle with appropriate error message
