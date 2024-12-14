<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import { base } from '$app/paths';
	import { alignToGrid } from '$lib/utils/grid';
	import { page } from '$app/stores';
</script>

<header class="site-header">
	<div class="header-content">
		<div class="header-main">
			<a href="{base}/" class="title">Russell Jones</a>
			<nav class="header-nav" aria-label="Main navigation">
				<a
					href="{base}/blog"
					class:active={$page.url.pathname.startsWith('/blog')}
				>
					Blog
				</a>
				<a
					href="{base}/projects"
					class:active={$page.url.pathname.startsWith('/projects')}
				>
					Projects
				</a>
				<a
					href="{base}/contact"
					class:active={$page.url.pathname.startsWith('/contact')}
				>
					Contact
				</a>

				<ThemeToggle />
			</nav>
		</div>
	</div>
</header>

<style>
	.site-header {
		border-bottom: 1px solid var(--border-color);
		padding: var(--ch2) 0;
		background: var(--header-bg);
		color: var(--header-text);
		width: 100%;
		line-height: 1.2;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.header-content {
		width: 100%;
		max-width: min(var(--measure), 95vw);
		padding: 0 var(--ch2);
		margin: 0 auto;
	}

	.header-main {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--ch2);
	}

	.title {
		font-weight: bold;
		white-space: nowrap;
		color: var(--header-text);
		text-decoration: none;
	}

	.title:hover {
		color: var(--link-hover);
	}

	.header-nav {
		display: flex;
		gap: var(--ch2);
		align-items: center;
		flex-wrap: wrap;
	}

	.header-nav a {
		color: var(--text-color);
		text-decoration: none;
		white-space: nowrap;
		padding: var(--ch) var(--ch2);
		border-radius: 2px;
		transition: background-color 0.2s ease;
	}

	.header-nav a:hover {
		background: color-mix(in srgb, var(--text-color) 10%, transparent);
	}

	.header-nav a.active {
		color: var(--link-color);
		font-weight: var(--font-weight-medium);
	}

	/* Mobile navigation */
	@media (max-width: 40ch) {
		.header-main {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--ch);
		}

		.header-nav {
			width: 100%;
			gap: var(--ch);
		}
	}
</style>
