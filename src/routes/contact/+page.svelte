<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';
	const width = alignToGrid(120);

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
			const response = await fetch(
				'https://goforms.streetcode.net/v1/contact',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name: formData.name,
						email: formData.email,
						message: formData.message
					})
				}
			);

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			submitStatus = 'success';
			formData = { name: '', email: '', message: '' }; // Reset form
		} catch (error) {
			submitStatus = 'error';
			errorMessage =
				error instanceof Error ? error.message : 'An error occurred';
		} finally {
			isSubmitting = false;
		}
	};
</script>

<section class="contact">
	<header>
		<h1>Get in Touch</h1>
		<p class="intro">
			I'm always interested in hearing about new opportunities, collaborations,
			or just having a chat about technology.
		</p>
	</header>

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
						<a
							href="https://github.com/jonesrussell"
							target="_blank"
							rel="noopener noreferrer"
						>
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
						<a
							href="https://x.com/jonesrussell42"
							target="_blank"
							rel="noopener noreferrer"
						>
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
		width: 100%;
		max-width: var(--contact-width);
		margin: 0 auto;
		padding: var(--ch4) var(--ch2);
		box-sizing: border-box;
	}

	header {
		text-align: center;
		margin-bottom: var(--ch4);
	}

	h1 {
		font-size: 2em;
		line-height: 1.2;
		margin: 0;
	}

	.intro {
		margin: var(--ch2) 0 0 0;
		color: var(--text-muted);
	}

	.contact-methods {
		display: grid;
		gap: var(--ch4);
	}

	.method {
		width: 100%;
		box-sizing: border-box;
		padding: var(--ch3);
		border: 1px solid var(--border-color);
		background: color-mix(in srgb, var(--text-color) 5%, transparent);
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

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		width: 100%;
		box-sizing: border-box;
	}

	li {
		display: flex;
		gap: var(--ch2);
		align-items: baseline;
		flex-wrap: wrap;
		width: 100%;
		box-sizing: border-box;
		margin-bottom: var(--ch2);
	}

	li:last-child {
		margin-bottom: 0;
	}

	.label {
		color: var(--text-muted);
		min-width: 10ch;
		flex-shrink: 0;
	}

	.link-group {
		display: flex;
		flex-direction: column;
		gap: var(--ch);
		width: 100%;
		box-sizing: border-box;
	}

	.full-url {
		color: var(--text-muted);
		font-size: 0.9em;
		font-family: var(--font-mono);
		word-break: break-all;
		max-width: 100%;
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
</style>
