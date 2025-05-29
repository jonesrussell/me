<script lang="ts">
	import { onMount } from 'svelte';
	import FormField from './FormField.svelte';

	let email = $state('');
	let submitStatus = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let errorMessage = $state('');
	let boundaryError = $state<unknown>(null);
	let resetBoundary = $state<(() => void) | null>(null);

	const { class: className = '' } = $props<{
		class?: string;
	}>();

	const validateEmail = $derived(() => {
		if (!email) {
			errorMessage = 'Email is required';
			return false;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errorMessage = 'Please enter a valid email address';
			return false;
		}
		errorMessage = '';
		return true;
	});

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (!validateEmail) return;

		submitStatus = 'loading';

		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
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

	function handleBoundaryError(error: unknown, reset: () => void) {
		boundaryError = error;
		resetBoundary = reset;
		console.error('Newsletter form error:', error);
	}

	onMount(() => {
		const form = document.querySelector('form');
		if (form) {
			form.setAttribute('novalidate', '');
		}
	});
</script>

<style>
	.newsletter {
		display: flex;
		position: relative;
		width: 100%;
		padding: var(--space-16);
		background: var(--color-mix-light);
		flex-direction: column;
		gap: var(--space-4);
		align-items: center;
		overflow: hidden;
	}

	.newsletter-content {
		display: flex;
		position: relative;
		width: 100%;
		margin: 0 auto;
		z-index: 1;
		flex-direction: column;
		gap: var(--space-4);
		max-width: 60rem;
	}

	.newsletter-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
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
		font-size: var(--font-size-2);
		color: var(--color-text-2);
		max-width: 65rem;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	@media (--container-sm) {
		.newsletter {
			padding: var(--space-8);
		}
	}

	@media (--container-lg) {
		.newsletter {
			padding: var(--space-12);
		}

		h3 {
			font-size: var(--font-size-4);
		}
	}

	.newsletter::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, var(--accent-color) 0%, transparent 70%);
		opacity: 0.08;
		z-index: 0;
		animation: pulse 4s ease-in-out infinite;
	}

	.newsletter::after {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, var(--accent-color) 0%, transparent 70%);
		opacity: 0.05;
		z-index: 0;
		animation: pulse 4s ease-in-out infinite;
		animation-delay: 2s;
	}

	@keyframes pulse {
		0% {
			opacity: 0.05;
			transform: scale(0.8);
		}

		50% {
			opacity: 0.1;
			transform: scale(1.4);
		}

		100% {
			opacity: 0.05;
			transform: scale(0.8);
		}
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

	button {
		padding: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		color: var(--bg-darker);
		background: var(--accent-color);
		border: var(--border-width) solid var(--accent-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		cursor: pointer;
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}

	button:hover:not(:disabled) {
		background: var(--accent-color-hover);
		transform: translateY(-0.25rem);
		border-color: var(--accent-color-hover);
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
		0% {
			opacity: 0.05;
			transform: scale(1);
		}

		50% {
			opacity: 0.1;
			transform: scale(1.02);
		}

		100% {
			opacity: 0.05;
			transform: scale(1);
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

	@media (prefers-reduced-motion: reduce) {
		.newsletter::before {
			animation: none;
		}
	}

	.newsletter-content-contained {
		max-width: var(--measure);
		margin-inline: auto;
		padding-inline: var(--space-4);
	}

	.newsletter-inner {
		max-width: var(--container-sm);
		margin-inline: auto;
		width: 100%;
	}
</style>

<div class={className}>
	<div class="newsletter">
		<div class="newsletter-content newsletter-content-contained">
			<div class="newsletter-header newsletter-inner">
				<div class="header-title">
					<span class="bracket">[</span>
					<h3>Stay Updated</h3>
					<span class="bracket">]</span>
				</div>
				<p class="description">
					Subscribe to my newsletter for updates on web development, tech insights, and open source
					projects.
				</p>
			</div>

			<svelte:boundary onerror={handleBoundaryError}>
				<form class="form newsletter-inner" onsubmit={handleSubmit}>
					<div class="form-group">
						<label for="field-email" class="visually-hidden">Email</label>
						<FormField
							label=""
							name="email"
							type="email"
							required
							value={email}
							onInput={(value) => (email = value)}
							error={errorMessage}
							placeholder="your.email@example.com"
						/>
						<button type="submit" disabled={submitStatus === 'loading'}>
							{#if submitStatus === 'loading'}
								<div class="loading">
									<span>Subscribing</span>
									<div class="dots">
										<span class="dot">.</span>
										<span class="dot">.</span>
										<span class="dot">.</span>
									</div>
								</div>
							{:else}
								<div class="button-content">
									<span>Subscribe</span>
									<span class="button-icon">→</span>
								</div>
							{/if}
						</button>
					</div>

					{#if submitStatus === 'success'}
						<div class="success-message">
							<span>✓</span>
							<span>Thanks for subscribing!</span>
						</div>
					{:else if submitStatus === 'error'}
						<div class="error-message">
							<span>✕</span>
							<span>{errorMessage}</span>
						</div>
					{/if}
				</form>
			</svelte:boundary>

			{#if boundaryError}
				<div class="error-message">
					<span>✕</span>
					<span
						>An unexpected error occurred. {#if resetBoundary}<button onclick={resetBoundary}
								>Try again</button
							>{/if}</span
					>
				</div>
			{/if}
		</div>
	</div>
</div>
