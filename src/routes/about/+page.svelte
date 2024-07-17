<script lang="ts">
	import Pane from '../../components/Pane.svelte';

	export let position: { x: number, y: number } = { x: 100, y: 150 };
	export let zIndex: number = 2;
	export let id: string = 'about';

	export let onBringToFront = () => {};
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About Russell" />
</svelte:head>

<Pane title="About" {id} {position} {zIndex} {onBringToFront}>
	<div class="text-column">
		<h1>About Russell</h1>
	
		<p>
			Me dev.
		</p>
	</div>
</Pane>
