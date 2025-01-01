<script lang="ts">
	let formData = $state({
		name: '',
		email: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (isSubmitting) return;

		isSubmitting = true;
		submitStatus = 'idle';
		errorMessage = '';

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			submitStatus = 'success';
			formData = { name: '', email: '', message: '' };
		} catch (e) {
			submitStatus = 'error';
			errorMessage = e instanceof Error ? e.message : 'Failed to send message';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="contact-page">
	<section class="contact-section">
		<div class="contact-info">
			<h2>┌── Get in Touch ──┐</h2>
			<p>
				Have a question or want to work together? I'd love to hear from you.
			</p>

			<div class="contact-methods">
				<a
					href="https://github.com/jonesrussell"
					target="_blank"
					rel="noopener noreferrer"
					class="contact-link"
				>
					<span class="icon">⌘</span>
					<span class="label">GitHub:</span>
					<span class="value">@jonesrussell</span>
				</a>
				<a
					href="https://www.linkedin.com/in/jonesrussell42"
					target="_blank"
					rel="noopener noreferrer"
					class="contact-link"
				>
					<span class="icon">⚏</span>
					<span class="label">LinkedIn:</span>
					<span class="value">jonesrussell42</span>
				</a>
				<a href="mailto:russell@web.ca" class="contact-link">
					<span class="icon">✉</span>
					<span class="label">Email:</span>
					<span class="value">russell@web.ca</span>
				</a>
			</div>
		</div>

		<div class="contact-form-section">
			<h2>└── Send a Message ──┘</h2>
			<form onsubmit={handleSubmit} class="contact-form">
				<div class="form-group">
					<label for="name">Name</label>
					<input
						type="text"
						id="name"
						required
						bind:value={formData.name}
						disabled={isSubmitting}
						placeholder="Your name"
					/>
				</div>

				<div class="form-group">
					<label for="email">Email</label>
					<input
						type="email"
						id="email"
						required
						bind:value={formData.email}
						disabled={isSubmitting}
						placeholder="your.email@example.com"
					/>
				</div>

				<div class="form-group">
					<label for="message">Message</label>
					<textarea
						id="message"
						rows="5"
						bind:value={formData.message}
						disabled={isSubmitting}
						placeholder="Type your message here..."
					></textarea>
				</div>

				<button type="submit" disabled={isSubmitting} class="submit-button">
					{#if isSubmitting}
						<span class="loading">Sending...</span>
					{:else}
						<span class="button-content">
							<span class="icon">↪</span>
							Send Message
						</span>
					{/if}
				</button>

				{#if submitStatus === 'success'}
					<div class="success-message">
						<span class="icon">✓</span> Message sent successfully! I'll get back
						to you soon.
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
	</section>
</div>

<style>
	.contact-page {
		width: 100%;
		max-width: var(--contact-width);
		margin: 0 auto;
		padding: var(--ch4) var(--ch2);
		box-sizing: border-box;
	}

	.contact-section {
		display: grid;
		gap: var(--ch4);
		background: color-mix(in srgb, var(--text-color) 3%, transparent);
		padding: var(--ch4);
		border: 1px solid var(--border-color);
		border-radius: 2px;
	}

	.contact-methods {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		margin-top: var(--ch3);
	}

	h2 {
		margin: 0 0 var(--ch2) 0;
		font-size: 1.2em;
		font-weight: var(--font-weight-medium);
		font-family: var(--font-mono);
		color: var(--accent-color);
		white-space: pre;
	}

	.contact-link {
		display: flex;
		align-items: center;
		gap: var(--ch2);
		padding: var(--ch) var(--ch2);
		background: color-mix(in srgb, var(--text-color) 5%, transparent);
		border: 1px solid var(--border-color);
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.contact-link:hover {
		border-color: var(--accent-color);
		transform: translateX(4px);
	}

	.icon {
		color: var(--accent-color);
		font-family: var(--font-mono);
	}

	.label {
		color: var(--text-muted);
	}

	.value {
		color: var(--text-color);
	}

	.contact-form {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: var(--ch3);
		padding: 0;
		margin: 0;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--ch);
		width: 100%;
		box-sizing: border-box;
	}

	label {
		color: var(--text-muted);
		font-size: 0.9em;
		font-family: var(--font-mono);
		margin-left: var(--ch);
	}

	input,
	textarea {
		width: 100%;
		box-sizing: border-box;
		padding: var(--ch2);
		background: var(--bg-color);
		border: 1px solid var(--border-color);
		max-width: calc(100% - var(--ch2));
		margin: 0 var(--ch);
		color: var(--text-color);
		font-family: var(--font-mono);
		transition: all 0.2s ease;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--accent-color);
		box-shadow: 0 0 0 2px
			color-mix(in srgb, var(--accent-color) 20%, transparent);
	}

	input::placeholder,
	textarea::placeholder {
		color: color-mix(in srgb, var(--text-muted) 50%, transparent);
	}

	.submit-button {
		width: calc(100% - var(--ch2));
		margin: 0 var(--ch);
		padding: var(--ch2);
		background: var(--accent-color);
		color: var(--bg-color);
		border: none;
		cursor: pointer;
		font-family: var(--font-mono);
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--ch);
	}

	.submit-button:hover:not(:disabled) {
		background: var(--accent-color-hover);
		transform: translateY(-1px);
	}

	.submit-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.loading {
		display: flex;
		align-items: center;
		gap: var(--ch);
	}

	.loading::before {
		content: '⟳';
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.success-message,
	.error-message {
		margin: var(--ch2) var(--ch);
		padding: var(--ch2);
		display: flex;
		align-items: center;
		gap: var(--ch);
		border: 1px solid;
	}

	.success-message {
		color: #22c55e;
		background: color-mix(in srgb, #22c55e 10%, transparent);
		border-color: color-mix(in srgb, #22c55e 30%, transparent);
	}

	.error-message {
		color: #ef4444;
		background: color-mix(in srgb, #ef4444 10%, transparent);
		border-color: color-mix(in srgb, #ef4444 30%, transparent);
	}

	@media (min-width: 768px) {
		.contact-section {
			grid-template-columns: 1fr 1fr;
			gap: var(--ch6);
		}
	}
</style>
