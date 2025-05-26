<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';

	const {
		url = page.url,
		isOpen,
		toggleMenu
	} = $props<{
		url?: URL;
		isOpen: boolean;
		toggleMenu: () => void;
	}>();

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
	.mobile-nav {
		display: none;
		position: fixed;
		top: calc(var(--space-4) * 2 + 2.5rem);
		right: var(--space-4);
		left: var(--space-4);
		padding: var(--space-4);
		background: var(--bg-color);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
		opacity: 0;
		visibility: hidden;
		transition:
			opacity var(--transition-duration) var(--transition-timing),
			transform var(--transition-duration) var(--transition-timing),
			visibility var(--transition-duration) var(--transition-timing);
		transform: translateY(-10px);
		flex-direction: column;
		gap: var(--space-2);
		z-index: 15;
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
	}

	.mobile-nav.open {
		display: flex;
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}

	.mobile-nav a {
		width: 100%;
		padding: var(--space-3) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-align: center;
		text-decoration: none;
		color: var(--text-muted);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.mobile-nav a:hover {
		color: var(--text-color);
		background: var(--bg-darker);
	}

	.mobile-nav a.active {
		color: var(--accent-color);
		background: var(--bg-darker);
	}

	@media (prefers-reduced-motion: reduce) {
		.mobile-nav a {
			transition: none;
		}
	}
</style>

<nav class="mobile-nav" class:open={isOpen} aria-label="Main navigation">
	<a href={`${base}/blog`} class:active={isActive('/blog')} onclick={toggleMenu}>Blog</a>
	<a href={`${base}/projects`} class:active={isActive('/projects')} onclick={toggleMenu}>Projects</a
	>
	<a href={`${base}/resources`} class:active={isActive('/resources')} onclick={toggleMenu}
		>Resources</a
	>
	<a href={`${base}/contact`} class:active={isActive('/contact')} onclick={toggleMenu}>Contact</a>
</nav>
