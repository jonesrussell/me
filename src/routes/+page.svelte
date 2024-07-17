<script lang="ts">
	import Pane from '../components/Pane.svelte';

	export let position: { x: number, y: number } = { x: 100, y: 50 };
	export let zIndex: number = 2;
	export let id: string = 'home';

	export let onBringToFront = () => {};
</script>

<svelte:head>
	<title>Russell Jones | Home</title>
	<meta name="description" content="Russell Jones" />
</svelte:head>

<Pane title="Home" {id} {position} {zIndex} {onBringToFront}>
	<div class="text-column">
		<h1>Home of dev.</h1>
	
		<p>Dev home.</p>
	</div>	
</Pane>
