<script lang="ts">
	import Box from './Box.svelte';
	import { alignToGrid } from '$lib/utils/grid';

	const width = alignToGrid(40);
	const inputWidth = alignToGrid(30);

	let email = '';
	let submitting = false;
	let success = false;
	let error: string | null = null;

	async function handleSubmit() {
		if (!email) return;
		submitting = true;
		error = null;

		try {
			// API call would go here
			await new Promise((resolve) => setTimeout(resolve, 1000));
			success = true;
		} catch (e) {
			error = 'Failed to subscribe';
		} finally {
			submitting = false;
		}
	}
</script>

<section class="newsletter-section">
	<div class="newsletter" style="--newsletter-width: {width}ch">
		<div class="newsletter-content">
			<h2 class="title">Newsletter Signup</h2>
			<p class="description">Stay updated with latest posts and projects.</p>

			<form class="signup-form" on:submit|preventDefault={handleSubmit}>
				<div class="input-wrapper" style="--input-width: {inputWidth}ch">
					<input
						type="email"
						bind:value={email}
						placeholder="Enter email"
						aria-label="Email address"
					/>
					<button type="submit" disabled={submitting}>
						[{submitting ? '...' : 'Subscribe'}]
					</button>
				</div>

				{#if success}
					<div class="message success">✓ Thanks for subscribing!</div>
				{/if}

				{#if error}
					<div class="message error">✗ {error}</div>
				{/if}
			</form>
		</div>
	</div>
</section>

<style>
	.newsletter-section {
		width: 100%;
		padding: var(--ch2) 0;
		background: var(--bg-color);
		border-top: 1px solid var(--border-color);
	}

	.newsletter {
		width: var(--newsletter-width);
		margin: 0 auto;
		padding: 0 var(--ch2);
	}

	.newsletter-content {
		text-align: center;
		line-height: var(--line-height);
	}

	.title {
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--ch2);
	}

	.description {
		color: var(--text-muted);
		margin-bottom: var(--ch2);
	}

	.signup-form {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	.input-wrapper {
		display: flex;
		gap: var(--ch2);
		justify-content: center;
		align-items: center;
	}

	input {
		width: var(--input-width);
		font-family: var(--font-mono);
		padding: var(--ch);
		border: 1px solid var(--border-color);
		background: transparent;
		color: var(--text-color);
	}

	input:focus {
		outline: none;
	}

	button {
		font-family: inherit;
		background: none;
		border: none;
		color: var(--link-color);
		cursor: pointer;
		padding: var(--ch) var(--ch2);
		line-height: 1.2;
	}

	button:disabled {
		color: var(--text-muted);
		cursor: not-allowed;
	}

	.message {
		margin-top: var(--ch2);
		line-height: 1.2;
	}

	.success {
		color: #22c55e;
	}

	.error {
		color: #ef4444;
	}
</style>
