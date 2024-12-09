<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import { base } from '$app/paths';
	import { alignToGrid } from '$lib/utils/grid';

	const headerWidth = alignToGrid(80);
</script>

<header class="site-header">
	<div class="header-content" style="--header-width: {headerWidth}ch">
		<span class="title">Russell Jones</span>
		<nav class="header-nav">
			<a href="{base}/">Home</a>
			<a href="{base}/blog">Blog</a>
			<a href="{base}/resources">Resources</a>

			<ThemeToggle />
		</nav>
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
	}

	.header-content {
		width: var(--header-width);
		margin: 0 auto;
		padding: 0 var(--ch2);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--ch2);
	}

	.title {
		font-weight: bold;
		white-space: nowrap;
	}

	.header-nav {
		display: flex;
		gap: var(--ch4);
		align-items: center;
	}

	.header-nav a {
		color: var(--text-color);
		text-decoration: none;
		white-space: nowrap;
	}

	.header-nav a:hover {
		text-decoration: underline;
	}
</style>
