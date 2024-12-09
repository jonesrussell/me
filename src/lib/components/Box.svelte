<script lang="ts">
    export let title: string | undefined = undefined;
    export let width = 40;
    
    // Calculate content width (accounting for borders and padding)
    $: contentWidth = width - 4; // 2ch padding on each side
    
    // Helper function to pad content to full width
    function padContent(text: string): string {
        const paddedText = text.padEnd(contentWidth);
        return paddedText.length > contentWidth 
            ? paddedText.slice(0, contentWidth) 
            : paddedText;
    }
</script>

<div class="box font-mono" style="--box-width: {width}ch">
    <div class="box-frame">
        <!-- Top border -->
        <div class="border-line">╭{'─'.repeat(width - 2)}╮</div>
        
        <!-- Title section if provided -->
        {#if title}
        <div class="border-line">│ {padContent(title)} │</div>
        <div class="border-line">├{'─'.repeat(width - 2)}┤</div>
        {/if}
        
        <!-- Content section -->
        <div class="content">
            <slot />
        </div>
        
        <!-- Bottom border -->
        <div class="border-line">╰{'─'.repeat(width - 2)}╯</div>
    </div>
</div>

<style>
    .box {
        width: var(--box-width);
        margin: 0 auto;
        font-family: var(--box-font);
        line-height: var(--box-line-height);
    }

    .box-frame {
        display: flex;
        flex-direction: column;
        white-space: pre;
        line-height: 1;
        color: var(--box-border);
        background: var(--box-bg);
    }

    .border-line {
        white-space: pre;
        line-height: 1;
        height: 1.2em;
        display: flex;
        align-items: center;
    }

    .content {
        padding: var(--box-padding);
        white-space: pre-wrap;
        min-height: 1em;
        position: relative;
    }

    /* Add side borders to content */
    .content::before,
    .content::after {
        content: '│';
        position: absolute;
        top: 0;
        bottom: 0;
        white-space: pre;
        line-height: inherit;
        height: 100%;
        display: flex;
        align-items: stretch;
    }

    .content::before {
        left: 0;
    }

    .content::after {
        right: 0;
    }

    /* Ensure content aligns with grid */
    :global(.content > *) {
        margin: 0;
        padding: 0;
        line-height: inherit;
    }
</style> 