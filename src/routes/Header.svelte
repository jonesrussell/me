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
		border-bottom: 1px solid var(--border-color);
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
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: var(--ch4);
	}

	.title {
		color: var(--text-color);
		font-family: var(--font-mono);
		text-decoration: none;
		font-size: var(--font-size-base);
	}

	.header-nav {
		display: flex;
		gap: var(--ch3);
		justify-content: flex-end;

		& a {
			color: var(--text-muted);
			text-decoration: none;
			font-size: var(--font-size-base);

			&:hover,
			&.active {
				color: var(--text-color);
			}
		}
	}

	.subtitle-bar {
		background: var(--bg-darker);
		border-bottom: 1px solid var(--border-color);
		padding-block: var(--ch);
	}

	.container {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		padding-inline: var(--ch2);
		margin-inline: auto;
		color: var(--text-muted);
		text-align: center;
		font-size: var(--font-size-base);
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
