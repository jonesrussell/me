<script lang="ts">
	export const devToUrl = 'https://dev.to/jonesrussell' as const;
</script>

<style>
	.attribution {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.attribution a {
		color: var(--accent-color);
		text-decoration: none;
	}

	.attribution a:hover {
		text-decoration: underline;
	}
</style>

<p class="attribution">
	syndicated from:
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a href="https://jonesrussell.github.io/blog/" target="_blank" rel="noopener noreferrer">jonesrussell.github.io/blog</a>
	→
	<a href={devToUrl} target="_blank" rel="noopener noreferrer">dev.to/jonesrussell</a>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
</p>
