<script lang="ts">
	import { onMount } from 'svelte';

	let email = $state('');
	let submitStatus = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (!email) return;

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
			errorMessage =
				error instanceof Error ? error.message : 'An unexpected error occurred';
		}
	}

	onMount(() => {
		const form = document.querySelector('form');
		if (form) {
			form.setAttribute('novalidate', '');
		}
	});
</script>

<div class="newsletter">
	<div class="newsletter-content">
		<div class="newsletter-header">
			<div class="header-title">
				<span class="bracket">[</span>
				<h3>Stay Updated</h3>
				<span class="bracket">]</span>
			</div>
			<p class="description">
				Get the latest updates on web development and tech insights.
			</p>
		</div>

		<form class="form" onsubmit={handleSubmit}>
			<div class="form-group">
				<div class="input-wrapper">
					<span class="input-prefix">→</span>
					<input
						type="email"
						id="email"
						name="email"
						bind:value={email}
						placeholder="your.email@example.com"
						required
					/>
				</div>
				<button type="submit" disabled={submitStatus === 'loading'}>
					{#if submitStatus === 'loading'}
						<div class="loading">
							<span>Subscribing</span>
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
				</button>
			</div>

			{#if submitStatus === 'success'}
				<div class="success-message">
					<span class="icon">✓</span> Successfully subscribed! Welcome aboard.
				</div>
			{/if}

			{#if submitStatus === 'error'}
				<div class="error-message">
					<span class="icon">✗</span>
					{errorMessage}
				</div>
			{/if}
		</form>
	</div>
</div>

<style>
	.newsletter {
		display: flex;
		justify-content: center;

		width: 100%;
		padding: var(--space-8);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-lg);

		background: var(--bg-darker);
		box-shadow: var(--shadow-lg);
	}

	.newsletter-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);

		width: 100%;
		max-width: 60ch;
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
		align-items: center;

		padding: var(--space-2) var(--space-4);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);

		background: var(--bg-color);

		transition: all var(--transition-duration) var(--transition-timing);
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

	input {
		flex: 1;

		width: 100%;
		padding: 0;
		border: none;

		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		color: var(--text-color);

		background: transparent;
	}

	input:focus {
		outline: none;
	}

	input::placeholder {
		color: var(--text-muted);
		opacity: 0.5;
	}

	button {
		cursor: pointer;

		padding: var(--space-4);
		border: var(--border-width) solid var(--accent-color);
		border-radius: var(--radius-md);

		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		color: var(--bg-darker);

		background: var(--accent-color);

		transition: all var(--transition-duration) var(--transition-timing);
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}

	button:hover:not(:disabled) {
		transform: translateY(-0.25ch);
		border-color: var(--accent-color-hover);
		background: var(--accent-color-hover);
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
		gap: var(--space-2);
		align-items: center;
		justify-content: center;

		padding: var(--space-4);
		border-radius: var(--radius-md);

		font-size: var(--font-size-sm);
	}

	.success-message {
		border: var(--border-width) solid var(--color-success);
		color: var(--color-success);
		background: var(--color-mix-light);
	}

	.error-message {
		border: var(--border-width) solid var(--color-error);
		color: var(--color-error);
		background: var(--color-mix-light);
	}

	@media (width >= calc(37.5 * var(--ch))) {
		.form-group {
			flex-direction: row;
			gap: var(--space-4);
		}

		button {
			min-width: 15ch;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.input-wrapper,
		button {
			transition: none;
		}

		.dot {
			animation: none;
		}
	}
</style>
