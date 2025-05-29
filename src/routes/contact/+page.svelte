<script lang="ts">
	import type { PageData } from './$types';

	interface FormData {
		success?: boolean;
		error?: boolean;
		message?: string;
		errors?: Record<string, string>;
	}

	const { form } = $props<{ data: PageData; form: FormData }>();

	let submitting = $state(false);
	let success = $state(false);
	let error = $state<string | null>(null);
	let fieldErrors = $state<Record<string, string>>({});

	$effect(() => {
		if (form) {
			submitting = false;
			success = form.success ?? false;
			error = form.error ? form.message : null;
			fieldErrors = form.errors ?? {};
		}
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitting = true;
		success = false;
		error = null;
		fieldErrors = {};

		const formData = new FormData(event.target as HTMLFormElement);
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			message: formData.get('message')
		};

		try {
			// TODO: Replace with your actual form submission endpoint
			const response = await fetch('https://formspree.io/f/your-form-id', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				throw new Error('Failed to send message');
			}

			success = true;
			(event.target as HTMLFormElement).reset();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Something went wrong. Please try again later.';
		} finally {
			submitting = false;
		}
	}
</script>

<style>
	.contact {
		container-type: inline-size;
		container-name: contact-page;
		display: grid;
		width: 100%;
		padding: var(--space-16) 0;
		grid-template-rows: auto 1fr;
		gap: var(--space-16);
		background: var(--color-mix-light);
	}

	.container {
		display: grid;
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-4);
		max-width: var(--container-lg);
		gap: var(--space-16);
		grid-template-columns: minmax(0, 1fr);
	}

	@container contact-page (min-width: 50rem) {
		.container {
			grid-template-columns: 1fr 1fr;
			align-items: start;
		}
	}

	.contact-info {
		display: flex;
		padding-right: var(--space-8);
		flex-direction: column;
		gap: var(--space-4);
	}

	.contact-info h2 {
		margin: 0 0 var(--space-2) 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.contact-info p {
		margin: 0 0 var(--space-4) 0;
		font-size: var(--font-size-lg);
		color: var(--text-muted);
	}

	.contact-list {
		display: flex;
		margin: var(--space-4) 0 0 0;
		padding: 0;
		font-size: var(--font-size-base);
		color: var(--text-muted);
		list-style: none;
		flex-direction: column;
		gap: var(--space-2);
	}

	.contact-list span {
		display: inline-block;
		width: 2ch;
		margin-right: var(--space-2);
		text-align: center;
		color: var(--accent-color);
	}

	.contact-form-col {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.contact-form {
		display: flex;
		padding: var(--space-8);
		background: var(--bg-darker);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
		flex-direction: column;
		gap: var(--space-6);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	label {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--text-color);
	}

	input,
	textarea {
		padding: var(--space-3) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		color: var(--text-color);
		background: var(--bg-color);
		border: 0.0625rem solid var(--border-color);
		border-radius: var(--radius-sm);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--accent-color);
		box-shadow: 0 0 0 0.125rem var(--color-mix-light);
	}

	.error {
		font-size: var(--font-size-sm);
		color: var(--color-error);
	}

	.button {
		align-self: flex-start;
		padding: var(--space-4) var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		color: var(--bg-darker);
		background: var(--accent-color);
		border: 0.0625rem solid var(--accent-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-base);
		cursor: pointer;
	}

	.button:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}

	.button:hover:not(:disabled) {
		background: var(--accent-color-hover);
		border-color: var(--accent-color-hover);
	}

	.success-message {
		margin-bottom: var(--space-8);
		padding: var(--space-6);
		font-size: var(--font-size-base);
		color: var(--color-success);
		background-color: var(--color-mix-light);
		border-radius: var(--radius-md);
	}

	.error-message {
		margin-bottom: var(--space-8);
		padding: var(--space-6);
		font-size: var(--font-size-base);
		color: var(--color-error);
		background-color: var(--color-mix-light);
		border-radius: var(--radius-md);
	}
</style>

<svelte:head>
	<title>Contact Me | Russell Jones</title>
	<meta
		name="description"
		content="Get in touch with me for collaboration, questions, or just to say ahnii!"
	/>
</svelte:head>

<main class="contact">
	<div class="container">
		<div class="contact-info">
			<h2>Get in Touch</h2>
			<p>
				Have a question or want to work together? I'd love to hear from you. Let's build something
				amazing together.
			</p>
			<ul class="contact-list">
				<li><span aria-label="Command" title="Command">⌘</span> GitHub: @jonesrussell</li>
				<li><span aria-label="Menu" title="Menu">≡</span> LinkedIn: jonesrussell42</li>
				<li><span aria-label="Email" title="Email">✉</span> Email: russell@web.ca</li>
			</ul>
		</div>
		<div class="contact-form-col">
			{#if success && form}
				<div class="success-message" role="alert">
					<p>{form.message}</p>
				</div>
			{:else}
				<form method="POST" onsubmit={handleSubmit} class="contact-form">
					{#if error}
						<div class="error-message" role="alert">
							<p>{error}</p>
						</div>
					{/if}

					<div class="form-group">
						<label for="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							aria-invalid={fieldErrors.name ? 'true' : undefined}
							aria-describedby={fieldErrors.name ? 'name-error' : undefined}
						/>
						{#if fieldErrors.name}
							<span id="name-error" class="error">{fieldErrors.name}</span>
						{/if}
					</div>

					<div class="form-group">
						<label for="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							aria-invalid={fieldErrors.email ? 'true' : undefined}
							aria-describedby={fieldErrors.email ? 'email-error' : undefined}
						/>
						{#if fieldErrors.email}
							<span id="email-error" class="error">{fieldErrors.email}</span>
						{/if}
					</div>

					<div class="form-group">
						<label for="message">Message</label>
						<textarea
							id="message"
							name="message"
							required
							rows="5"
							aria-invalid={fieldErrors.message ? 'true' : undefined}
							aria-describedby={fieldErrors.message ? 'message-error' : undefined}
						></textarea>
						{#if fieldErrors.message}
							<span id="message-error" class="error">{fieldErrors.message}</span>
						{/if}
					</div>

					<button type="submit" class="button" disabled={submitting}>
						{#if submitting}
							Sending...
						{:else}
							Send Message
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</div>
</main>
