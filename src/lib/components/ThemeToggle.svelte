<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';

	const themes = [
		{ value: 'auto', label: 'Auto', icon: 'ph:monitor' },
		{ value: 'light', label: 'Light', icon: 'ph:sun' },
		{ value: 'dark', label: 'Dark', icon: 'ph:moon' }
	] as const;

	let isOpen = $state(false);

	function handleThemeChange(newTheme: 'auto' | 'light' | 'dark') {
		theme.set(newTheme);
		isOpen = false;
	}

	$effect(() => {
		// Listen for system theme changes when in auto mode
		if ($theme === 'auto' && typeof window !== 'undefined') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handleChange = () => {
				document.documentElement.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
			};
			mediaQuery.addEventListener('change', handleChange);
			return () => mediaQuery.removeEventListener('change', handleChange);
		}
	});
</script>

<style>
	.theme-toggle {
		position: relative;
	}

	.toggle-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.5rem;
		border-radius: var(--radius-full);
		background: var(--bg-darker);
		color: var(--text-color);
		border: 1px solid var(--border-color);
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.toggle-button:hover {
		background: var(--color-mix-light);
		border-color: var(--accent-color);
	}

	.dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.5rem;
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		padding: 0.5rem;
		min-width: 8rem;
		box-shadow: var(--shadow-lg);
		z-index: 100;
	}

	.theme-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.5rem;
		border-radius: var(--radius-sm);
		color: var(--text-color);
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.theme-option:hover {
		background: var(--color-mix-light);
	}

	.theme-option.active {
		background: var(--color-mix-medium);
		color: var(--accent-color);
	}

	@media (prefers-reduced-motion: reduce) {
		.toggle-button,
		.theme-option {
			transition: none;
		}
	}
</style>

<div class="theme-toggle">
	<button
		class="toggle-button"
		onclick={() => (isOpen = !isOpen)}
		aria-label="Toggle theme"
		aria-expanded={isOpen}
	>
		<Icon icon={$theme === 'auto' ? 'ph:monitor' : $theme === 'light' ? 'ph:sun' : 'ph:moon'} />
	</button>

	{#if isOpen}
		<div class="dropdown" transition:fade={{ duration: 150 }}>
			{#each themes as { value, label, icon }}
				<button
					class="theme-option"
					class:active={$theme === value}
					onclick={() => handleThemeChange(value)}
				>
					<Icon {icon} />
					<span>{label}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
