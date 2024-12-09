<script lang="ts">
    export let text: string;
    export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
</script>

<div class="tooltip-wrapper">
    <slot />
    <span class="tooltip" data-position={position}>
        {text}
    </span>
</div>

<style>
    .tooltip-wrapper {
        position: relative;
        display: inline-block;
    }

    .tooltip {
        font-family: var(--font-mono);
        visibility: hidden;
        position: absolute;
        padding: var(--ch) var(--ch2);
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        white-space: nowrap;
        z-index: 1;
    }

    .tooltip-wrapper:hover .tooltip {
        visibility: visible;
    }

    [data-position='top'] {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: var(--ch);
    }

    [data-position='bottom'] {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: var(--ch);
    }

    [data-position='left'] {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: var(--ch);
    }

    [data-position='right'] {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: var(--ch);
    }
</style> 