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

<svelte:head>
	<title>Contact | Russell Jones - Web Development & Open Source</title>
	<meta
		name="description"
		content="Get in touch with Russell Jones for web development projects, technical consulting, or collaboration opportunities."
	/>
</svelte:head>

<div class="contact-grid">
	<section class="contact-info" aria-label="Contact Information">
		<h1 class="contact-heading">Get in Touch</h1>
		<p class="contact-text">
			Have a question or want to work together? I'd love to hear from you. Let's
			build something amazing together.
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

<style>
	:root {
		--contact-border-width: 0.125ch;
		--contact-focus-shadow: 0.25ch;
		--contact-button-translate: -0.25ch;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: minmax(35ch, 1fr) minmax(45ch, 2fr);
		gap: var(--ch4);
	}

	h1,
	h2 {
		margin-bottom: var(--ch2);
		font-size: var(--font-size-lg);
		font-weight: 500;
		color: var(--accent-color);
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: var(--ch4);
	}

	.contact-heading {
		margin-bottom: var(--ch2);
	}

	.contact-text {
		margin-bottom: var(--ch4);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.contact-links {
		display: flex;
		flex-direction: column;
		gap: var(--ch);
	}

	.contact-link {
		display: flex;
		gap: var(--ch);
		align-items: center;

		padding: var(--ch) var(--ch2);
		border: var(--contact-border-width) solid var(--border-color);
		border-radius: var(--radius-sm);

		font-size: var(--font-size-sm);
		color: var(--text-color);
		text-decoration: none;

		background: var(--bg-alt);

		transition: all var(--transition-duration) var(--transition-timing);
	}

	.contact-link:hover {
		transform: translateX(var(--ch));
		border-color: var(--accent-color);
		background: var(--bg-darker);
	}

	.contact-link-icon {
		font-size: var(--font-size-md);
		color: var(--accent-color);
	}

	.form-group {
		margin-bottom: var(--ch2);
	}

	.form-label {
		display: block;
		margin-bottom: var(--ch);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.form-input,
	.form-textarea {
		width: 100%;
		padding: var(--ch) var(--ch2);
		border: var(--contact-border-width) solid var(--border-color);
		border-radius: var(--radius-sm);

		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		color: var(--text-color);

		background: var(--bg-alt);

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
		box-shadow: 0 0 0 var(--contact-focus-shadow)
			var(--accent-color-transparent);
	}

	.form-submit {
		cursor: pointer;

		display: flex;
		gap: var(--ch);
		align-items: center;
		justify-content: center;

		width: 100%;
		padding: var(--ch) var(--ch2);
		border: none;
		border-radius: var(--radius-sm);

		font-size: var(--font-size-base);
		font-weight: 500;
		color: var(--bg-darker);

		background: var(--accent-color);

		transition: all var(--transition-duration) var(--transition-timing);
	}

	.form-submit:hover {
		transform: translateY(var(--contact-button-translate));
		background: var(--accent-color-hover);
	}

	.form-submit .contact-link-icon {
		color: var(--bg-darker);
		transition: transform var(--transition-duration) var(--transition-timing);
	}

	.form-submit:hover .contact-link-icon {
		transform: translateX(var(--ch));
	}

	@media (max-width: var(--mobile-breakpoint)) {
		.contact-grid {
			grid-template-columns: 1fr;
		}

		h1,
		h2 {
			font-size: var(--font-size-md);
		}
	}
</style>
