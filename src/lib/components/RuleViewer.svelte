<script lang="ts">
    import { onMount } from 'svelte';
    import Terminal from './Terminal.svelte';
    import Menu from './Menu.svelte';
    
    // Import all rule files
    import cursorRules from '$lib/rules/cursor.rules';
    
    const ruleFiles = [cursorRules];
    let currentFileIndex = 0;
    
    $: currentFile = ruleFiles[currentFileIndex];
    
    function nextFile() {
        currentFileIndex = (currentFileIndex + 1) % ruleFiles.length;
    }
    
    function prevFile() {
        currentFileIndex = (currentFileIndex - 1 + ruleFiles.length) % ruleFiles.length;
    }
</script>

<div class="rule-viewer">
    <div class="controls">
        <button on:click={prevFile}>←</button>
        <span class="filename">{currentFile.title}</span>
        <button on:click={nextFile}>→</button>
    </div>

    <Terminal title={currentFile.title}>
        {#each currentFile.categories as category}
            # {category.name}
            {#each category.rules as rule}
            - {rule}
            {/each}

        {/each}

        {#if currentFile.examples?.length}
            # Examples
            {#each currentFile.examples as example}
            {example.title}:
            {example.code}

            {/each}
        {/if}
    </Terminal>
</div>

<style>
    .rule-viewer {
        font-family: var(--font-mono);
    }

    .controls {
        display: flex;
        gap: 2ch;
        align-items: center;
        justify-content: center;
        margin-bottom: 1ch;
    }

    button {
        font-family: inherit;
        background: none;
        border: none;
        color: var(--text-color);
        cursor: pointer;
        padding: 0.5ch 1ch;
    }

    button:hover {
        background: var(--text-color);
        color: var(--bg-color);
    }

    .filename {
        min-width: 20ch;
        text-align: center;
    }
</style> 