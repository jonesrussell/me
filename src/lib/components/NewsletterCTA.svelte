<script lang="ts">
	import { onMount } from 'svelte';

	let email = '';
	let submitStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
	let errorMessage = '';

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
	<div class="newsletter-header">
		<h3>Stay Updated</h3>
		<p class="description">
			Subscribe to my newsletter for updates on web development, Go, and open
			source.
		</p>
	</div>

	<form class="form" on:submit={handleSubmit}>
		<div class="form-group">
			<label for="email">Email Address</label>
			<input
				type="email"
				id="email"
				name="email"
				bind:value={email}
				placeholder="you@example.com"
				required
			/>
		</div>

		<button type="submit" disabled={submitStatus === 'loading'}>
			{#if submitStatus === 'loading'}
				<div class="loading">
					<span>Subscribing</span>
					<span>...</span>
				</div>
			{:else}
				Subscribe
			{/if}
		</button>

		{#if submitStatus === 'success'}
			<div class="success-message">
				<span class="icon">✓</span> Message sent successfully! I'll get back to you
				soon.
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

<style>
	.newsletter {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		width: 100%;
		padding: var(--ch3);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--color-mix-light);
	}

	.newsletter-header {
		display: flex;
		flex-direction: column;
		gap: var(--ch);
	}

	h3 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-base);
	}

	.description {
		color: var(--text-muted);
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
		gap: var(--ch);
	}

	label {
		color: var(--text-muted);
		font-size: var(--font-size-sm);
	}

	input {
		width: 100%;
		padding: var(--ch2);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--bg-color);
		color: var(--text-color);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		transition: all 0.2s ease;
	}

	input:focus {
		outline: none;
		border-color: var(--accent-color);
		box-shadow: 0 0 0 calc(var(--ch) / 8) var(--accent-color-transparent);
	}

	input::placeholder {
		color: var(--text-muted);
		opacity: 0.5;
	}

	button {
		display: flex;
		gap: var(--ch);
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: var(--ch2);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--color-mix-light);
		color: var(--text-color);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		transition: all 0.2s ease;
		cursor: pointer;
	}

	button:hover:not(:disabled) {
		background: var(--color-mix-medium);
		border-color: var(--accent-color);
		transform: translateY(calc(-1 * var(--ch) / 8));
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.loading {
		display: flex;
		gap: var(--ch);
		align-items: center;
		color: var(--text-muted);
	}

	.success-message,
	.error-message {
		display: flex;
		gap: var(--ch);
		align-items: center;
		padding: var(--ch2);
		border-radius: var(--radius-sm);
	}

	.success-message {
		border: 1px solid var(--color-success);
		background: color-mix(in srgb, var(--color-success) 15%, transparent);
		color: var(--color-success);
	}

	.error-message {
		border: 1px solid var(--color-error);
		background: color-mix(in srgb, var(--color-error) 15%, transparent);
		color: var(--color-error);
	}
</style>
