<script lang="ts">
	import Box from './Box.svelte';
	import { alignToGrid } from '$lib/utils/grid';

	let email = '';
	let submitting = false;
	let success = false;
	let error: string | null = null;

	const inputWidth = alignToGrid(30); // Align input width to grid

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

<Box title="Newsletter Signup" width={alignToGrid(40)}>
	<div class="newsletter-content">
		Stay updated with latest posts and projects.

		<div class="form-line">
			┌{'─'.repeat(inputWidth)}┐ │<input
				type="email"
				bind:value={email}
				placeholder="Enter email"
				style="width: {inputWidth}ch"
			/>│ └{'─'.repeat(inputWidth)}┘

			<button on:click={handleSubmit} disabled={submitting}>
				[{submitting ? '...' : 'Subscribe'}]
			</button>
		</div>

		{#if success}
			<div class="message success">✓ Thanks for subscribing!</div>
		{/if}

		{#if error}
			<div class="message error">✗ {error}</div>
		{/if}
	</div>
</Box>

<style>
	.newsletter-content {
		text-align: center;
		line-height: 1.2;
	}

	.form-line {
		margin-top: var(--ch2);
		white-space: pre;
		line-height: 1.2;
	}

	input {
		font-family: inherit;
		padding: 0;
		border: none;
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
