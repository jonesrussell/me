<script lang="ts">
	import { themeState, setTheme, type Theme } from '$lib/stores/theme.svelte';
	import Icon from '@iconify/svelte';

	const themes: { value: Theme; label: string }[] = [
		{ value: 'auto', label: 'Auto' },
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' }
	];

	function handleThemeChange(value: Theme) {
		setTheme(value);
	}
</script>

<style>
	.toggle {
		display: flex;
		flex-shrink: 0;
		padding: var(--space-2);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		gap: var(--space-2);
		align-items: center;
	}

	.button {
		display: flex;
		flex-shrink: 0;
		position: relative;
		min-width: 2.5rem;
		min-height: 2.5rem;
		padding: var(--space-2);
		color: var(--text-muted);
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		transition: all var(--transition-duration) var(--transition-timing);
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.button:hover {
		color: var(--text-color);
		background: var(--bg-color);
	}

	.button.active {
		color: var(--accent-color);
		background: var(--bg-color);
	}

	.button:focus-visible {
		outline: 0.125rem solid var(--accent-color);
		outline-offset: 0.125rem;
	}

	.button :global(svg) {
		flex-shrink: 0;
		width: 1.25rem;
		height: 1.25rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.button {
			transition: none;
		}
	}
</style>

<div class="toggle" role="group" aria-label="Theme selection">
	{#each themes as { value, label } (value)}
		<button
			type="button"
			class="button"
			class:active={themeState.current === value}
			onclick={() => handleThemeChange(value)}
			aria-label={label}
			aria-pressed={themeState.current === value}
		>
			<Icon icon={value === 'auto' ? 'ph:monitor' : value === 'light' ? 'ph:sun' : 'ph:moon'} />
		</button>
	{/each}
</div>
