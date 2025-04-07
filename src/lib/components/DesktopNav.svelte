<script lang="ts">
	const { url } = $props<{ url: URL }>();

	let currentPath = $state(url?.pathname ?? '/');

	$effect(() => {
		if (url) {
			currentPath = url.pathname;
		}
	});
</script>

<nav class="desktop-nav" aria-label="Main navigation">
	<a href="/" class:active={currentPath === '/'}>Home</a>
	<a href="/blog" class:active={currentPath === '/blog'}>Blog</a>
	<a href="/projects" class:active={currentPath === '/projects'}>Projects</a>
	<a href="/resources" class:active={currentPath === '/resources'}>Resources</a>
</nav>

<style>
	.desktop-nav {
		display: none;
	}

	@container (width > 48ch) {
		.desktop-nav {
			display: flex;
			flex-direction: row;
			gap: var(--space-4);
			justify-content: flex-end;
			z-index: 15;
		}

		.desktop-nav a {
			padding: var(--space-2) var(--space-4);
			font-family: var(--font-mono);
			font-size: var(--font-size-sm);
			text-decoration: none;
			color: var(--text-muted);
			border-radius: var(--radius-md);
			transition: all var(--transition-duration) var(--transition-timing);
		}

		.desktop-nav a:hover {
			color: var(--text-color);
			background: var(--bg-darker);
		}

		.desktop-nav a.active {
			color: var(--accent-color);
			background: var(--bg-darker);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.desktop-nav a {
			transition: none;
		}
	}
</style>
