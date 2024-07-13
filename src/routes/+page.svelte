<script lang="ts">
	import { onMount } from 'svelte';
	import NewsletterSignupForm from './sections/NewsletterSignupForm.svelte';
	import BlogCards from './sections/BlogCards.svelte';

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
	<NewsletterSignupForm x={newsletterX} y={newsletterY} />
	<BlogCards x={blogCardsX} y={blogCardsY} />
</section>
