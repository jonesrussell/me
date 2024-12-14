<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';
	const width = alignToGrid(80);

	let formData = {
		name: '',
		email: '',
		message: ''
	};

	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	let errorMessage = '';

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		isSubmitting = true;
		submitStatus = 'idle';
		errorMessage = '';

		try {
			const response = await fetch('https://goforms.streetcode.net/api/subscriptions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					message: formData.message
				})
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			submitStatus = 'success';
			formData = { name: '', email: '', message: '' }; // Reset form
		} catch (error) {
			submitStatus = 'error';
			errorMessage = error instanceof Error ? error.message : 'An error occurred';
		} finally {
			isSubmitting = false;
		}
	};
</script>

<section class="contact" style="--contact-width: {width}ch">
	<h1>Get in Touch</h1>

	<div class="intro">
		I'm always interested in hearing about new opportunities, collaborations, or just having a chat
		about technology.
	</div>

	<div class="contact-methods">
		<div class="method">
			<h2>Send a Message</h2>
			<form on:submit={handleSubmit} class="contact-form">
				<div class="form-group">
					<label for="name">Name:</label>
					<input
						type="text"
						id="name"
						bind:value={formData.name}
						required
						disabled={isSubmitting}
					/>
				</div>

				<div class="form-group">
					<label for="email">Email:</label>
					<input
						type="email"
						id="email"
						bind:value={formData.email}
						required
						disabled={isSubmitting}
					/>
				</div>

				<div class="form-group">
					<label for="message">Message:</label>
					<textarea
						id="message"
						bind:value={formData.message}
						rows="6"
						required
						disabled={isSubmitting}
					></textarea>
				</div>

				{#if submitStatus === 'success'}
					<div class="status-message success">Message sent successfully!</div>
				{:else if submitStatus === 'error'}
					<div class="status-message error">
						{errorMessage}
					</div>
				{/if}

				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Sending...' : 'Send Message'}
				</button>
			</form>
		</div>

		<div class="method">
			<h2>Professional</h2>
			<ul>
				<li>
					<span class="label">GitHub:</span>
					<div class="link-group">
						<a href="https://github.com/jonesrussell" target="_blank" rel="noopener noreferrer">
							@jonesrussell
						</a>
						<span class="full-url">https://github.com/jonesrussell</span>
					</div>
				</li>
				<li>
					<span class="label">LinkedIn:</span>
					<div class="link-group">
						<a
							href="https://linkedin.com/in/jonesrussell42"
							target="_blank"
							rel="noopener noreferrer"
						>
							jonesrussell42
						</a>
						<span class="full-url">https://linkedin.com/in/jonesrussell42</span>
					</div>
				</li>
			</ul>
		</div>

		<div class="method">
			<h2>Social</h2>
			<ul>
				<li>
					<span class="label">X:</span>
					<div class="link-group">
						<a href="https://x.com/jonesrussell42" target="_blank" rel="noopener noreferrer">
							@jonesrussell42
						</a>
						<span class="full-url">https://x.com/jonesrussell42</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</section>

<style>
	.contact {
		width: var(--contact-width);
		margin: 0 auto;
		font-family: var(--font-mono);
		line-height: 1.4;
	}

	h1 {
		margin: 0 0 var(--ch2) 0;
		font-size: 1.8em;
		font-weight: var(--font-weight-bold);
	}

	.intro {
		margin: var(--ch3) 0;
		color: var(--text-muted);
	}

	.contact-methods {
		display: grid;
		gap: var(--ch4);
		margin-top: var(--ch4);
	}

	.method {
		padding: var(--ch3);
		border: 1px solid var(--border-color);
		background: var(--bg-color);
	}

	h2 {
		margin: 0 0 var(--ch2) 0;
		font-size: 1.2em;
		font-weight: var(--font-weight-medium);
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	li {
		display: flex;
		gap: var(--ch2);
		align-items: baseline;
	}

	.label {
		color: var(--text-muted);
		min-width: 10ch;
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

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--ch3);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--ch);
	}

	label {
		color: var(--text-muted);
		font-size: 0.9em;
	}

	input,
	textarea {
		font-family: var(--font-mono);
		padding: var(--ch);
		border: 1px solid var(--border-color);
		background: var(--bg-color);
		color: var(--text-color);
		width: 100%;
		box-sizing: border-box;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--link-color);
	}

	button {
		font-family: var(--font-mono);
		padding: var(--ch) var(--ch2);
		background: var(--link-color);
		color: var(--bg-color);
		border: none;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	button:hover {
		background: var(--link-hover);
	}

	.status-message {
		padding: var(--ch2);
		border: 1px solid;
		font-size: 0.9em;
	}

	.status-message.success {
		border-color: var(--color-success);
		color: var(--color-success);
		background: color-mix(in srgb, var(--color-success) 10%, transparent);
	}

	.status-message.error {
		border-color: var(--color-warning);
		color: var(--color-warning);
		background: color-mix(in srgb, var(--color-warning) 10%, transparent);
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.link-group {
		display: flex;
		flex-direction: column;
		gap: var(--ch);
	}

	.full-url {
		color: var(--text-muted);
		font-size: 0.9em;
		font-family: var(--font-mono);
	}
</style>
