<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import type { PageData } from './$types';

	// Using $derived with page object directly
	const isNotFound = $derived(page.status === 404);
	const errorMessage = $derived(
		isNotFound ? 'Page not found' : page.error?.message || 'Something went wrong'
	);
</script>

<style>
	.error {
		display: grid;
		gap: var(--space-4);
		padding: var(--space-16);
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

	@media (prefers-reduced-motion: reduce) {
		a {
			transition: none;
		}
	}
</style>

<div class="error">
	<h1>{page.status}</h1>
	<p>{errorMessage}</p>
	<a href={`${base}`}>Return home</a>
</div>
