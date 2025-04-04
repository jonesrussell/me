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
							<span class="dots">...</span>
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
		padding: var(--ch4);
		border: calc(1 * var(--ch) / 8) solid var(--border-color);
		border-radius: var(--radius-lg);
		background: var(--bg-darker);
		box-shadow: 0 var(--ch) var(--ch2)
			color-mix(in srgb, var(--text-color) 5%, transparent);
	}

	.newsletter-content {
		display: flex;
		flex-direction: column;
		gap: var(--ch3);
		width: 100%;
		max-width: 60ch;
	}

	.newsletter-header {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		text-align: center;
	}

	.header-title {
		display: flex;
		gap: var(--ch);
		justify-content: center;
		align-items: center;
		font-size: var(--font-size-lg);
	}

	.bracket {
		color: var(--accent-color);
		font-weight: var(--font-weight-bold);
	}

	h3 {
		margin: 0;
		color: var(--text-color);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-base);
	}

	.description {
		color: var(--text-muted);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	.input-wrapper {
		display: flex;
		align-items: center;
		padding: var(--ch) var(--ch2);
		border: calc(1 * var(--ch) / 8) solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--bg-color);
		transition: all 0.2s ease;
	}

	.input-wrapper:focus-within {
		border-color: var(--accent-color);
		box-shadow: 0 0 0 calc(var(--ch) / 8) var(--accent-color-transparent);
	}

	.input-prefix {
		margin-right: var(--ch);
		color: var(--accent-color);
		font-weight: var(--font-weight-bold);
	}

	input {
		flex: 1;
		width: 100%;
		padding: 0;
		border: none;
		background: transparent;
		color: var(--text-color);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
	}

	input:focus {
		outline: none;
	}

	input::placeholder {
		color: var(--text-muted);
		opacity: 0.5;
	}

	button {
		padding: var(--ch2);
		border: calc(1 * var(--ch) / 8) solid var(--accent-color);
		border-radius: var(--radius-md);
		background: var(--accent-color);
		color: var(--bg-darker);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-bold);
		transition: all 0.2s ease;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	button:hover:not(:disabled) {
		background: var(--accent-color-hover);
		border-color: var(--accent-color-hover);
		transform: translateY(calc(-1 * var(--ch) / 4));
	}

	.button-content {
		display: flex;
		gap: var(--ch2);
		justify-content: center;
		align-items: center;
	}

	.button-icon {
		font-size: var(--font-size-lg);
		line-height: 1;
	}

	.loading {
		display: flex;
		gap: var(--ch);
		align-items: center;
		justify-content: center;
	}

	.dots {
		animation: dots 1.4s infinite;
	}

	@keyframes dots {
		0%,
		20% {
			content: '.';
		}
		40%,
		60% {
			content: '..';
		}
		80%,
		100% {
			content: '...';
		}
	}

	.success-message,
	.error-message {
		display: flex;
		gap: var(--ch);
		align-items: center;
		justify-content: center;
		padding: var(--ch2);
		border-radius: var(--radius-md);
		font-size: var(--font-size-sm);
	}

	.success-message {
		border: calc(1 * var(--ch) / 8) solid var(--color-success);
		background: color-mix(in srgb, var(--color-success) 10%, transparent);
		color: var(--color-success);
	}

	.error-message {
		border: calc(1 * var(--ch) / 8) solid var(--color-error);
		background: color-mix(in srgb, var(--color-error) 10%, transparent);
		color: var(--color-error);
	}

	@media (min-width: 600px) {
		.form-group {
			flex-direction: row;
			gap: var(--ch2);
		}

		button {
			min-width: 15ch;
		}
	}
</style>
