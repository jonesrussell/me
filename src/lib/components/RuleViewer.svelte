<script lang="ts">
    import Box from './Box.svelte';
    import { alignToGrid } from '$lib/utils/grid';
    
    let rules = '';
    let editing = false;

    const viewerWidth = alignToGrid(76); // 76 characters wide
    
    async function loadRules() {
        const response = await fetch('/rules.txt');
        rules = await response.text();
    }

    function toggleEdit() {
        editing = !editing;
    }
</script>

<div class="rule-viewer" style="--viewer-width: {viewerWidth}ch">
    <div class="viewer-header">
        <span class="filename">rules.txt</span>
        <button on:click={toggleEdit}>
            [{editing ? 'View' : 'Edit'}]
        </button>
    </div>

    {#if editing}
        <textarea
            bind:value={rules}
            spellcheck="false"
            rows={rules.split('\n').length}
        ></textarea>
    {:else}
        <pre class="rules-display">{rules}</pre>
    {/if}
</div>

<style>
    .rule-viewer {
        width: var(--viewer-width);
        font-family: var(--font-mono);
        line-height: 1.2;
    }

    .viewer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--ch) var(--ch2);
        border-bottom: 1px solid var(--border-color);
    }

    .filename {
        color: var(--text-muted);
    }

    button {
        font-family: inherit;
        background: none;
        border: none;
        color: var(--link-color);
        cursor: pointer;
    }

    textarea {
        width: 100%;
        font-family: inherit;
        background: var(--bg-color);
        color: var(--text-color);
        border: none;
        padding: var(--ch2);
        line-height: 1.2;
        resize: none;
    }

    textarea:focus {
        outline: none;
    }

    .rules-display {
        margin: 0;
        padding: var(--ch2);
        white-space: pre-wrap;
        line-height: 1.2;
    }
</style> 