<script lang="ts">
	import WindowButton from './WindowButton.svelte';

	export let title: string = '';

	function closeWindow() {
		console.log('Close window');
	}

	function minimizeWindow() {
		console.log('Minimize window');
	}

	function maximizeWindow() {
		console.log('Maximize window');
	}
</script>

<header class="flex h-2 items-center justify-between border-b border-gray-400 bg-gray-300 p-2">
	<WindowButton action={closeWindow} label="Close" />
	<h2 class="text-left text-base font-normal">{title}</h2>
	<div class="flex items-center justify-end space-x-2">
		<WindowButton action={minimizeWindow} label="Minimize" />
		<WindowButton action={maximizeWindow} label="Maximize" />
	</div>
</header>
