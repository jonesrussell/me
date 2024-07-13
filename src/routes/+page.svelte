<script lang="ts">
	import { onMount } from 'svelte';
	import WinSignupNews from './sections/WinSignupNews.svelte';
	import WinBlog from './sections/WinBlog.svelte';

	let newsletterX = 0;
	let newsletterY = 0;
	let blogCardsX = 0;
	let blogCardsY = 0;

	onMount(() => {
		newsletterX = Math.random() * window.innerWidth;
		newsletterY = Math.random() * window.innerHeight;
		blogCardsX = Math.random() * window.innerWidth;
		blogCardsY = Math.random() * window.innerHeight;
	});
</script>

<svelte:head>
	<title>Russell Jones | Home</title>
	<meta name="description" content="Russell Jones" />
</svelte:head>

<section>
	<WinSignupNews x={newsletterX} y={newsletterY} />
	<WinBlog x={blogCardsX} y={blogCardsY} />
</section>
