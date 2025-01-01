<script lang="ts">
	const title = 'Limitless Developer';
	const navItems = [
		{ href: '/blog', text: 'Blog      ' },
		{ href: '/projects', text: 'Projects  ' },
		{ href: '/resources', text: 'Resources ' },
		{ href: '/contact', text: 'Contact   ' }
	];
</script>

<header>
	<div class="brand">Russell Jones</div>
	<div class="title">{title}</div>
	<nav>
		{#each navItems as item}
			<a href={item.href}>{item.text}</a>
		{/each}
	</nav>
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
		border-bottom: 1px solid var(--border-color);
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
