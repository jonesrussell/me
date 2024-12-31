<script lang="ts">
	let email = $state('');
	let submitting = $state(false);
	let success = $state(false);
	let error = $state<string | null>(null);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!email) return;

		submitting = true;
		error = null;

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			success = true;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Something went wrong';
		} finally {
			submitting = false;
		}
	}
</script>

<div class="newsletter-cta">
	<div class="cta-content">
		<h3>Stay Updated</h3>
		<p>Get the latest updates on web development and tech insights.</p>

		{#if success}
			<div class="success-message">
				Thanks for subscribing! Check your email to confirm.
			</div>
		{:else}
			<form class="signup-form" onsubmit={handleSubmit}>
				<div class="input-wrapper">
					<input
						type="email"
						placeholder="Enter your email"
						bind:value={email}
						disabled={submitting}
					/>
					<button type="submit" disabled={submitting}>
						{submitting ? 'Subscribing...' : 'Subscribe'}
					</button>
				</div>
				{#if error}
					<div class="error-message">{error}</div>
				{/if}
			</form>
		{/if}
	</div>
</div>

<style>
	.newsletter-cta {
		width: 100%;
		padding: var(--ch2) 0;
		background: var(--bg-color);
		border-top: 1px solid var(--border-color);
	}

	.cta-content {
		width: 100%;
		max-width: min(var(--measure), 95vw);
		margin: 0 auto;
		padding: 0 var(--ch2);
		text-align: center;
		line-height: var(--line-height);
	}

	h3 {
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--ch2);
	}

	p {
		color: var(--text-muted);
		margin-bottom: var(--ch2);
	}

	.signup-form {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);

		align-items: center;
	}

	.input-wrapper {
		width: 100%;
		max-width: min(40ch, 100%);
		margin: 0 auto;
	}

	input {
		width: 100%;
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

	.success-message {
		color: #22c55e;
		margin-top: var(--ch2);
		line-height: 1.2;
	}

	.error-message {
		color: #ef4444;
		margin-top: var(--ch2);
		line-height: 1.2;
	}
</style>
