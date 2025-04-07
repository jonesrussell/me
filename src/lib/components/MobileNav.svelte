<script lang="ts">
	const { url, isOpen, toggleMenu } = $props<{
		url: URL;
		isOpen: boolean;
		toggleMenu: () => void;
	}>();

	let currentPath = $state(url?.pathname ?? '/');

	$effect(() => {
		if (url) {
			currentPath = url.pathname;
		}
	});
</script>

<nav class="mobile-nav" class:open={isOpen} aria-label="Main navigation">
	<a href="/" class:active={currentPath === '/'} onclick={toggleMenu}>Home</a>
	<a href="/blog" class:active={currentPath === '/blog'} onclick={toggleMenu}
		>Blog</a
	>
	<a
		href="/projects"
		class:active={currentPath === '/projects'}
		onclick={toggleMenu}>Projects</a
	>
	<a
		href="/resources"
		class:active={currentPath === '/resources'}
		onclick={toggleMenu}>Resources</a
	>
</nav>

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
		border-radius: var(--radius-sm);
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
		font-size: var(--font-size-base);
		text-align: center;
		text-decoration: none;
		color: var(--text-muted);
		border-radius: var(--radius-sm);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.mobile-nav a:hover {
		color: var(--text-color);
		background: var(--color-mix-light);
	}

	.mobile-nav a.active {
		color: var(--accent-color);
		background: var(--color-mix-light);
	}

	@media (prefers-reduced-motion: reduce) {
		.mobile-nav a {
			transition: none;
		}
	}
</style>
