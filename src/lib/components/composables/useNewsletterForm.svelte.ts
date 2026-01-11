// lib/composables/useNewsletterForm.ts
import { tick } from 'svelte';
import { FormService } from '$lib/services/form-service';
import { createError, logErrorDebounced, withErrorHandling } from '$lib/utils/error-handler';
import type { SubmitStatus } from '$lib/types/newsletter';

export type { SubmitStatus };

const FORM_IDS = {
	SUBMIT: '61af2a0f-5b54-476f-9bf6-c2ee6ce5b822',
	SCHEMA: '221ecaa5-c0c7-4e2a-a731-a7c78ddfa8bc'
} as const;

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

	// Validation
	const isEmailValid = $derived(
		email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : false
	);

	const isSubmitDisabled = $derived(submitStatus === 'loading' || !isEmailValid);

	function validateEmail(): boolean {
		if (!email) {
			errorMessage = 'Email is required';
			return false;
		}
		if (!isEmailValid) {
			errorMessage = 'Please enter a valid email address';
			return false;
		}
		errorMessage = '';
		return true;
	}

	// Form submission
	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (!validateEmail()) return;

		submitStatus = 'loading';
		errorMessage = '';

		try {
			const formService = FormService.getInstance();
			await formService.submitForm(FORM_IDS.SUBMIT, { email });

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
				return await formService.getSchema(FORM_IDS.SCHEMA);
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
