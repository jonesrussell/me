<script lang="ts">
	import PaneButton from './PaneButton.svelte';

	export let title: string = '';

	function closePane() {
		console.log('Close pane');
	}

	function minimizePane() {
		console.log('Minimize pane');
	}

	function maximizePane() {
		console.log('Maximize pane');
	}
</script>

<header class="flex h-2 items-center justify-between border-b border-gray-400 bg-gray-300 p-2">
	<PaneButton action={closePane} label="Close" />
	<h2 class="text-left text-base font-normal">{title}</h2>
	<div class="flex items-center justify-end space-x-2">
		<PaneButton action={minimizePane} label="Minimize" />
		<PaneButton action={maximizePane} label="Maximize" />
	</div>
</header>
