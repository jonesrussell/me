<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import { base } from '$app/paths';
</script>

<header class="site-header">
	<div class="header-content">
		<span class="title">Russell Jones</span>
		<nav class="header-nav">
			<a href="{base}/blog">Blog</a>
			<a href="{base}/about">About</a>
			<a href="https://github.com/jonesrussell">GitHub</a>
			<a href="{base}/dev-resources">Dev Resources</a>
			<ThemeToggle />
		</nav>
	</div>
</header>

<style>
	.site-header {
		border-bottom: 1px solid var(--border-color);
		padding: 1rem 0;
		background: var(--header-bg);
		color: var(--header-text);
	}

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		font-weight: bold;
		font-size: 1.2rem;
	}

	.header-nav {
		display: flex;
		gap: 2rem;
	}

	.header-nav a {
		color: var(--text-color);
		text-decoration: none;
	}

	.header-nav a:hover {
		text-decoration: underline;
	}
</style>
