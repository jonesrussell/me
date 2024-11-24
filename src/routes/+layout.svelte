<script lang="ts">
	import '../app.css';
	import { get, writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { session } from '../stores';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import NavBar from '../components/NavBar.svelte';
	import PaneAbout from './about/+page.svelte';
	import PaneBlog from './blog/+page.svelte';
	import PaneHome from './+page.svelte';
	import paneManager from '../lib/PaneManager';
	import PaneSignupNews from './newsletter/+page.svelte';
	import type { PaneType } from '../lib/types';
	import type { SessionData } from '../stores';

	let sessionData: SessionData = {};

	const INITIAL_PANES: PaneType[] = [
		{
			id: 'signup-news',
			obj: writable({
				x: 500,
				y: 200,
				zIndex: 1
			})
		}
	];

	let panes = writable<PaneType[]>(INITIAL_PANES);

	let isDevelopment = process.env.NODE_ENV === 'development';

	onMount(() => {
		const unsubscribe = session.subscribe((value: any) => {
			sessionData = value;
		});

		if (sessionData.openAboutInPane) {
			paneManager.createPane('about', 100, 100, 1);
		}

		INITIAL_PANES.forEach((pane) => {
			paneManager.createPane(pane.id, get(pane.obj).x, get(pane.obj).y, get(pane.obj).zIndex);
		});

		const unsubscribePane = paneManager.subscribe((value) => {
			panes.set(value);
		});

		return () => {
			unsubscribe();
			unsubscribePane();
		};
	});

	const COMPONENTS = new Map<
		string,
		typeof PaneHome | typeof PaneSignupNews | typeof PaneBlog | typeof PaneAbout
	>();
	COMPONENTS.set('home', PaneHome);
	COMPONENTS.set('signup-news', PaneSignupNews);
	COMPONENTS.set('blog', PaneBlog);
	COMPONENTS.set('about', PaneAbout);
</script>

<div class="app">
	<Header />

	<div class="main-container">
		<NavBar />
		<main class="content">
			<slot />
		</main>
	</div>

	<Footer />

	{#each $panes as pane (pane.id)}
		<svelte:component
			this={COMPONENTS.get(pane.id)}
			{...get(pane.obj)}
			id={pane.id}
			onBringToFront={() => {
				paneManager.updateZIndex(pane.id);
			}}
		/>
	{/each}
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		font-family: var(--font-mono);
		background: var(--bg-color);
	}

	.main-container {
		display: flex;
		flex: 1;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		gap: 2rem;
		background: var(--bg-color);
	}

	.content {
		flex: 1;
		max-width: 80ch;
	}
</style>
