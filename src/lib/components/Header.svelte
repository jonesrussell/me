<script lang="ts">
	import DesktopNav from './DesktopNav.svelte';
	import MobileNav from './MobileNav.svelte';

	const { url } = $props<{ url: URL }>();

	let isMobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<header class="site-header">
	<div class="header-content">
		<div class="header-main">
			<a href="/" class="title">Limitless Developer</a>
			<button
				class="menu-toggle"
				type="button"
				onclick={toggleMobileMenu}
				aria-expanded={isMobileMenuOpen}
			>
				<span class="menu-icon">☰</span>
				<span class="sr-only">Toggle menu</span>
			</button>
			<DesktopNav {url} />
			<MobileNav
				{url}
				isOpen={isMobileMenuOpen}
				toggleMenu={toggleMobileMenu}
			/>
		</div>
	</div>
	<div class="subtitle-bar">
		<div class="container">
			Building elegant solutions with modern web technologies
		</div>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		z-index: 10;
		top: 0;
		width: 100%;
		padding-block: var(--space-4);
		border-bottom: var(--border-width) solid var(--border-color);
		background: var(--bg-color);
		box-shadow: var(--shadow-sm);
	}

	.header-content {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		padding-inline: var(--space-4);
	}

	.header-main {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--space-4);
		align-items: center;
		position: relative;
		container-type: inline-size;
	}

	.menu-toggle {
		display: flex;
		width: 2.5rem;
		height: 2.5rem;
		padding: var(--space-2);
		color: var(--text-color);
		background: transparent;
		border: none;
		transition: all var(--transition-duration) var(--transition-timing);
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 20;
	}

	.menu-toggle:hover {
		color: var(--accent-color);
	}

	.menu-icon {
		font-size: var(--font-size-xl);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	.title {
		font-family: var(--font-mono);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		text-decoration: none;
		color: var(--text-color);
		transition: color var(--transition-duration) var(--transition-timing);
	}

	.title:hover {
		color: var(--accent-color);
	}

	@container (width > 48ch) {
		.menu-toggle {
			display: none;
		}
	}

	.subtitle-bar {
		position: relative;
		width: 100%;
		margin-top: var(--space-4);
		padding-block: var(--space-4);
		border-bottom: var(--border-width) solid var(--border-color);
		background: var(--bg-darker);
	}

	.subtitle-bar::before {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(
			90deg,
			var(--accent-color),
			var(--secondary-accent)
		);
		opacity: 0.5;
		content: '';
	}

	.container {
		font-size: var(--font-size-sm);
		text-align: center;
		color: var(--text-muted);
		opacity: 0.9;
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		padding-inline: var(--space-4);
	}

	@media (prefers-reduced-motion: reduce) {
		.menu-toggle,
		.title {
			transition: none;
		}
	}
</style>
