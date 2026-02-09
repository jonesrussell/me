<script lang="ts">
	import type { PageData } from './$types';
	import GoFormXPlaceholder from '$lib/components/forms/GoFormXPlaceholder.svelte';

	// reserved for GoFormX integration

	interface FormData {
		success?: boolean;
		error?: boolean;
		message?: string;
		errors?: Record<string, string>;
	}

	const {} = $props<{ data?: PageData; form?: FormData }>();
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
			<GoFormXPlaceholder
				title="Contact"
				description="Get in touch form — launching soon."
				variant="inline"
			/>
		</div>
	</div>
</main>
