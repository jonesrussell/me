<script lang="ts">
	import { onMount } from 'svelte';
	import PaneSignupNews from './sections/PaneSignupNews.svelte';
	import PaneBlog from './sections/PaneBlog.svelte';

	let panes = [
		{
			component: PaneSignupNews,
			x: 0,
			y: 0
		},
		{
			component: PaneBlog,
			x: 0,
			y: 0
		},
		// Add more panes here...
	];

	onMount(() => {
		panes = panes.map((pane) => ({
			...pane,
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight
		}));
	});
</script>

<svelte:head>
	<title>Russell Jones | Home</title>
	<meta name="description" content="Russell Jones" />
</svelte:head>

<section>
	{#each panes as { component: Pane, x, y }}
		<svelte:component this={Pane} {x} {y} />
	{/each}
</section>
