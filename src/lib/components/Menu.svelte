<script lang="ts">
	const { url, isMobileMenuOpen, toggleMobileMenu } = $props<{
		url: URL;
		isMobileMenuOpen: boolean;
		toggleMobileMenu: () => void;
	}>();

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

<nav
	class="mobile-nav"
	class:open={isMobileMenuOpen}
	aria-label="Main navigation"
>
	<a href="/" class:active={currentPath === '/'} onclick={toggleMobileMenu}
		>Home</a
	>
	<a
		href="/blog"
		class:active={currentPath === '/blog'}
		onclick={toggleMobileMenu}>Blog</a
	>
	<a
		href="/projects"
		class:active={currentPath === '/projects'}
		onclick={toggleMobileMenu}>Projects</a
	>
	<a
		href="/resources"
		class:active={currentPath === '/resources'}
		onclick={toggleMobileMenu}>Resources</a
	>
</nav>

<style>
	/* Container queries for responsive layout */
	@container (width > 48ch) {
		.desktop-nav {
			display: flex;
			flex-direction: row;
			gap: var(--space-4);
			justify-content: flex-end;
			z-index: 15;

			& a {
				padding: var(--space-2) var(--space-4);
				font-size: var(--font-size-base);
				text-decoration: none;
				color: var(--text-muted);
				border-radius: var(--radius-sm);
				transition: all var(--transition-duration) var(--transition-timing);

				&:hover {
					color: var(--text-color);
					background: var(--color-mix-light);
				}

				&.active {
					color: var(--accent-color);
					background: var(--color-mix-light);
				}
			}
		}

		.mobile-nav {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.desktop-nav a,
		.mobile-nav a {
			transition: none;
		}
	}

	/* Base mobile styles */
	.desktop-nav {
		display: none;
	}

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

		&.open {
			display: flex;
			opacity: 1;
			visibility: visible;
			transform: translateY(0);
		}

		& a {
			width: 100%;
			padding: var(--space-3) var(--space-4);
			font-size: var(--font-size-base);
			text-align: center;
			text-decoration: none;
			color: var(--text-muted);
			border-radius: var(--radius-sm);
			transition: all var(--transition-duration) var(--transition-timing);

			&:hover {
				color: var(--text-color);
				background: var(--color-mix-light);
			}

			&.active {
				color: var(--accent-color);
				background: var(--color-mix-light);
			}
		}
	}
</style>
