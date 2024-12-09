<script lang="ts">
    export let cols = 1;
    export let gap = 2;
    
    $: gridTemplate = `repeat(${cols}, ${40}ch)`;
    $: gridGap = `${gap}ch`;
</script>

<div class="grid" style="--grid-template: {gridTemplate}; --grid-gap: {gridGap}">
    <slot />
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: var(--grid-template);
        gap: var(--grid-gap);
        width: 100%;
    }
</style> 