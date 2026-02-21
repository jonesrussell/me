<script lang="ts">
	import { FormService } from '$lib/services/form-service';
	import { config } from '$lib/config/env';

	type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

	let state = $state<SubmitState>('idle');
	let errorMessage = $state('');
	let fieldErrors = $state<Record<string, string>>({});

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let referral = $state('');

	const referralOptions = [
		{ value: 'github', label: 'GitHub' },
		{ value: 'linkedin', label: 'LinkedIn' },
		{ value: 'devto', label: 'Dev.to' },
		{ value: 'search', label: 'Search engine' },
		{ value: 'referral', label: 'Referral' },
		{ value: 'other', label: 'Other' },
	];

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		state = 'submitting';
		errorMessage = '';
		fieldErrors = {};

		try {
			const service = FormService.getInstance();
			await service.submitForm(config.formIds.contact, {
				name,
				email,
				subject,
				message,
				...(referral ? { referral } : {}),
			});
			state = 'success';
		} catch (err) {
			state = 'error';
			errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
		}
	}
</script>

{#if state === 'success'}
	<div class="success-message" role="status">
		<p class="success-heading">// message transmitted</p>
		<p class="success-body">Thanks for reaching out! I'll get back to you soon.</p>
	</div>
{:else}
	<form class="contact-form" onsubmit={handleSubmit} novalidate>
		<div class="form-group">
			<label class="form-label" for="cf-name">Name</label>
			<input
				id="cf-name"
				class="form-input"
				type="text"
				bind:value={name}
				placeholder="Your name"
				required
				disabled={state === 'submitting'}
			/>
			{#if fieldErrors.name}<span class="form-error">{fieldErrors.name}</span>{/if}
		</div>

		<div class="form-group">
			<label class="form-label" for="cf-email">Email</label>
			<input
				id="cf-email"
				class="form-input"
				type="email"
				bind:value={email}
				placeholder="your@email.com"
				required
				disabled={state === 'submitting'}
			/>
			{#if fieldErrors.email}<span class="form-error">{fieldErrors.email}</span>{/if}
		</div>

		<div class="form-group">
			<label class="form-label" for="cf-subject">Subject</label>
			<input
				id="cf-subject"
				class="form-input"
				type="text"
				bind:value={subject}
				placeholder="What is this about?"
				required
				disabled={state === 'submitting'}
			/>
			{#if fieldErrors.subject}<span class="form-error">{fieldErrors.subject}</span>{/if}
		</div>

		<div class="form-group">
			<label class="form-label" for="cf-message">Message</label>
			<textarea
				id="cf-message"
				class="form-textarea"
				bind:value={message}
				placeholder="Your message..."
				rows="5"
				required
				minlength="10"
				disabled={state === 'submitting'}
			></textarea>
			{#if fieldErrors.message}<span class="form-error">{fieldErrors.message}</span>{/if}
		</div>

		<div class="form-group">
			<label class="form-label" for="cf-referral">How did you find me? <span class="optional">(optional)</span></label>
			<select
				id="cf-referral"
				class="form-select"
				bind:value={referral}
				disabled={state === 'submitting'}
			>
				<option value="">Select one</option>
				{#each referralOptions as opt}
					<option value={opt.value}>{opt.label}</option>
				{/each}
			</select>
		</div>

		{#if state === 'error'}
			<p class="form-error submit-error" role="alert">{errorMessage}</p>
		{/if}

		<button type="submit" class="form-submit" disabled={state === 'submitting'}>
			{state === 'submitting' ? '// transmitting...' : '// send_message()'}
		</button>
	</form>
{/if}

<style>
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.optional {
		font-size: var(--font-size-xs, 0.75rem);
		color: var(--text-muted);
		font-weight: var(--font-weight-normal);
	}

	.submit-error {
		margin: 0;
	}

	.success-message {
		padding: var(--space-6);
		font-family: var(--font-mono);
		background: var(--color-mix-faint);
		border: 1px solid var(--accent-color);
		border-radius: var(--radius-md);
	}

	.success-heading {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		color: var(--accent-color);
	}

	.success-body {
		margin: 0;
		font-size: var(--font-size-base);
		color: var(--text-muted);
	}
</style>
