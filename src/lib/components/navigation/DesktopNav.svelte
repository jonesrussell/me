<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';

	const { url = page.url } = $props<{ url?: URL }>();

	let currentPath = $derived(url.pathname);

	function isActive(path: string) {
		const basePath = base || '';
		const normalizedPath = path.startsWith('/') ? path : `/${path}`;
		const normalizedCurrentPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;

		return (
			normalizedCurrentPath === normalizedPath ||
			normalizedCurrentPath === `${normalizedPath}/` ||
			normalizedCurrentPath === `${basePath}${normalizedPath}` ||
			normalizedCurrentPath === `${basePath}${normalizedPath}/`
		);
	}
</script>

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
			align-items: center;
			z-index: 15;
			flex-wrap: nowrap;
		}

		.desktop-nav a {
			padding: var(--space-2) var(--space-4);
			font-family: var(--font-mono);
			font-size: var(--font-size-sm);
			text-decoration: none;
			color: var(--text-muted);
			border-radius: var(--radius-md);
			transition: all var(--transition-duration) var(--transition-timing);
			white-space: nowrap;
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

	@media (forced-colors: active) {
		.desktop-nav a {
			border: 0.0625rem solid CanvasText;
		}

		.desktop-nav a:hover,
		.desktop-nav a.active {
			color: CanvasText;
			background: Canvas;
			border-color: Highlight;
		}
	}
</style>

<nav class="desktop-nav" aria-label="Main navigation">
	<a href={`${base}/blog`} class:active={isActive('/blog')}>Blog</a>
	<a href={`${base}/projects`} class:active={isActive('/projects')}>Projects</a>
	<a href={`${base}/resources`} class:active={isActive('/resources')}>Resources</a>
	<a href={`${base}/contact`} class:active={isActive('/contact')}>Contact</a>
</nav>
