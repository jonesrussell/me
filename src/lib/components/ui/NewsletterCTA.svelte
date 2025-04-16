<script lang="ts">
	import ErrorBoundary from './ErrorBoundary.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Box from '$lib/components/ui/Box.svelte';

	let email = $state('');
	let isSubmitting = $state(false);
	let error = $state<string | null>(null);
	let success = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!email) return;

		isSubmitting = true;
		error = null;
		success = false;

		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});

			if (!response.ok) throw new Error('Failed to subscribe');

			email = '';
			success = true;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to subscribe';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<style>
	.newsletter-cta {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
	}

	.form-group {
		display: flex;
		gap: var(--space-2);
	}

	.status-message {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		margin-top: var(--space-2);
	}

	.status-success {
		color: var(--success-color);
	}

	.status-error {
		color: var(--error-color);
	}

	@media (max-width: 768px) {
		.form-group {
			flex-direction: column;
		}
	}
</style>

<Box width={40}>
	<div class="newsletter-cta">
		<h2>Subscribe to our newsletter</h2>
		<p>Get the latest updates and news delivered to your inbox.</p>
		<ErrorBoundary>
			<form class="form-group" onsubmit={handleSubmit} novalidate>
				<Input
					type="email"
					placeholder="your.email@example.com"
					bind:value={email}
					disabled={isSubmitting}
					required
				/>
				<Button type="submit" disabled={!email || isSubmitting}>
					{isSubmitting ? 'Loading' : 'Subscribe ⟶'}
				</Button>
			</form>
			{#if success}
				<p class="status-message status-success">Success! You've been subscribed.</p>
			{/if}
			{#if error}
				<p class="status-message status-error">{error}</p>
			{/if}
		</ErrorBoundary>
	</div>
</Box>
