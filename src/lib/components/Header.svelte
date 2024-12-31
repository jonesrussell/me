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
			href: '/projects',
			label: 'Projects',
			isActive: $page.url.pathname.startsWith('/projects')
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
		container-type: inline-size;
		border-bottom: 1px solid var(--border-color);
		padding-block: var(--ch);
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
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: var(--ch4);

		@container (width < 600px) {
			grid-template-columns: 1fr;
			justify-items: center;
			gap: var(--ch);
		}
	}

	.title {
		font-weight: bold;
		color: var(--text-color);
		text-decoration: none;
		font-family: 'Fira Code', monospace;
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
