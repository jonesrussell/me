<script lang="ts">
	import FormField from '../content/FormField.svelte';
	import StatusMessages from './StatusMessages.svelte';
	import SubmitButton from './SubmitButton.svelte';
	import type { SubmitStatus } from '$lib/components/composables/useNewsletterForm.svelte';

	interface Props {
		email: string;
		submitStatus: SubmitStatus;
		errorMessage: string;
		isSubmitDisabled: boolean;
		onSubmit: (event: Event) => void;
		onEmailInput: (value: string) => void;
	}

	let { email, submitStatus, errorMessage, isSubmitDisabled, onSubmit, onEmailInput }: Props =
		$props();

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
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
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
			error={errorMessage}
			placeholder="your.email@example.com"
		/>

		<SubmitButton
			{submitStatus}
			disabled={isSubmitDisabled}
			ariaDescribedby={submitStatus === 'error' ? 'error-message' : undefined}
		/>
	</div>

	<StatusMessages {submitStatus} {errorMessage} />
</form>
