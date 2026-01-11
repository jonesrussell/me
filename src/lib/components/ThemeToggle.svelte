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
		gap: var(--space-2);
		align-items: center;
		padding: var(--space-2);
		border-radius: var(--radius-md);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
	}

	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-2);
		border: none;
		background: transparent;
		border-radius: var(--radius-sm);
		cursor: pointer;
		color: var(--text-muted);
		transition: all var(--transition-duration) var(--transition-timing);
		position: relative;
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

	.icon {
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
	{#each themes as { value, label }}
		<button
			type="button"
			class="button"
			class:active={themeState.current === value}
			onclick={() => handleThemeChange(value)}
			aria-label={label}
			aria-pressed={themeState.current === value}
		>
			<Icon icon={themeState.current === 'auto' ? 'ph:monitor' : themeState.current === 'light' ? 'ph:sun' : 'ph:moon'} />
		</button>
	{/each}
</div>
