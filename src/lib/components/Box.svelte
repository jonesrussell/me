<script lang="ts">
    import { alignToGrid } from '$lib/utils/grid';
    
    export let title: string = '';
    export let content: string = '';
    export let width = 60;
    
    $: alignedWidth = alignToGrid(width);
    
    function padContent(text: string): string {
        return text.padEnd(alignedWidth - 4); // -4 accounts for borders and spacing
    }
</script>

<div class="box" style="--box-width: {alignedWidth}ch">
    <div class="box-border">
        ┌{('─').repeat(alignedWidth - 2)}┐
    </div>
    
    {#if title}
        <div class="box-title">
            │ {padContent(title)} │
        </div>
        
        <div class="box-border">
            ├{('─').repeat(alignedWidth - 2)}┤
        </div>
    {/if}
    
    <div class="box-content">
        │ {padContent(content)} │
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

    .box-border {
        color: var(--border-color);
    }

    .box-title {
        color: var(--text-color);
        font-weight: bold;
    }

    .box-content {
        color: var(--text-color);
    }
</style>
