<script lang="ts">
	import { onMount } from 'svelte';
	import WinSignupNews from './sections/WinSignupNews.svelte';
	import WinBlog from './sections/WinBlog.svelte';

	let windows = [
		{
			component: WinSignupNews,
			x: 0,
			y: 0
		},
		{
			component: WinBlog,
			x: 0,
			y: 0
		}
		// Add more windows here...
	];

	onMount(() => {
		windows = windows.map((win) => ({
			...win,
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
	{#each windows as { component: Window, x, y }}
		<svelte:component this={Window} {x} {y} />
	{/each}
</section>
