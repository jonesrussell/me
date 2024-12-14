<script lang="ts">
	import { base } from '$app/paths';
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
			</nav>
		</div>
	</div>
</header>

<style>
	.site-header {
		border-bottom: 1px solid var(--border-color);
		padding: var(--ch) 0;
		background: var(--bg-color);
		color: var(--text-color);
		width: 100%;
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
	}

	.title {
		font-weight: bold;
		color: var(--text-color);
		text-decoration: none;
	}

	.header-nav {
		display: flex;
		gap: var(--ch3);
	}

	.header-nav a {
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.header-nav a:hover {
		color: var(--text-color);
		text-decoration: none;
	}

	.header-nav a.active {
		color: var(--text-color);
	}

	@media (max-width: 600px) {
		.header-main {
			flex-direction: column;
			align-items: center;
			gap: var(--ch);
		}

		.header-nav {
			gap: var(--ch4);
		}
	}
</style>
