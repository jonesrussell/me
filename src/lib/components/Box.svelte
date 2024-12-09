<script lang="ts">
    export let title: string | undefined = undefined;
    export let width = 40;
    
    // Calculate content width (accounting for borders and padding)
    $: contentWidth = width - 4; // 2ch padding on each side
    
    // Helper function to pad content to full width
    function padContent(text: string): string {
        return text.padEnd(contentWidth);
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
    }

    .box-frame {
        display: flex;
        flex-direction: column;
        white-space: pre;
        line-height: 1;
    }

    .border-line {
        white-space: pre;
        line-height: 1;
        height: 1em;
    }

    .content {
        padding: 1ch 2ch;
        white-space: normal;
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
    }

    .content::before {
        left: 0;
    }

    .content::after {
        right: 0;
    }
</style> 