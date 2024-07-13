<script lang="ts">
	import AppWindow from '../../components/AppWindow/AppWindow.svelte';

	export let x: number;
	export let y: number;
</script>

<AppWindow title="Blog" x={x} y={y}>Blogger</AppWindow>
