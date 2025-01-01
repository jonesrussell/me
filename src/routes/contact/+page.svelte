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
		padding: var(--ch4);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--color-mix-faint);
	}

	.contact-methods {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		margin-top: var(--ch3);
	}

	h2 {
		margin: 0 0 var(--ch2) 0;
		color: var(--accent-color);
		font-family: var(--font-mono);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-medium);
		white-space: pre;
	}

	.contact-link {
		display: flex;
		gap: var(--ch2);
		align-items: center;
		padding: var(--ch) var(--ch2);
		border: 1px solid var(--border-color);
		background: var(--color-mix-light);
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.contact-link:hover {
		border-color: var(--accent-color);
		transform: translateX(var(--ch));
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
		display: flex;
		flex-direction: column;
		gap: var(--ch3);
		width: 100%;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--ch);
		width: 100%;
		box-sizing: border-box;
	}

	label {
		margin-left: var(--ch);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
	}

	input,
	textarea {
		width: 100%;
		max-width: calc(100% - var(--ch2));
		margin: 0 var(--ch);
		padding: var(--ch2);
		border: 1px solid var(--border-color);
		background: var(--bg-color);
		color: var(--text-color);
		font-family: var(--font-mono);
		transition: all 0.2s ease;
		box-sizing: border-box;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--accent-color);
		box-shadow: 0 0 0 calc(var(--ch) / 8) var(--accent-color-transparent);
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--text-muted);
		opacity: 0.5;
	}

	.submit-button {
		padding: var(--ch2) var(--ch4);
		border: 1px solid var(--border-color);
		background: var(--color-mix-light);
		color: var(--text-color);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		transition: all 0.2s ease;
		cursor: pointer;
		align-self: flex-start;
	}

	.submit-button:hover:not(:disabled) {
		background: var(--color-mix-medium);
		border-color: var(--accent-color);
		transform: translateY(calc(-1 * var(--ch) / 8));
	}

	.submit-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.button-content {
		display: flex;
		gap: var(--ch);
		align-items: center;
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

	@media (width >= 60ch) {
		.contact-section {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
