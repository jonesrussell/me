<script lang="ts">
    import { alignToGrid } from '$lib/utils/grid';
    
    export let title: string = '';
    export let content: string = '';
    export let width = 60;
    
    $: alignedWidth = alignToGrid(width);
    
    function padContent(text: string): string {
        return text.padEnd(alignedWidth - 2);
    }
</script>

<div class="box" style="--box-width: {alignedWidth}ch">
    <div class="box-border">
        ┌{('─').repeat(alignedWidth - 2)}┐
    </div>
    
    {#if title}
        <div class="box-row">
            <span class="border">│</span>
            <span class="title">{padContent(title)}</span>
            <span class="border">│</span>
        </div>
        
        <div class="box-border">
            ├{('─').repeat(alignedWidth - 2)}┤
        </div>
    {/if}
    
    <div class="box-row">
        <span class="border">│</span>
        <span class="content">{padContent(content)}</span>
        <span class="border">│</span>
    </div>
    
    <div class="box-border">
        └{('─').repeat(alignedWidth - 2)}┘
    </div>
</div>

<style>
    .box {
        width: var(--box-width);
        font-family: var(--font-mono);
        line-height: 1.2;
        white-space: pre;
    }

    .box-border, .border {
        color: var(--border-color);
    }

    .box-row {
        display: flex;
    }

    .title {
        color: var(--text-color);
        font-weight: bold;
    }

    .content {
        color: var(--text-color);
    }
</style>
