<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { get } from 'svelte/store';
	import PaneSignupNews from './sections/PaneSignupNews.svelte';
	import PaneBlog from './sections/PaneBlog.svelte';
	import paneManager from '../lib/PaneManager';
	import type { PaneType } from '../lib/types';

	const INITIAL_PANES: PaneType[] = [
		{
			id: 'signup-news',
			obj: writable({
				x: 500,
				y: 200,
				zIndex: 1
			})
		},
		{
			id: 'blog',
			obj: writable({
				x: 150,
				y: 100,
				zIndex: 1
			})
		}
	];

	let panes = writable<PaneType[]>(INITIAL_PANES);

	onMount(() => {
		INITIAL_PANES.forEach((pane) => {
			paneManager.createPane(pane.id, get(pane.obj).x, get(pane.obj).y, get(pane.obj).zIndex);
		});

		const unsubscribe = paneManager.subscribe((value) => {
			panes.set(value);
		});

		return () => {
			unsubscribe();
		};
	});

	const COMPONENTS: { [key: string]: typeof PaneSignupNews | typeof PaneBlog } = {
		'signup-news': PaneSignupNews,
		blog: PaneBlog
	};
</script>

<svelte:head>
	<title>Russell Jones | Home</title>
	<meta name="description" content="Russell Jones" />
</svelte:head>

<div>
	{#each $panes as pane (pane.id)}
		<svelte:component
			this={COMPONENTS[pane.id]}
			x={get(pane.obj).x}
			y={get(pane.obj).y}
			id={pane.id}
			zIndex={get(pane.obj).zIndex}
			onBringToFront={() => {
				console.log('Bringing pane to front:', pane.id);
				paneManager.updateZIndex(pane.id);
			}}
		/>
	{/each}
</div>
