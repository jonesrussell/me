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
		font-size: 1.2em;
		width: fit-content;
	}

	.title {
		color: var(--text-muted);
		font-size: 0.9em;
		margin-top: var(--ch-half);
		width: fit-content;
	}

	nav {
		margin-top: var(--ch2);
		display: flex;
		gap: var(--ch4);
		width: fit-content;
	}

	nav a {
		color: var(--text-color);
		text-decoration: none;
		font-family: inherit;
		white-space: pre;
		width: var(--ch10);
		display: inline-block;
	}

	nav a:hover {
		color: var(--link-color);
	}
</style>
