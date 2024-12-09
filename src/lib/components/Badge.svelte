<script lang="ts">
    export let type: 'info' | 'success' | 'warning' | 'error' = 'info';
    
    const symbols = {
        info: 'ℹ',
        success: '✓',
        warning: '⚠',
        error: '✗'
    };
</script>

<span class="badge {type}">
    [{symbols[type]}] <slot />
</span>

<style>
    .badge {
        font-family: var(--font-mono);
        padding: 0 var(--ch);
        white-space: nowrap;
    }

    .info {
        color: #0066cc;
    }

    .success {
        color: #22c55e;
    }

    .warning {
        color: #eab308;
    }

    .error {
        color: #ef4444;
    }

    :global([data-theme='dark']) .badge {
        opacity: 0.9;
    }
</style> 