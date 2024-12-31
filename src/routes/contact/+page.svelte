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
			<h2>Get in Touch</h2>
			<p>
				Have a question or want to work together? I'd love to hear from you.
			</p>

			<div class="contact-methods">
				<a
					href="https://github.com/jonesrussell"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub: @jonesrussell
				</a>
				<a
					href="https://www.linkedin.com/in/jonesrussell42"
					target="_blank"
					rel="noopener noreferrer"
				>
					LinkedIn: jonesrussell42
				</a>
				<a href="mailto:jones.russell.dev@gmail.com">
					Email: jones.russell.dev@gmail.com
				</a>
			</div>
		</div>

		<div class="contact-form-section">
			<h2>Send a Message</h2>
			<form onsubmit={handleSubmit} class="contact-form">
				<div class="form-group">
					<label for="name">Name</label>
					<input
						type="text"
						id="name"
						required
						bind:value={formData.name}
						disabled={isSubmitting}
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
					/>
				</div>

				<div class="form-group">
					<label for="message">Message</label>
					<textarea
						id="message"
						rows="5"
						required
						bind:value={formData.message}
						disabled={isSubmitting}
					></textarea>
				</div>

				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Sending...' : 'Send Message'}
				</button>

				{#if submitStatus === 'success'}
					<div class="success-message">
						Message sent successfully! I'll get back to you soon.
					</div>
				{/if}

				{#if submitStatus === 'error'}
					<div class="error-message">{errorMessage}</div>
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
	}

	.contact-methods {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	h2 {
		margin: 0 0 var(--ch2) 0;
		font-size: 1.2em;
		font-weight: var(--font-weight-medium);
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
	}

	input,
	textarea {
		width: 100%;
		box-sizing: border-box;
		padding: var(--ch);
		background: var(--bg-color);
		border: 1px solid var(--border-color);
		max-width: calc(100% - var(--ch2));
		margin: 0 var(--ch);
		color: var(--text-color);
		font-family: var(--font-mono);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--link-color);
	}

	button {
		width: calc(100% - var(--ch2));
		margin: 0 var(--ch);
		padding: var(--ch) var(--ch2);
		background: var(--link-color);
		color: var(--bg-color);
		border: none;
		cursor: pointer;
		font-family: var(--font-mono);
		transition: background-color 0.2s ease;
	}

	button:hover {
		background: var(--link-hover);
	}

	a {
		color: var(--link-color);
		text-decoration: none;
		border-bottom: 1px solid transparent;
	}

	a:hover {
		color: var(--link-hover);
		border-bottom-color: currentColor;
	}

	.success-message {
		color: #22c55e;
		margin-top: var(--ch2);
	}

	.error-message {
		color: #ef4444;
		margin-top: var(--ch2);
	}
</style>
