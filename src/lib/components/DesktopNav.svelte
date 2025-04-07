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
			font-size: var(--font-size-base);
			text-decoration: none;
			color: var(--text-muted);
			border-radius: var(--radius-sm);
			transition: all var(--transition-duration) var(--transition-timing);
		}

		.desktop-nav a:hover {
			color: var(--text-color);
			background: var(--color-mix-light);
		}

		.desktop-nav a.active {
			color: var(--accent-color);
			background: var(--color-mix-light);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.desktop-nav a {
			transition: none;
		}
	}
</style>
