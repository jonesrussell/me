<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	const { data, form } = $props<{ data: PageData; form: ActionData }>();

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

	function handleSubmit() {
		submitting = true;
		success = false;
		error = null;
		fieldErrors = {};
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
	}

	.container {
		display: grid;
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-4);
		max-width: min(var(--measure), 95cqi);
		gap: var(--space-16);
		grid-template-columns: minmax(0, 1fr);
	}

	.success-message {
		margin-bottom: var(--space-16);
		padding: var(--space-8);
		color: var(--color-success-dark);
		background-color: var(--color-success-light);
		border-radius: var(--radius-md);
	}

	.error-message {
		margin-bottom: var(--space-16);
		padding: var(--space-8);
		color: var(--color-error-dark);
		background-color: var(--color-error-light);
		border-radius: var(--radius-md);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	label {
		font-weight: 500;
	}

	input,
	textarea {
		padding: var(--space-4);
		font-size: var(--text-base);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-sm);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 0.125rem var(--color-primary-light);
	}

	.error {
		font-size: var(--text-sm);
		color: var(--color-error);
	}

	.button {
		align-self: flex-start;
	}

	@container contact-page (min-width: 640px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-8);
		}
	}

	@container contact-page (min-width: 768px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-12);
		}
	}

	@container contact-page (min-width: 1024px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-16);
		}
	}

	@container contact-page (min-width: 1280px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-20);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none;
			animation: none;
		}
	}
</style>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<main class="contact">
	<div class="container">
		<h1>Contact Me</h1>
		<p class="lead">Get in touch with me for collaboration, questions, or just to say hello!</p>

		{#if success && form}
			<div class="success-message" role="alert">
				<p>{form.message}</p>
			</div>
		{:else}
			<form method="POST" use:enhance={handleSubmit} class="contact-form">
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
</main>
