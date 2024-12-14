<script lang="ts">
	// Track if we're in auto mode
	let isAuto = $state(localStorage.getItem('themeMode') === 'auto');
	
	// Function to get current theme based on system preference when in auto mode
	function getSystemTheme(): 'light' | 'dark' {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	// Function to update theme
	function updateTheme(mode: 'auto' | 'light' | 'dark'): void {
		const theme = mode === 'auto' ? getSystemTheme() : mode;
		document.documentElement.style.colorScheme = mode === 'auto' ? 'light dark' : theme;
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('themeMode', mode);
		isAuto = mode === 'auto';
	}

	// Toggle between auto, light, and dark
	function toggleTheme(): void {
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
		const savedMode = localStorage.getItem('themeMode') || 'auto';
		updateTheme(savedMode as 'auto' | 'light' | 'dark');

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
</script>

<button class="theme-toggle" on:click={toggleTheme}>
	[{#if isAuto}
		'⚡'
	{:else if document.documentElement.getAttribute('data-theme') === 'light'}
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
