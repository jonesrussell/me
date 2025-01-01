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
	header {
		padding: var(--ch2);
		border-bottom: 1px solid var(--border-color);
		background: var(--bg-darker);
		font-family: 'Fira Code', monospace;
	}

	.brand {
		width: fit-content;
		font-size: 1.2em;
	}

	.title {
		width: fit-content;
		margin-top: var(--ch-half);
		color: var(--text-muted);
		font-size: 0.9em;
	}

	nav {
		display: flex;
		gap: var(--ch4);
		width: fit-content;
		margin-top: var(--ch2);
	}

	nav a {
		display: inline-block;
		width: var(--ch10);
		color: var(--text-color);
		font-family: inherit;
		text-decoration: none;
		white-space: pre;
	}

	nav a:hover {
		color: var(--link-color);
	}
</style>
