<script lang="ts">
	import DesktopNav from '$lib/components/navigation/DesktopNav.svelte';
	import MobileNav from '$lib/components/navigation/MobileNav.svelte';
	import SubtitleBar from './SubtitleBar.svelte';
	import ThemeToggle from '../ThemeToggle.svelte';
	import { base } from '$app/paths';

	const { url } = $props<{ url: URL }>();

	let isMobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<style>
	.site-header {
		position: sticky;
		z-index: 10;
		top: 0;
		width: 100%;
		padding-block-start: var(--space-4);
		padding-block-end: 0;
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
		container-type: inline-size;
		display: grid;
		position: relative;
		grid-template-columns: auto 1fr auto;
		gap: var(--space-4);
		align-items: center;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		justify-self: end;
	}

	.nav-container {
		justify-self: end;
		margin-right: var(--space-4);
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

	@media (prefers-reduced-motion: reduce) {
		.menu-toggle,
		.title {
			transition: none;
		}
	}
</style>

<header class="site-header">
	<div class="header-content">
		<div class="header-main">
			<a href={base || '/'} class="title">Russell Jones</a>
			<div class="nav-container">
				<DesktopNav {url} />
			</div>
			<div class="header-right">
				<ThemeToggle />
				<button
					class="menu-toggle"
					type="button"
					onclick={toggleMobileMenu}
					aria-expanded={isMobileMenuOpen}
				>
					<span class="menu-icon">☰</span>
					<span class="sr-only">Toggle menu</span>
				</button>
			</div>
			<MobileNav {url} isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
		</div>
	</div>
	<SubtitleBar />
</header>
