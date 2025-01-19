<script lang="ts">
	let name = '';
	let email = '';
	let message = '';
</script>

<div class="contact">
	<div class="contact-grid">
		<section class="left">
			<h1>┌─ Get in Touch ─┐</h1>

			<p>
				Have a question or want to work together?<br />
				I'd love to hear from you.
			</p>

			<div class="links">
				<div class="link">
					<span class="icon">⌘</span> GitHub: @jonesrussell
				</div>
				<div class="link">
					<span class="icon">≡</span> LinkedIn: jonesrussell42
				</div>
				<div class="link">
					<span class="icon">✉</span> Email: russell@web.ca
				</div>
			</div>
		</section>

		<section class="right">
			<h2>└─ Send a Message ─┘</h2>
			<form>
				<div class="field">
					<label>Name</label>
					<input type="text" placeholder="Your name" />
				</div>
				<div class="field">
					<label>Email</label>
					<input type="email" placeholder="your.email@example.com" />
				</div>
				<div class="field">
					<label>Message</label>
					<textarea placeholder="Type your message here..." />
				</div>
				<button>
					<span class="icon">→</span> Send Message
				</button>
			</form>
		</section>
	</div>
</div>

<style>
	.contact {
		padding: 0 var(--ch2);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 35ch 1fr;
		gap: var(--ch2);
		max-width: 90ch;
		margin: var(--ch2) auto;
	}

	h1, h2 {
		color: rgb(0, 255, 127);
		font-size: 1em;
		font-weight: normal;
		margin-bottom: var(--ch);
		white-space: pre;
	}

	p {
		color: var(--text-muted);
		font-size: 0.9em;
		margin-bottom: var(--ch);
		line-height: 1.4;
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.link {
		padding: 0.5em;
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: 2px;
		font-size: 0.9em;
	}

	.icon {
		color: rgb(0, 255, 127);
	}

	.field {
		margin-bottom: 0.75em;
	}

	label {
		display: block;
		color: var(--text-muted);
		margin-bottom: 0.25em;
		font-size: 0.9em;
	}

	input, textarea {
		width: 100%;
		padding: 0.5em;
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: 2px;
		color: var(--text-color);
		font-family: inherit;
		font-size: 0.9em;
	}

	textarea {
		height: 6em;
		resize: vertical;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.5em;
		padding: 0.5em 1em;
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: 2px;
		color: var(--text-color);
		font-family: inherit;
		font-size: 0.9em;
		cursor: pointer;
	}

	@media (max-width: 600px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
