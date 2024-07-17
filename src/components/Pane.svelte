<script lang="ts">
  import { onMount } from 'svelte';
  import Moveable from 'svelte-moveable';
  import PaneLayout from './Pane/PaneLayout.svelte';
  import type { LineDirection } from 'svelte-moveable';

  export let title: string = '';
  export let position: { x: number, y: number };
  export let id: string;
  export let zIndex: number;
  export let onBringToFront: () => void;

  let targetRef: HTMLElement | null = null;
  let moveableRef: Moveable | null = null;

  const draggable = true;
  const throttleDrag = 1;
  const edgeDraggable = true;
  const edge: LineDirection[] = ['w', 'e'];
  const startDragRotate = 0;
  const throttleDragRotate = 0;
  const originDraggable = false;
  const resizable = true;
  const keepRatio = false;
  const throttleResize = 1;
  const renderDirections: string[] = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'];

  function handleMouseDown() {
    onBringToFront();
  }

  onMount(() => {
    const handleResize = () => {
      moveableRef?.updateRect();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div
  {id}
  aria-label={title}
  class="target"
  bind:this={targetRef}
  on:mousedown={handleMouseDown}
  style={`left: ${position.x}px; top: ${position.y}px; z-index: ${zIndex};`}
  role="button"
	tabindex="0"
>
  <PaneLayout {title}>
    <slot />
  </PaneLayout>
</div>

<Moveable
  bind:this={moveableRef}
  target={targetRef}
  {draggable}
  {throttleDrag}
  {edgeDraggable}
  {edge}
  {startDragRotate}
  {throttleDragRotate}
  {resizable}
  {keepRatio}
  {throttleResize}
  {renderDirections}
  {originDraggable}
  on:drag={({ detail: e }) => {
    e.target.style.transform = e.transform;
  }}
  on:resize={({ detail: e }) => {
    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;
    e.target.style.transform = e.drag.transform;
  }}
/>

<style>
  .target {
    position: absolute;
    transform: translate3d(0, 0, 0);
    border: 1px solid #ccc;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 50%;
    max-width: var(--max-width);
    max-height: var(--max-height);
    min-width: var(--min-width);
  }
</style>
