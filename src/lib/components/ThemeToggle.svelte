<script lang="ts">
	let theme = 'light';

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<button class="theme-toggle" on:click={toggleTheme}>
	[{theme === 'light' ? '☀' : '☾'}]
</button>

<style>
	.theme-toggle {
		font-family: var(--font-mono);
		background: transparent;
		border: none;
		color: var(--text-color);
		cursor: pointer;
		padding: var(--ch) var(--ch2);
	}

	.theme-toggle:hover {
		color: var(--text-muted);
	}
</style>
