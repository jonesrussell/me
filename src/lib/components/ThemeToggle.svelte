<script lang="ts">
	import { darkMode } from '../stores';

	function toggleTheme() {
		$darkMode = !$darkMode;
		document.documentElement.setAttribute('data-theme', $darkMode ? 'dark' : 'light');
	}
</script>

<button on:click={toggleTheme} class="theme-toggle" aria-label="Toggle theme">
	{#if $darkMode}
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
