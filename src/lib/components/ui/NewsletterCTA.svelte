<script lang="ts">
	import ErrorBoundary from './ErrorBoundary.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Box from '$lib/components/ui/Box.svelte';

	let email = $state('');
	let submitStatus = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!email) return;

		submitStatus = 'loading';
		errorMessage = '';

		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});

			if (!response.ok) {
				throw new Error('Failed to subscribe');
			}

			submitStatus = 'success';
			email = '';
		} catch (error) {
			submitStatus = 'error';
			errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
		}
	}
</script>

<style>
	.newsletter {
		display: flex;
		width: 100%;
		padding: var(--space-8);
		background: var(--color-mix-light);
		flex-direction: column;
		gap: var(--ch2);
		align-items: center;
	}

	.newsletter-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		width: 100%;
		max-width: 60ch;
		margin: 0 auto;
	}

	.newsletter-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		text-align: center;
	}

	.header-title {
		display: flex;
		gap: var(--space-2);
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-lg);
	}

	.bracket {
		font-weight: var(--font-weight-bold);
		color: var(--accent-color);
	}

	h3 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-base);
		color: var(--text-color);
	}

	.description {
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.input-wrapper {
		display: flex;
		padding: var(--space-2) var(--space-4);
		background: var(--bg-color);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		align-items: center;
	}

	.input-wrapper:focus-within {
		border-color: var(--accent-color);
		box-shadow: 0 0 0 var(--space-1) var(--accent-color-transparent);
	}

	.input-prefix {
		margin-right: var(--space-2);
		font-weight: var(--font-weight-bold);
		color: var(--accent-color);
	}

	.button-content {
		display: flex;
		gap: var(--space-4);
		align-items: center;
		justify-content: center;
	}

	.button-icon {
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
	}

	.loading {
		display: flex;
		gap: var(--space-2);
		align-items: center;
		justify-content: center;
	}

	.dots {
		display: flex;
		gap: var(--space-1);
	}

	.dot {
		opacity: 0.3;
		animation: pulse 1.4s infinite;
	}

	.dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes pulse {
		50% {
			opacity: 1;
		}
	}

	.success-message,
	.error-message {
		display: flex;
		padding: var(--space-4);
		font-size: var(--font-size-sm);
		border-radius: var(--radius-md);
		gap: var(--space-2);
		align-items: center;
		justify-content: center;
	}

	.success-message {
		color: var(--color-success);
		background: var(--color-mix-light);
		border: var(--border-width) solid var(--color-success);
	}

	.error-message {
		color: var(--color-error);
		background: var(--color-mix-light);
		border: var(--border-width) solid var(--color-error);
	}

	@media (width >= calc(37.5 * var(--ch))) {
		.form-group {
			flex-direction: row;
			gap: var(--space-4);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.input-wrapper {
			transition: none;
		}

		.dot {
			animation: none;
		}
	}
</style>

<Box width={40}>
	<div class="newsletter">
		<div class="newsletter-content">
			<div class="newsletter-header">
				<div class="header-title">
					<span class="bracket">[</span>
					<h3>Stay Updated</h3>
					<span class="bracket">]</span>
				</div>
				<p class="description">Get the latest updates on web development and tech insights.</p>
			</div>

			<ErrorBoundary>
				<form class="form" onsubmit={handleSubmit} novalidate>
					<div class="form-group">
						<div class="input-wrapper">
							<span class="input-prefix">→</span>
							<Input
								type="email"
								placeholder="your.email@example.com"
								required
								bind:value={email}
								disabled={submitStatus === 'loading'}
							/>
						</div>
						<Button type="submit" disabled={!email || submitStatus === 'loading'}>
							{#if submitStatus === 'loading'}
								<div class="loading">
									<span>Loading</span>
									<span class="dots">
										<span class="dot">.</span>
										<span class="dot">.</span>
										<span class="dot">.</span>
									</span>
								</div>
							{:else}
								<span class="button-content">
									<span class="button-text">Subscribe</span>
									<span class="button-icon">⟶</span>
								</span>
							{/if}
						</Button>
					</div>

					{#if submitStatus === 'success'}
						<div class="success-message">
							<span class="icon">✓</span> Message sent successfully
						</div>
					{/if}

					{#if submitStatus === 'error'}
						<div class="error-message">
							<span class="icon">✗</span>
							{errorMessage}
						</div>
					{/if}
				</form>
			</ErrorBoundary>
		</div>
	</div>
</Box>
