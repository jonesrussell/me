<script lang="ts">
	import { theme } from '$lib/stores';

	function toggleTheme() {
		$theme = !$theme;
		document.documentElement.setAttribute('data-theme', $theme ? 'dark' : 'light');
	}
</script>

<button on:click={toggleTheme} class="theme-toggle" aria-label="Toggle theme">
	{#if $theme}
		🌞
	{:else}
		🌙
	{/if}
</button>

<style>
	.theme-toggle {
		background: none;
		border: 1px solid var(--border-color);
		padding: 0.5rem;
		cursor: pointer;
		border-radius: 4px;
		font-size: 1.2rem;
	}

	.theme-toggle:hover {
		background: var(--border-color);
	}
</style>
