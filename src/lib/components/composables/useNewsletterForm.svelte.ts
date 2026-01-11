// lib/composables/useNewsletterForm.ts
import { tick } from 'svelte';
import { FormService } from '$lib/services/form-service';
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
	let submitStatus = $state<SubmitStatus>('idle');
	let errorMessage = $state('');
	let schemaError = $state(false);

	// Disable submit button while loading (browser handles email validation)
	const isSubmitDisabled = $derived(submitStatus === 'loading');

	// Form submission
	async function handleSubmit(event: Event) {
		event.preventDefault();

		submitStatus = 'loading';
		errorMessage = '';

		try {
			const formService = FormService.getInstance();
			const formId = config.formIds.newsletter;

			if (!formId) {
				throw new Error('Newsletter form ID is not configured');
			}

			await formService.submitForm(formId, { email });

			submitStatus = 'success';
			email = '';

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

		const result = await withErrorHandling(
			async () => {
				const formService = FormService.getInstance();
				const formId = config.formIds.newsletter;

				if (!formId) {
					throw new Error('Newsletter form ID is not configured');
				}

				return await formService.getSchema(formId);
			},
			{ component: 'NewsletterCTA', action: 'loadSchema' }
		);

		if (result) {
			// Schema loaded successfully
		} else {
			schemaError = true;
			// Schema loading failed - continuing without schema
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

	// Initialize
	$effect(() => {
		loadSchema();
	});

	return {
		// State
		email: {
			get value() { return email; },
			set value(v: string) { email = v; }
		},
		submitStatus: {
			get value() { return submitStatus; }
		},
		errorMessage: {
			get value() { return errorMessage; }
		},
		schemaError: {
			get value() { return schemaError; }
		},

		// Computed
		isSubmitDisabled: {
			get value() { return isSubmitDisabled; }
		},

		// Methods
		handleSubmit,
		handleRetry,
		handleEmailInput
	};
}
