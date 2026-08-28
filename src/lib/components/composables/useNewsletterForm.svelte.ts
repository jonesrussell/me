// lib/composables/useNewsletterForm.ts
import { tick } from 'svelte';
import { createIdempotencyKey, FormService } from '$lib/services/form-service';
import type { PublishedFormSchema } from '$lib/services/form-service';
import { config } from '$lib/config/env';
import { createError, logErrorDebounced, withErrorHandling } from '$lib/utils/error-handler';
import type { SubmitStatus } from '$lib/types/newsletter';

export type { SubmitStatus };

const TIMEOUTS = {
	SUCCESS_RESET: 3000,
	ERROR_RESET: 5000,
	RETRY_DELAY: 100
} as const;

export function useNewsletterForm() {
	// State
	let email = $state('');
	let consent = $state(false);
	let submitStatus = $state<SubmitStatus>('idle');
	let errorMessage = $state('');
	let schemaError = $state(false);
	let schemaResult = $state<PublishedFormSchema | null>(null);

	// Disable submit button while loading (browser handles email validation)
	const isSubmitDisabled = $derived(submitStatus === 'loading' || schemaResult === null);

	// Form submission
	async function handleSubmit(event: Event) {
		event.preventDefault();

		submitStatus = 'loading';
		errorMessage = '';

		try {
			if (!schemaResult) {
				throw new Error('Build-notes signup is not configured');
			}
			if (!consent) {
				submitStatus = 'error';
				errorMessage = 'Please confirm that you want to receive occasional build notes.';
				return;
			}

			const formService = FormService.getInstance();
			const publicKey = config.formPublicKeys.newsletter;

			if (!publicKey) {
				throw new Error('Newsletter form is not configured');
			}

			const noticeVersion = schemaResult.schema.properties.notice_version?.const;
			await formService.submitForm(
				publicKey,
				{
					email,
					consent,
					source: typeof window === 'undefined' ? '/me' : window.location.pathname,
					notice_version: String(noticeVersion)
				},
				createIdempotencyKey(),
				schemaResult.version
			);

			submitStatus = 'success';
			email = '';
			consent = false;

			await tick();
			setTimeout(() => {
				submitStatus = 'idle';
			}, TIMEOUTS.SUCCESS_RESET);
		} catch (error) {
			submitStatus = 'error';

			if (error instanceof TypeError && error.message.includes('fetch')) {
				errorMessage = 'Network error. Please check your connection and try again.';
			} else if (error instanceof Error) {
				errorMessage = error.message;
			} else {
				errorMessage = 'An unexpected error occurred. Please try again.';
			}

			const appError = createError('Newsletter subscription failed', error, {
				component: 'NewsletterCTA',
				action: 'submit'
			});
			logErrorDebounced(appError);

			setTimeout(() => {
				if (submitStatus === 'error') {
					submitStatus = 'idle';
				}
			}, TIMEOUTS.ERROR_RESET);
		}
	}

	// Schema loading
	async function loadSchema() {
		schemaError = false;
		schemaResult = null;

		const result = await withErrorHandling(
			async () => {
				const formService = FormService.getInstance();
				const publicKey = config.formPublicKeys.newsletter;

				if (!publicKey) {
					throw new Error('Newsletter form is not configured');
				}

				return await formService.getSchema(publicKey);
			},
			{ component: 'NewsletterCTA', action: 'loadSchema' }
		);

		if (result) {
			const required = result.schema.required ?? [];
			const emailDefinition = result.schema.properties.email;
			const consentDefinition = result.schema.properties.consent;
			const noticeDefinition = result.schema.properties.notice_version;
			const supportsSignup =
				required.includes('email') &&
				required.includes('consent') &&
				required.includes('source') &&
				required.includes('notice_version') &&
				emailDefinition?.format === 'email' &&
				consentDefinition?.const === true &&
				typeof noticeDefinition?.const === 'string';
			if (supportsSignup) schemaResult = result;
			else schemaError = true;
		} else {
			schemaError = true;
		}
	}

	function handleRetry() {
		loadSchema();
	}

	function handleEmailInput(value: string) {
		email = value;
		if (submitStatus === 'error') {
			submitStatus = 'idle';
			errorMessage = '';
		}
	}

	function handleConsentInput(value: boolean) {
		consent = value;
		if (submitStatus === 'error') {
			submitStatus = 'idle';
			errorMessage = '';
		}
	}

	$effect(() => {
		if (config.formPublicKeys.newsletter) {
			void loadSchema();
		} else {
			schemaError = true;
			schemaResult = null;
		}
	});

	return {
		// State
		email: {
			get value() {
				return email;
			},
			set value(v: string) {
				email = v;
			}
		},
		consent: {
			get value() {
				return consent;
			}
		},
		submitStatus: {
			get value() {
				return submitStatus;
			}
		},
		errorMessage: {
			get value() {
				return errorMessage;
			}
		},
		schemaError: {
			get value() {
				return schemaError;
			}
		},

		// Computed
		isSubmitDisabled: {
			get value() {
				return isSubmitDisabled;
			}
		},

		// Methods
		handleSubmit,
		handleRetry,
		handleEmailInput,
		handleConsentInput
	};
}
