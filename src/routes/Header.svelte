<script lang="ts">
	import { page } from '$app/stores';

	const title = $state('Limitless Developer');
	const navItems = $state([
		{ href: '/blog', text: 'Blog' },
		{ href: '/projects', text: 'Projects' },
		{ href: '/resources', text: 'Resources' },
		{ href: '/contact', text: 'Contact' }
	]);

	const isActive = $derived((path: string) => $page.url.pathname === path);
</script>

<header class="site-header">
	<div class="header-content">
		<div class="header-main">
			<a href="/" class="title">Russell Jones</a>
			<nav class="header-nav" aria-label="Main navigation">
				{#each navItems as item}
					<a href={item.href} class:active={isActive(item.href)}>{item.text}</a>
				{/each}
			</nav>
		</div>
	</div>
</header>

<div class="subtitle-bar">
	<div class="container">
		{title}
	</div>
</div>

<style>
	.site-header {
		--header-height: calc(var(--ch) * 4);

		container-type: inline-size;
		position: sticky;
		top: 0;
		z-index: 10;
		width: 100%;
		background: var(--bg-color);
		color: var(--text-color);
		border-bottom: var(--border-width) solid var(--border-color);
		padding-block: var(--ch);
	}

	.header-content {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		padding-inline: var(--ch2);
		margin-inline: auto;
		color: var(--text-color);
	}

	.header-main {
		display: grid;
		gap: var(--ch4);
		align-items: center;
		grid-template-columns: auto 1fr;
	}

	.title {
		color: var(--text-color);
		font-family: var(--font-mono);
		font-size: var(--font-size-lg);
		font-weight: 500;
		text-decoration: none;
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

			&:hover,
			&.active {
				color: var(--text-color);
				background-color: var(--bg-darker);
			}
		}
	}

	.subtitle-bar {
		background: var(--bg-darker);
		border-bottom: var(--border-width) solid var(--border-color);
		padding-block: var(--ch);
	}

	.container {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		color: var(--text-muted);
		font-size: var(--font-size-base);
		text-align: center;
		padding-inline: var(--ch2);
		margin-inline: auto;
	}

	@media (width <= var(--mobile-breakpoint)) {
		.header-main {
			flex-direction: column;
			gap: var(--ch);
		}

		.header-nav {
			gap: var(--ch2);
		}
	}
</style>
