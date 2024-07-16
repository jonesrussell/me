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
			})
		},
		{
			id: 'blog',
			obj: writable({
				x: 150,
				y: 100,
			})
		}
	];

	let panes = writable<PaneType[]>(INITIAL_PANES);

	const debounce = (func: (...args: any[]) => void, delay: number) => {
		let timer: number | undefined;

		return (...args: any[]) => {
			clearTimeout(timer);
			timer = window.setTimeout(() => func(...args), delay);
		};
	};

	const setPanesPosition = () => {
		const bodySize = { width: window.innerWidth, height: window.innerHeight };
		$panes.forEach((pane) => {
			const { obj } = pane;
			obj.update((value) => {
				const { x, y } = value;
				const newX = Math.min(x, bodySize.width);
				const newY = Math.min(y, bodySize.height);
				return { ...value, x: newX, y: newY };
			});
		});
	};

	const debouncedSetPanesPosition = debounce(setPanesPosition, 300);

	onMount(() => {
		INITIAL_PANES.forEach((pane) =>
			paneManager.createPane(
				pane.id,
				get(pane.obj).x,
				get(pane.obj).y,
			)
		);

		const unsubscribe = paneManager.subscribe((value) => {
			panes.set(value);
		});

		window.addEventListener('resize', debouncedSetPanesPosition);

		return () => {
			unsubscribe();
			window.removeEventListener('resize', debouncedSetPanesPosition);
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
		/>
	{/each}
</div>
