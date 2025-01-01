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
		<div class="cta-header">
			<h3>┌─[ Stay Updated ]─┐</h3>
			<p>Get the latest updates on web development and tech insights.</p>
		</div>

		{#if success}
			<div class="success-message">
				<span class="icon">✓</span> Thanks for subscribing! Check your email to confirm.
			</div>
		{:else}
			<form class="signup-form" onsubmit={handleSubmit}>
				<div class="input-wrapper">
					<input
						type="email"
						placeholder="your.email@example.com"
						bind:value={email}
						disabled={submitting}
					/>
					<button type="submit" disabled={submitting}>
						{#if submitting}
							[ Processing... ]
						{:else}
							[ ▶ Subscribe ]
						{/if}
					</button>
				</div>
				{#if error}
					<div class="error-message"><span class="icon">✗</span> {error}</div>
				{/if}
			</form>
		{/if}
	</div>
</div>

<style>
	.newsletter-cta {
		width: 100%;
		padding: var(--ch4) 0;
		background: var(--bg-alt);
		border: 1px solid var(--border-color);
		margin: var(--ch4) 0;
		position: relative;
		overflow: hidden;
	}

	.newsletter-cta::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: linear-gradient(
				45deg,
				var(--border-color) 25%,
				transparent 25%
			),
			linear-gradient(-45deg, var(--border-color) 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, var(--border-color) 75%),
			linear-gradient(-45deg, transparent 75%, var(--border-color) 75%);
		background-size: 20px 20px;
		background-position:
			0 0,
			0 10px,
			10px -10px,
			-10px 0px;
		opacity: 0.03;
		pointer-events: none;
	}

	.cta-content {
		width: 100%;
		max-width: min(var(--measure), 95vw);
		margin: 0 auto;
		padding: var(--ch4) var(--ch2);
		text-align: center;
		line-height: var(--line-height);
		background: var(--bg-color);
		border: 1px solid var(--border-color);
		box-shadow: 4px 4px 0 var(--border-color);
		position: relative;
	}

	.cta-header {
		margin-bottom: var(--ch4);
	}

	h3 {
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--ch2);
		color: var(--accent-color);
		font-size: 1.2em;
		letter-spacing: 0.05em;
		text-shadow: 2px 2px 0 var(--bg-color);
	}

	p {
		color: var(--text-muted);
		margin-bottom: var(--ch2);
		max-width: 50ch;
		margin-left: auto;
		margin-right: auto;
	}

	.signup-form {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		align-items: center;
	}

	.input-wrapper {
		width: 100%;
		max-width: min(50ch, 100%);
		margin: 0 auto;
		display: flex;
		gap: var(--ch2);
		flex-direction: row;
		align-items: stretch;
	}

	input {
		flex: 1;
		min-width: 0;
		font-family: var(--font-mono);
		padding: var(--ch2);
		border: 1px solid var(--border-color);
		background: var(--bg-color);
		color: var(--text-color);
		transition: all 0.2s ease;
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	input::placeholder {
		color: var(--text-muted);
		opacity: 0.7;
	}

	input:focus {
		outline: none;
		border-color: var(--accent-color);
		box-shadow:
			0 0 0 2px var(--accent-color-transparent),
			inset 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	button {
		font-family: inherit;
		background: var(--accent-color-hover);
		border: 1px solid var(--accent-color);
		color: var(--bg-color);
		cursor: pointer;
		padding: var(--ch2) var(--ch4);
		line-height: 1.2;
		font-weight: var(--font-weight-bold);
		transition: all 0.2s ease;
		width: auto;
		white-space: nowrap;
		position: relative;
		text-shadow: none;
		box-shadow: 2px 2px 0 var(--accent-color);
	}

	button:hover:not(:disabled) {
		background: var(--accent-color);
		transform: translateY(-1px) translateX(-1px);
		box-shadow: 3px 3px 0 var(--accent-color);
	}

	button:active:not(:disabled) {
		transform: translateY(1px) translateX(1px);
		box-shadow: 1px 1px 0 var(--accent-color);
	}

	button:disabled {
		background: var(--text-muted);
		border-color: var(--border-color);
		box-shadow: 2px 2px 0 var(--border-color);
		cursor: not-allowed;
		opacity: 0.7;
		transform: none;
	}

	.success-message,
	.error-message {
		margin-top: var(--ch2);
		line-height: 1.4;
		padding: var(--ch2);
		border: 1px solid;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--ch);
	}

	.success-message {
		color: #22c55e;
		background: rgba(34, 197, 94, 0.1);
		border-color: #22c55e;
	}

	.error-message {
		color: #ef4444;
		background: rgba(239, 68, 68, 0.1);
		border-color: #ef4444;
	}

	.icon {
		font-weight: bold;
	}
</style>
