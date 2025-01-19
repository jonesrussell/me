<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	type NavItem = {
		href: string;
		label: string;
		isActive: boolean;
	};

	const navItems: NavItem[] = [
		{
			href: '/blog',
			label: 'Blog',
			isActive: $page.url.pathname.startsWith('/blog')
		},
		{
			href: '/content',
			label: 'Content',
			isActive: $page.url.pathname.startsWith('/content')
		},
		{
			href: '/resources',
			label: 'Resources',
			isActive: $page.url.pathname.startsWith('/resources')
		},
		{
			href: '/contact',
			label: 'Contact',
			isActive: $page.url.pathname.startsWith('/contact')
		}
	];
</script>

<header class="site-header">
	<div class="header-content">
		<div class="header-main">
			<a href="{base}/" class="title">Russell Jones</a>
			<nav class="header-nav" aria-label="Main navigation">
				{#each navItems as { href, label, isActive }}
					<a
						href="{base}{href}"
						class:active={isActive}
						aria-current={isActive ? 'page' : undefined}
					>
						{label}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</header>

<div class="subtitle-bar">
	<div class="container">Limitless Developer</div>
</div>

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
		border-bottom: calc(1 * var(--ch) / 16) solid var(--border-color);
		padding-block: var(--ch);
	}

	.subtitle-bar {
		width: 100%;
		background: var(--bg-darker);
		padding-block: var(--ch);
	}

	.container {
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		padding-inline: var(--ch2);
		color: var(--text-muted);
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
		font-weight: var(--font-weight-bold);
		text-decoration: none;
	}

	.header-nav {
		display: flex;
		gap: var(--ch3);
		justify-content: flex-end;

		& a {
			color: var(--text-muted);
			text-decoration: none;
			transition: color 0.2s ease;

			&:hover {
				color: var(--text-color);
			}

			&.active {
				color: var(--text-color);
			}
		}

		@container (width < 600px) {
			gap: var(--ch4);
			justify-content: center;
		}
	}
</style>
