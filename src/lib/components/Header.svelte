<script lang="ts">
	import { page } from '$app/stores';
</script>

<header class="site-header">
	<div class="header-content">
		<div class="header-main">
			<a href="/" class="title">Limitless Developer</a>
			<nav class="header-nav" aria-label="Main navigation">
				<a href="/" class:active={$page.url.pathname === '/'}>Home</a>
				<a href="/blog" class:active={$page.url.pathname === '/blog'}>Blog</a>
				<a href="/projects" class:active={$page.url.pathname === '/projects'}
					>Projects</a
				>
				<a href="/resources" class:active={$page.url.pathname === '/resources'}
					>Resources</a
				>
			</nav>
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
		--header-height: calc(var(--space-4) * 4);

		position: sticky;
		z-index: 10;
		top: 0;

		container-type: inline-size;

		width: 100%;
		padding-block: var(--space-4);
		border-bottom: var(--border-width) solid var(--border-color);

		color: var(--text-color);

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
		grid-template-columns: auto 1fr;
		gap: var(--space-4);
		align-items: center;

		@container (width < 600px) {
			grid-template-columns: 1fr;
			gap: var(--space-4);
			justify-items: center;
		}
	}

	.title {
		font-family: var(--font-mono);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
		text-decoration: none;

		transition: color var(--transition-duration) var(--transition-timing);
	}

	.title:hover {
		color: var(--accent-color);
	}

	.header-nav {
		display: flex;
		gap: var(--space-4);
		justify-content: flex-end;

		& a {
			padding: var(--space-2) var(--space-4);
			border-radius: var(--radius-sm);

			font-size: var(--font-size-base);
			color: var(--text-muted);
			text-decoration: none;

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

		@container (width < 600px) {
			gap: var(--space-4);
			justify-content: center;
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
		content: '';

		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 2px;

		opacity: 0.5;
		background: linear-gradient(
			90deg,
			var(--accent-color),
			var(--secondary-accent)
		);
	}

	.container {
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		padding-inline: var(--space-4);

		font-size: var(--font-size-sm);
		color: var(--text-muted);
		text-align: center;

		opacity: 0.9;
	}
</style>
