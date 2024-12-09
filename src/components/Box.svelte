<script lang="ts">
    export let title: string | undefined = undefined;
    export let width = 40;
</script>

<div class="box" style="--box-width: {width}ch">
    ┌{'─'.repeat(width - 2)}┐
    {#if title}
    │ {title.padEnd(width - 4)} │
    ├{'─'.repeat(width - 2)}┤
    {/if}
    <div class="content">
        <slot />
    </div>
    └{'─'.repeat(width - 2)}┘
</div>

<style>
    .box {
        font-family: var(--font-mono);
        width: var(--box-width);
        margin: 0 auto;
        white-space: pre;
    }

    .content {
        padding: 0 1ch;
        margin: 1ch 0;
    }
</style> 