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
		position: relative;
		width: 100%;
		margin: var(--ch4) 0;
		padding: var(--ch4) 0;
		border: 1px solid var(--border-color);
		background: var(--bg-alt);
		overflow: hidden;
	}

	.newsletter-cta::before {
		position: absolute;
		inset: 0;
		content: '';
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
			-10px 0;
		opacity: 0.03;
		pointer-events: none;
	}

	.cta-content {
		position: relative;
		width: 100%;
		max-width: min(var(--measure), 95vw);
		margin: 0 auto;
		padding: var(--ch4) var(--ch2);
		border: 1px solid var(--border-color);
		background: var(--bg-color);
		line-height: var(--line-height);
		text-align: center;
		box-shadow: 4px 4px 0 var(--border-color);
	}

	.cta-header {
		margin-bottom: var(--ch4);
	}

	h3 {
		margin-bottom: var(--ch2);
		color: var(--accent-color);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-base);
		letter-spacing: 0.05em;
		text-shadow: 2px 2px 0 var(--bg-color);
	}

	p {
		max-width: 50ch;
		margin-right: auto;
		margin-bottom: var(--ch2);
		margin-left: auto;
		color: var(--text-muted);
	}

	.signup-form {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		align-items: center;
	}

	.input-wrapper {
		display: flex;
		flex-direction: row;
		gap: var(--ch2);
		align-items: stretch;
		width: 100%;
		max-width: min(50ch, 100%);
		margin: 0 auto;
	}

	input {
		flex: 1;
		min-width: 0;
		padding: var(--ch2);
		border: 1px solid var(--border-color);
		background: var(--bg-color);
		color: var(--text-color);
		font-family: var(--font-mono);
		transition: all 0.2s ease;
		box-shadow: inset 0 1px 2px rgb(0 0 0 / 10%);
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
			inset 0 1px 2px rgb(0 0 0 / 10%);
	}

	button {
		position: relative;
		width: auto;
		padding: var(--ch2) var(--ch4);
		border: 1px solid var(--accent-color);
		background: var(--accent-color-hover);
		color: var(--bg-color);
		font-family: var(--font-mono);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		transition: all 0.2s ease;
		cursor: pointer;
		white-space: nowrap;
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
		transform: none;
		cursor: not-allowed;
		border-color: var(--border-color);
		box-shadow: 2px 2px 0 var(--border-color);
		opacity: 0.7;
	}

	.success-message,
	.error-message {
		display: flex;
		gap: var(--ch);
		justify-content: center;
		align-items: center;
		margin-top: var(--ch2);
		padding: var(--ch2);
		border: 1px solid;
		line-height: var(--line-height-relaxed);
	}

	.success-message {
		background: rgb(34 197 94 / 10%);
		color: #22c55e;
		border-color: #22c55e;
	}

	.error-message {
		background: rgb(239 68 68 / 10%);
		color: #ef4444;
		border-color: #ef4444;
	}

	.icon {
		font-weight: var(--font-weight-bold);
	}
</style>
