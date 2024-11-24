<script lang="ts">
	import '../app.css';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/600.css';
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

<div class="min-h-screen">
	<Header />
	
	<div class="container mx-auto px-4 py-8">
		<div class="flex flex-col gap-8 md:flex-row">
			<aside class="md:w-64">
				<NavBar />
			</aside>
			
			<main class="flex-1">
				<slot />
			</main>
		</div>
	</div>

	<Footer />

	{#each $panes as pane (pane.id)}
		<svelte:component
			this={COMPONENTS.get(pane.id)}
			{...get(pane.obj)}
			id={pane.id}
			onBringToFront={() => {
				console.log('Bringing pane to front:', pane.id);
				paneManager.updateZIndex(pane.id);
			}}
		/>
	{/each}

	{#if isDevelopment}
		<div
			class="debug-info"
			style="position: fixed; bottom: 0; right: 0; background: white; padding: 1em;"
		>
			<h2>Debug Info</h2>
			{#each Object.entries($session) as [key, value]}
				<p><strong>{key}:</strong> {JSON.stringify(value)}</p>
			{/each}
		</div>
	{/if}
</div>
