<script lang="ts">
    import { calculateGridUnits, alignToGrid } from '$lib/utils/grid';
    
    export let title: string | undefined = undefined;
    export let width = 40;
    
    // Ensure width is aligned to grid
    $: alignedWidth = alignToGrid(width);
    // Calculate content width (accounting for borders and padding)
    $: contentWidth = alignedWidth - 4; // 2ch padding on each side
    
    function padContent(text: string): string {
        return text.padEnd(contentWidth);
    }
</script>

<div class="box" style="--box-width: {alignedWidth}ch">
    <div class="box-frame">
        <div class="border-line">╭{'─'.repeat(alignedWidth - 2)}╮</div>
        
        {#if title}
            <div class="border-line">│ {padContent(title)} │</div>
            <div class="border-line">├{'─'.repeat(alignedWidth - 2)}┤</div>
        {/if}
        
        <div class="content">
            <slot />
        </div>
        
        <div class="border-line">╰{'─'.repeat(alignedWidth - 2)}╯</div>
    </div>
</div>

<style>
    .box {
        width: var(--box-width);
        font-family: var(--font-mono);
        line-height: 1.2;
    }

    .box-frame {
        display: flex;
        flex-direction: column;
        white-space: pre;
        color: var(--box-border);
    }

    .border-line {
        white-space: pre;
        line-height: 1.2;
        height: 1.2em;
        display: flex;
        align-items: center;
    }

    .content {
        padding: var(--ch2);
        white-space: pre-wrap;
        min-height: 1.2em;
        position: relative;
    }

    .content::before,
    .content::after {
        content: '│';
        position: absolute;
        top: 0;
        bottom: 0;
        line-height: 1.2;
        display: flex;
        align-items: stretch;
    }

    .content::before { left: 0; }
    .content::after { right: 0; }

    :global(.content > *) {
        margin: 0;
        padding: 0;
        line-height: 1.2;
    }
</style> 