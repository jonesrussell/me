<script lang="ts">
	import DesktopNav from '$lib/components/navigation/DesktopNav.svelte';
	import MobileNav from '$lib/components/navigation/MobileNav.svelte';
	import SubtitleBar from './SubtitleBar.svelte';

	const { url, base = '/' } = $props<{
		url: URL;
		base?: string;
	}>();

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
		padding-block: var(--space-4, 1rem);
		border-bottom: var(--border-width, 1px) solid var(--border-color, #e5e7eb);
		background: var(--bg-color, #ffffff);
		box-shadow: var(--shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05));
	}

	.header-content {
		width: 100%;
		max-width: min(var(--measure, 65ch), 95cqi);
		margin-inline: auto;
		padding-inline: var(--space-4, 1rem);
	}

	.header-main {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--space-4, 1rem);
		align-items: center;
		position: relative;
	}

	.menu-toggle {
		display: flex;
		width: 2.5rem;
		height: 2.5rem;
		padding: var(--space-2, 0.5rem);
		color: var(--text-color, #000000);
		background: transparent;
		border: none;
		transition: all var(--transition-duration, 0.2s) var(--transition-timing, ease);
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 20;
	}

	.menu-toggle:hover {
		color: var(--accent-color, #3b82f6);
	}

	.menu-icon {
		font-size: var(--font-size-xl, 1.25rem);
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

	@media (min-width: 48ch) {
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
			<a href={base} class="title">Russell Jones</a>
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
			<MobileNav {url} isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
		</div>
	</div>
	<SubtitleBar />
</header>
