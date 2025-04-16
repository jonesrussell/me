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
			errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
		}
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

	input {
		width: 100%;
		padding: 0;

		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		color: var(--text-color);

		background: transparent;
		border: none;
		flex: 1;
	}

	input:focus {
		outline: none;
	}

	input::placeholder {
		color: var(--text-muted);
		opacity: 0.5;
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
		transform: translateY(-0.25ch);
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

		<form class="form" onsubmit={handleSubmit}>
			<div class="form-group svelte-1ewipsr">
				<div class="input-wrapper svelte-1ewipsr">
					<span class="input-prefix svelte-1ewipsr">→</span>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="your.email@example.com"
						required
						bind:value={email}
					/>
				</div>
				<button type="submit" disabled={!email || submitStatus === 'loading'}>
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
				</button>
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
	</div>
</div>
