<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
</script>

<header class="site-header" role="banner">
	<div class="header-content">
		<div class="header-main">
			<h1 class="title">
				<a href="{base}/" aria-label="Russell Jones - Home">Russell Jones</a>
			</h1>
			<nav class="header-nav" aria-label="Main navigation">
				<a
					href="{base}/blog"
					class:active={$page.url.pathname.startsWith('/blog')}
					aria-current={$page.url.pathname.startsWith('/blog')
						? 'page'
						: undefined}
				>
					Blog
				</a>
				<a
					href="{base}/projects"
					class:active={$page.url.pathname.startsWith('/projects')}
					aria-current={$page.url.pathname.startsWith('/projects')
						? 'page'
						: undefined}
				>
					Projects
				</a>
				<a
					href="{base}/resources"
					class:active={$page.url.pathname.startsWith('/resources')}
					aria-current={$page.url.pathname.startsWith('/resources')
						? 'page'
						: undefined}
				>
					Resources
				</a>
				<a
					href="{base}/contact"
					class:active={$page.url.pathname.startsWith('/contact')}
					aria-current={$page.url.pathname.startsWith('/contact')
						? 'page'
						: undefined}
				>
					Contact
				</a>
			</nav>
		</div>
	</div>
</header>

<div class="subtitle-bar" role="complementary" aria-label="Developer title">
	<div class="container">
		<h2 class="subtitle">Limitless Developer</h2>
	</div>
</div>

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

	.subtitle-bar {
		background: var(--bg-darker);
		width: 100%;
		padding: var(--ch) 0;
	}

	.container {
		max-width: min(var(--measure), 95vw);
		margin: 0 auto;
		padding: 0 var(--ch2);
		color: var(--text-muted);
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

	.brand {
		display: flex;
		flex-direction: column;
		gap: var(--ch-half);
	}

	.title {
		margin: 0;
		font-size: inherit;
		font-weight: bold;
	}

	.title a {
		color: var(--text-color);
		text-decoration: none;
	}

	.subtitle {
		margin: 0;
		font-size: inherit;
		font-weight: normal;
		color: inherit;
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

		.brand {
			align-items: center;
		}

		.header-nav {
			gap: var(--ch4);
		}
	}
</style>
