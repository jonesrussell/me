<script lang="ts">
	import FormField from '$lib/components/content/FormField.svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let errors = $state<Record<string, string>>({});

	function validateForm() {
		const newErrors: Record<string, string> = {};

		if (!name) newErrors.name = 'Name is required';
		if (!email) {
			newErrors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = 'Please enter a valid email address';
		}
		if (!message) newErrors.message = 'Message is required';

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validateForm()) return;

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
		grid-template-columns: 1fr;
		gap: var(--space-8);
	}

	@media (width >= 48ch) {
		.contact-grid {
			grid-template-columns: minmax(30ch, 35ch) minmax(45ch, 60ch);
			align-items: start;
		}
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
	}

	.contact-form {
		width: 100%;
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
		padding: var(--space-4) var(--space-6);
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
		width: 100%;
	}

	form {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: var(--space-4);
	}

	.form-submit {
		display: flex;
		width: 100%;
		margin-top: var(--space-4);
		padding: var(--space-4) var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
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
		transform: translateY(-0.125rem);
	}

	.form-submit .contact-link-icon {
		color: var(--bg-darker);
		transition: transform var(--transition-duration) var(--transition-timing);
	}

	.form-submit:hover .contact-link-icon {
		transform: translateX(var(--space-2));
	}

	@media (prefers-reduced-motion: reduce) {
		.contact-link,
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
				<h1>Get in Touch</h1>
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
						<FormField
							label="Name"
							name="name"
							type="text"
							required
							value={name}
							onInput={(value) => (name = value)}
							error={errors.name}
							placeholder="Your name"
						/>
					</div>
					<div class="form-group">
						<FormField
							label="Email"
							name="email"
							type="email"
							required
							value={email}
							onInput={(value) => (email = value)}
							error={errors.email}
							placeholder="your.email@example.com"
						/>
					</div>
					<div class="form-group">
						<FormField
							label="Message"
							name="message"
							type="textarea"
							required
							value={message}
							onInput={(value) => (message = value)}
							error={errors.message}
							placeholder="Type your message here..."
							rows={6}
						/>
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
