<script lang="ts">
    export let title: string | undefined = undefined;
    export let width = 40;
</script>

<div class="box" style="--box-width: {width}ch">
    ╭{'─'.repeat(width - 2)}╮
    {#if title}
    │ {title.padEnd(width - 4)} │
    ├{'─'.repeat(width - 2)}┤
    {/if}
    <div class="content">
        <slot />
    </div>
    ╰{'─'.repeat(width - 2)}╯
</div>

<style>
    .box {
        font-family: var(--font-mono);
        width: var(--box-width);
        white-space: pre;
        margin: 0 auto;
    }

    .content {
        padding: 1ch;
        white-space: normal;
        text-align: inherit;
    }
</style> 