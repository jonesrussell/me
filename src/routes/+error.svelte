<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	// Using $derived with page object directly
	const isNotFound = $derived(page.status === 404);
	const errorMessage = $derived(
		isNotFound ? 'Page not found' : page.error?.message || 'Something went wrong'
	);
</script>

<style>
	.error {
		container-type: inline-size;
		container-name: error-page;
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
		place-items: center;
		text-align: center;
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-tight);
		color: var(--accent-color);
	}

	p {
		margin: 0;
		font-size: var(--font-size-base);
		color: var(--text-muted);
	}

	a {
		display: inline-block;
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-decoration: none;
		color: var(--text-color);
		background: var(--bg-darker);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	a:hover {
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
	}

	@container error-page (min-width: 640px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-8);
		}
	}

	@container error-page (min-width: 768px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-12);
		}
	}

	@container error-page (min-width: 1024px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-16);
		}
	}

	@container error-page (min-width: 1280px) {
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

<div class="error">
	<div class="container">
		<h1>{page.status}</h1>
		<p>{errorMessage}</p>
		<a href={resolve('/')}>Return home</a>
	</div>
</div>
