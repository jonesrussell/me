<script lang="ts">
    import { calculateGridUnits, alignToGrid } from '$lib/utils/grid';
    
    export let title: string | undefined = undefined;
    export let width = 40;
    export let color = 'var(--box-border)';
    
    // Ensure width is aligned to grid
    $: alignedWidth = alignToGrid(width);
    // Calculate content width (accounting for borders and padding)
    $: contentWidth = alignedWidth - 4; // 2ch padding on each side
    
    function padContent(text: string): string {
        return text.padEnd(contentWidth);
    }
</script>

<div class="box" style="--box-width: {alignedWidth}ch; --box-color: {color}">
    <div class="box-frame">
        <div class="border-line">╭{'─'.repeat(alignedWidth - 2)}╮</div>
        
        {#if title}
            <div class="border-line">│ {padContent(title)} │</div>
            <div class="border-line">├{'─'.repeat(alignedWidth - 2)}┤</div>
        {/if}
        
        <div class="content">
            <div class="content-inner">
                <slot />
            </div>
        </div>
        
        <div class="border-line">╰{'─'.repeat(alignedWidth - 2)}╯</div>
    </div>
</div>

<style>
    .box {
        width: var(--box-width);
        font-family: var(--font-mono);
        line-height: 1.2;
        margin: 0 auto;
    }

    .box-frame {
        display: flex;
        flex-direction: column;
        white-space: pre;
        color: var(--box-color);
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
        min-height: 1.2em;
        position: relative;
    }

    .content-inner {
        white-space: normal;
        width: 100%;
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
        white-space: pre;
        color: var(--box-color);
    }

    .content::before { left: 0; }
    .content::after { right: 0; }

    :global(.content > *) {
        margin: 0;
        padding: 0;
        line-height: 1.2;
    }
</style> 