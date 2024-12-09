<script lang="ts">
    export let title = '';
</script>

<div class="terminal">
    {#if title}
    <div class="title-bar">
        {title}
    </div>
    {/if}
    <div class="content">
        <slot />
    </div>
</div>

<style>
    .terminal {
        font-family: var(--font-mono);
        background: var(--bg-alt);
        border: 1px solid var(--border-color);
        border-radius: 4px;
    }

    .title-bar {
        padding: 0.5ch 1ch;
        border-bottom: 1px solid var(--border-color);
        font-size: 0.9em;
    }

    .content {
        padding: 1ch;
        white-space: pre-wrap;
    }
</style> 