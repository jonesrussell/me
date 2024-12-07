<script lang="ts">
	import Pane from '../components/Pane/Pane.svelte';

	export const x: number = 100;
	export const y: number = 50;
	export const zIndex: number = 2;
	export const id: string = 'home';

	export const onBringToFront = () => {};
</script>

<svelte:head>
	<title>Russell Jones | Home</title>
	<meta name="description" content="Russell Jones" />
</svelte:head>

<section>
	<h1>Home of dev.</h1>

	<div class="grid">
		<div>
			<h2>About</h2>
			<p>Me dev.</p>
		</div>

		<div>
			<h2>Blog</h2>
			<p>Latest posts and thoughts.</p>
		</div>

		<div>
			<h2>Projects</h2>
			<p>Current work and experiments.</p>
		</div>
	</div>
</section>
