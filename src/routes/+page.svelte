<script lang="ts">
	import Pane from '../components/Pane/Pane.svelte';

	export let x: number = 100;
  export let y: number = 50;
  export let zIndex: number = 2;
	export let id: string = 'home';

	export let onBringToFront = () => {};
</script>

<svelte:head>
	<title>Russell Jones | Home</title>
	<meta name="description" content="Russell Jones" />
</svelte:head>

<Pane title="Home" {id} {x} {y} {zIndex} {onBringToFront}>
	<div class="text-column">
		<h1>Home of dev.</h1>
	
		<p>Dev home.</p>
	</div>	
</Pane>
