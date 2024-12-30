<script lang="ts">
	const title = 'Limitless Developer';
</script>

<header>
	<div class="brand">Russell Jones</div>
	<div class="title">{title}</div>
	<nav>
		<a href="/blog">Blog</a>
		<a href="/projects">Projects</a>
		<a href="/resources">Resources</a>
		<a href="/contact">Contact</a>
	</nav>
</header>

<style>
	header {
		padding: var(--ch2);
		border-bottom: 1px solid var(--border-color);
		background: var(--bg-darker);
	}

	.brand {
		font-family: 'Fira Code', monospace;
		font-size: 1.2em;
	}

	.title {
		color: var(--text-muted);
		font-size: 0.9em;
		margin-top: var(--ch-half);
	}

	nav {
		margin-top: var(--ch2);
		display: flex;
		gap: var(--ch2);
	}

	nav a {
		color: var(--text-color);
		text-decoration: none;
	}

	nav a:hover {
		color: var(--link-color);
	}
</style>
