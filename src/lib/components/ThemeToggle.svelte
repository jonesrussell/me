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
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.5rem;
		color: var(--text-color);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
		transition: all var(--transition-base);
		align-items: center;
		justify-content: center;
		cursor: pointer;
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
		padding: 0.5rem;
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		min-width: 8rem;
		z-index: 100;
	}

	.theme-option {
		display: flex;
		width: 100%;
		padding: 0.5rem;
		color: var(--text-color);
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		transition: all var(--transition-base);
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.theme-option:hover {
		background: var(--color-mix-light);
	}

	.theme-option.active {
		color: var(--accent-color);
		background: var(--color-mix-medium);
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
			{#each themes as { value, label, icon } (value)}
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
