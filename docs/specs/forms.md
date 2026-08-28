# Forms & Newsletter Subsystem Specification

## File Map

| File                                                         | Purpose                                                              |
| ------------------------------------------------------------ | -------------------------------------------------------------------- |
| `src/lib/services/form-service.ts`                           | Public GoFormX v1 client with schema-version and idempotency support |
| `src/lib/config/env.ts`                                      | Environment variable configuration for form endpoints                |
| `src/lib/components/composables/useNewsletterForm.svelte.ts` | Svelte 5 composable for newsletter form state                        |
| `src/lib/components/newsletter/NewsletterForm.svelte`        | Newsletter signup form component                                     |
| `src/lib/components/newsletter/NewsletterCTA.svelte`         | Call-to-action newsletter block                                      |
| `src/lib/components/newsletter/NewsletterHeader.svelte`      | Newsletter section header                                            |
| `src/lib/components/newsletter/StatusMessages.svelte`        | Form submission status display                                       |
| `src/lib/components/newsletter/SubmitButton.svelte`          | Styled submit button with loading state                              |
| `src/lib/components/forms/ContactForm.svelte`                | Contact page form                                                    |
| `src/lib/types/newsletter.ts`                                | SubmitStatus type                                                    |
| `src/routes/contact/+page.svelte`                            | Contact page                                                         |

## Interface Signatures

### SubmitStatus (type)

```typescript
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';
```

### FormService (singleton)

```typescript
class FormService {
	static getInstance(): FormService;
	submitForm(
		publicKey: string,
		data: FormData,
		idempotencyKey: string,
		schemaVersion?: number
	): Promise<FormSubmissionResult>;
	getSchema(publicKey: string): Promise<PublishedFormSchema>;
}
```

### Environment Config

```typescript
// src/lib/config/env.ts
VITE_GOFORMS_API_URL: string; // GoFormX API endpoint
VITE_GOFORMS_CONTACT_PUBLIC_KEY: string; // Browser-safe published contact form key
VITE_GOFORMS_NEWSLETTER_PUBLIC_KEY: string; // Browser-safe published newsletter form key
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

1. Contact page fetches the published schema from `/v1/public/forms/{publicKey}/schema`
2. Home page CTA links to `/contact`
3. Newsletter surfaces render placeholder (GoFormX not yet wired)

### Data flow (GoFormX integrated)

1. User fills form → composable manages reactive state
2. On submit: `useNewsletterForm.handleSubmit()` called
3. Client pins the fetched schema version and creates an idempotency key for the payload
4. FormService sends `{ data }` to `/v1/public/forms/{publicKey}/submissions`
5. Response updates `status` to 'success' or 'error'
6. `StatusMessages.svelte` displays result

### Root layout integration

- `+layout.svelte` has a dedicated grid slot for newsletter CTA
- Will render `NewsletterCTA` when GoFormX newsletter integration is ready

## Configuration

- `GOFORMS_CONTACT_PUBLIC_KEY` and `GOFORMS_NEWSLETTER_PUBLIC_KEY` repository variables feed the corresponding `VITE_` values in `.github/workflows/deploy.yml`
- `.env.example` documents local development values
- Variables prefixed with `VITE_` for client-side access
- `env.ts` provides typed access with defaults
- Public keys are rotatable identifiers, not authorization credentials; allowed origins are enforced by GoFormX

## Edge Cases

- Missing public key: form shows a retryable unavailable state and direct email fallback
- Double submission: composable should disable submit while `status === 'loading'`
- Email validation: client-side validation before API call
- API timeout: FormService should handle with appropriate error message
- Non-JavaScript clients: contact form exposes a `mailto:` fallback; the JSON API has no native HTML form endpoint
