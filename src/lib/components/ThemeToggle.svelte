<script lang="ts">
	import { browser } from '$app/environment';

	// Track if we're in auto mode
	let isAuto = $state(browser ? localStorage.getItem('themeMode') === 'auto' : true);
	
	// Function to get current theme based on system preference when in auto mode
	function getSystemTheme(): 'light' | 'dark' {
		if (!browser) return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	// Function to update theme
	function updateTheme(mode: App.ThemeMode): void {
		if (!browser) return;
		
		const theme = mode === 'auto' ? getSystemTheme() : mode;
		document.documentElement.style.colorScheme = mode === 'auto' ? 'light dark' : theme;
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('themeMode', mode);
		isAuto = mode === 'auto';
	}

	// Toggle between auto, light, and dark
	function toggleTheme(): void {
		if (!browser) return;
		
		if (isAuto) {
			updateTheme('light');
		} else if (document.documentElement.getAttribute('data-theme') === 'light') {
			updateTheme('dark');
		} else {
			updateTheme('auto');
		}
	}

	// Initialize theme on mount
	$effect(() => {
		if (!browser) return;

		const savedMode = localStorage.getItem('themeMode') || 'auto';
		updateTheme(savedMode as App.ThemeMode);

		// Listen for system theme changes when in auto mode
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = () => {
			if (isAuto) {
				updateTheme('auto');
			}
		};
		
		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	});

	// Get current theme for display
	function getCurrentTheme(): 'light' | 'dark' {
		if (!browser) return 'light';
		return document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
	}
</script>

<button 
	class="theme-toggle" 
	onclick={toggleTheme}
	aria-label="Toggle theme"
>
	[{#if isAuto}
		'⚡'
	{:else if getCurrentTheme() === 'light'}
		'☀'
	{:else}
		'☾'
	{/if}]
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
