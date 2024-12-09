<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { base } from '$app/paths';
</script>

<header class="site-header">
	<div class="header-content">
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
		padding: 1rem;
		background: var(--header-bg);
		color: var(--header-text);
		width: 100%;
	}

	.header-content {
		max-width: var(--measure);
		margin: 0 auto;
		padding: 0 clamp(1rem, 5%, 2rem);
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
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
