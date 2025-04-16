<script lang="ts">
	let name = $state('');
	let email = $state('');
	let message = $state('');

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		// TODO: Implement form submission
		console.log({ name, email, message });
	}
</script>

<style>
	.contact {
		width: 100%;
		padding: var(--space-16) 0;
	}

	.container {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: minmax(35ch, 1fr) minmax(45ch, 2fr);
		gap: var(--space-8);
	}

	h1,
	h2 {
		margin-bottom: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-lg);
		font-weight: 500;
		color: var(--accent-color);
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.contact-text {
		margin-bottom: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.contact-links {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.contact-link {
		display: flex;
		padding: var(--space-3) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-decoration: none;
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		gap: var(--space-2);
		align-items: center;
	}

	.contact-link:hover {
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
		transform: translateX(var(--space-2));
		border-color: var(--accent-color);
	}

	.contact-link-icon {
		font-size: var(--font-size-md);
		color: var(--accent-color);
	}

	.form-group {
		margin-bottom: var(--space-4);
	}

	.form-label {
		display: block;
		margin-bottom: var(--space-2);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.form-input,
	.form-textarea {
		width: 100%;
		padding: var(--space-3) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.form-textarea {
		resize: vertical;
		height: 12ch;
		line-height: var(--line-height-relaxed);
	}

	.form-input:focus,
	.form-textarea:focus {
		border-color: var(--accent-color);
		outline: none;
		box-shadow: 0 0 0 var(--space-1) var(--accent-color-transparent);
	}

	.form-submit {
		display: flex;
		width: 100%;
		padding: var(--space-3) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		font-weight: 500;
		color: var(--bg-darker);
		background: var(--accent-color);
		border: none;
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		cursor: pointer;
		gap: var(--space-2);
		align-items: center;
		justify-content: center;
	}

	.form-submit:hover {
		background: var(--accent-color-hover);
		transform: translateY(-2px);
	}

	.form-submit .contact-link-icon {
		color: var(--bg-darker);
		transition: transform var(--transition-duration) var(--transition-timing);
	}

	.form-submit:hover .contact-link-icon {
		transform: translateX(var(--space-2));
	}

	@media (width <= 48ch) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.contact-link,
		.form-input,
		.form-textarea,
		.form-submit {
			transition: none;
		}
	}
</style>

<svelte:head>
	<title>Contact | Russell Jones - Web Development & Open Source</title>
	<meta
		name="description"
		content="Get in touch with Russell Jones for web development projects, technical consulting, or collaboration opportunities."
	/>
</svelte:head>

<div class="contact">
	<div class="container">
		<div class="contact-grid">
			<section class="contact-info" aria-label="Contact Information">
				<h1 class="contact-heading">Get in Touch</h1>
				<p class="contact-text">
					Have a question or want to work together? I'd love to hear from you. Let's build something
					amazing together.
				</p>

				<div class="contact-links">
					<a
						href="https://github.com/jonesrussell"
						target="_blank"
						rel="noopener noreferrer"
						class="contact-link"
					>
						<span class="contact-link-icon">⌘</span>
						<span>GitHub: @jonesrussell</span>
					</a>
					<a
						href="https://linkedin.com/in/jonesrussell42"
						target="_blank"
						rel="noopener noreferrer"
						class="contact-link"
					>
						<span class="contact-link-icon">≡</span>
						<span>LinkedIn: jonesrussell42</span>
					</a>
					<a href="mailto:russell@web.ca" class="contact-link">
						<span class="contact-link-icon">✉</span>
						<span>Email: russell@web.ca</span>
					</a>
				</div>
			</section>

			<section class="contact-form" aria-label="Contact Form">
				<h2 class="form-heading">Send a Message</h2>
				<form onsubmit={handleSubmit}>
					<div class="form-group">
						<label class="form-label" for="name">Name</label>
						<input
							type="text"
							id="name"
							class="form-input"
							bind:value={name}
							placeholder="Your name"
							required
						/>
					</div>
					<div class="form-group">
						<label class="form-label" for="email">Email</label>
						<input
							type="email"
							id="email"
							class="form-input"
							bind:value={email}
							placeholder="your.email@example.com"
							required
						/>
					</div>
					<div class="form-group">
						<label class="form-label" for="message">Message</label>
						<textarea
							id="message"
							class="form-textarea"
							bind:value={message}
							placeholder="Type your message here..."
							required
						></textarea>
					</div>
					<button type="submit" class="form-submit">
						<span>Send Message</span>
						<span class="contact-link-icon">→</span>
					</button>
				</form>
			</section>
		</div>
	</div>
</div>
