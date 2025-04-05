<script lang="ts">
	let name = $state('');
	let email = $state('');
	let message = $state('');

	function handleSubmit() {
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
		<form on:submit|preventDefault={handleSubmit}>
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

	.contact {
		width: 100%;
		max-width: var(--contact-width);
		margin: 0 auto;
		padding: var(--ch4) var(--content-padding);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: minmax(35ch, 1fr) minmax(45ch, 2fr);
		gap: var(--ch4);
	}

	h1,
	h2 {
		margin-bottom: var(--ch2);
		color: var(--accent-color);
		font-size: var(--font-size-lg);
		font-weight: 500;
	}

	.description {
		margin-bottom: var(--ch4);
		color: var(--text-muted);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: var(--ch);
	}

	.link {
		display: flex;
		gap: var(--ch);
		align-items: center;
		padding: var(--ch) var(--ch2);
		border: var(--contact-border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--bg-alt);
		color: var(--text-color);
		font-size: var(--font-size-sm);
		text-decoration: none;
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.link:hover {
		border-color: var(--accent-color);
		background: var(--bg-darker);
		transform: translateX(var(--ch));
	}

	.icon {
		color: var(--accent-color);
		font-size: var(--font-size-md);
	}

	.field {
		margin-bottom: var(--ch2);
	}

	label {
		display: block;
		margin-bottom: var(--ch);
		color: var(--text-muted);
		font-size: var(--font-size-sm);
	}

	input,
	textarea {
		width: 100%;
		padding: var(--ch) var(--ch2);
		border: var(--contact-border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--bg-alt);
		color: var(--text-color);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	textarea {
		height: 12ch;
		resize: vertical;
		line-height: var(--line-height-relaxed);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--accent-color);
		box-shadow: 0 0 0 var(--contact-focus-shadow)
			var(--accent-color-transparent);
	}

	button {
		display: flex;
		gap: var(--ch);
		align-items: center;
		padding: var(--ch) var(--ch2);
		border: none;
		border-radius: var(--radius-sm);
		background: var(--accent-color);
		color: var(--bg-darker);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		font-weight: 500;
		transition: all var(--transition-duration) var(--transition-timing);
		cursor: pointer;
	}

	button:hover {
		background: var(--accent-color-hover);
		transform: translateY(var(--contact-button-translate));
	}

	button .icon {
		color: inherit;
	}

	@media (max-width: var(--mobile-breakpoint)) {
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.contact {
			padding: var(--ch2) var(--content-padding);
		}

		h1,
		h2 {
			font-size: var(--font-size-md);
		}
	}
</style>
