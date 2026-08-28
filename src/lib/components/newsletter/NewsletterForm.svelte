<script lang="ts">
	import FormField from '../content/FormField.svelte';
	import StatusMessages from './StatusMessages.svelte';
	import SubmitButton from './SubmitButton.svelte';
	import type { SubmitStatus } from '$lib/components/composables/useNewsletterForm.svelte';

	interface Props {
		email: string;
		consent: boolean;
		submitStatus: SubmitStatus;
		errorMessage: string;
		isSubmitDisabled: boolean;
		onSubmit: (event: Event) => void;
		onEmailInput: (value: string) => void;
		onConsentInput: (value: boolean) => void;
	}

	let {
		email,
		consent,
		submitStatus,
		errorMessage,
		isSubmitDisabled,
		onSubmit,
		onEmailInput,
		onConsentInput
	}: Props = $props();
</script>

<style>
	.form {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.visually-hidden {
		position: absolute;
		width: 1ch;
		height: 0.0625rem;
		margin: -0.0625rem;
		padding: 0;
		border: 0;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.consent {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--space-3);
		align-items: start;
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
		cursor: pointer;
	}

	.consent input {
		width: 1.125rem;
		height: 1.125rem;
		margin-top: 0.2rem;
		accent-color: var(--accent-color);
	}
</style>

<form class="form" onsubmit={onSubmit}>
	<div class="form-group">
		<label for="field-email" class="visually-hidden">Email</label>
		<FormField
			label=""
			name="email"
			type="email"
			required
			value={email}
			onInput={onEmailInput}
			placeholder="your.email@example.com"
		/>

		<label class="consent" for="newsletter-consent">
			<input
				id="newsletter-consent"
				type="checkbox"
				required
				checked={consent}
				onchange={(event) => onConsentInput(event.currentTarget.checked)}
				aria-describedby="newsletter-consent-help"
			/>
			<span id="newsletter-consent-help">
				I agree to receive occasional build notes by email. I can unsubscribe at any time.
			</span>
		</label>

		<SubmitButton
			{submitStatus}
			disabled={isSubmitDisabled}
			ariaDescribedby={submitStatus === 'error' ? 'error-message' : undefined}
		/>
	</div>

	<StatusMessages {submitStatus} {errorMessage} />
</form>
