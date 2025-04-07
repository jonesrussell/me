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
		--header-height: calc(var(--ch) * 4);

		position: sticky;
		top: 0;
		z-index: 10;
		width: 100%;
		background: var(--bg-color);
		color: var(--text-color);
		container-type: inline-size;
		border-bottom: var(--border-width) solid var(--border-color);
		padding-block: var(--ch);
		box-shadow: var(--shadow-sm);
	}

	.header-content {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		padding-inline: var(--ch2);
		margin-inline: auto;
	}

	.header-main {
		display: grid;
		gap: var(--ch4);
		align-items: center;
		grid-template-columns: auto 1fr;

		@container (width < 600px) {
			grid-template-columns: 1fr;
			justify-items: center;
			gap: var(--ch);
		}
	}

	.title {
		color: var(--text-color);
		font-family: var(--font-mono);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		text-decoration: none;
		transition: color var(--transition-duration) var(--transition-timing);
	}

	.title:hover {
		color: var(--accent-color);
	}

	.header-nav {
		display: flex;
		gap: var(--ch3);
		justify-content: flex-end;

		& a {
			padding: var(--ch) var(--ch2);
			border-radius: var(--radius-sm);
			color: var(--text-muted);
			font-size: var(--font-size-base);
			text-decoration: none;
			transition: all var(--transition-duration) var(--transition-timing);

			&:hover {
				background: var(--color-mix-light);
				color: var(--text-color);
			}

			&.active {
				background: var(--color-mix-light);
				color: var(--accent-color);
			}
		}

		@container (width < 600px) {
			gap: var(--ch2);
			justify-content: center;
		}
	}

	.subtitle-bar {
		position: relative;
		width: 100%;
		margin-top: var(--ch);
		background: var(--bg-darker);
		padding-block: var(--ch);
		border-bottom: var(--border-width) solid var(--border-color);
	}

	.subtitle-bar::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 0.125ch;
		background: linear-gradient(
			90deg,
			var(--accent-color),
			var(--secondary-accent)
		);
		opacity: 0.5;
	}

	.container {
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		padding-inline: var(--ch2);
		color: var(--text-muted);
		font-size: var(--font-size-sm);
		text-align: center;
		opacity: 0.9;
	}
</style>
