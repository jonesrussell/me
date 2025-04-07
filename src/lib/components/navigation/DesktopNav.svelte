<script lang="ts">
	import { page } from '$app/stores';

	const { url = $page.url } = $props<{ url?: URL }>();

	let currentPath = $state(url.pathname);

	$effect(() => {
		currentPath = url.pathname;
	});

	function isActive(path: string) {
		return (
			currentPath === path ||
			currentPath === `${path}/` ||
			currentPath === `/me${path}` ||
			currentPath === `/me${path}/`
		);
	}
</script>

<nav class="desktop-nav" aria-label="Main navigation">
	<a href="/blog" class:active={isActive('/blog')}>Blog</a>
	<a href="/projects" class:active={isActive('/projects')}>Projects</a>
	<a href="/resources" class:active={isActive('/resources')}>Resources</a>
	<a href="/contact" class:active={isActive('/contact')}>Contact</a>
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
