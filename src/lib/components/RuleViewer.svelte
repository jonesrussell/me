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
        <button class="control-btn" on:click={prevFile}>←</button>
        <span class="filename">{currentFile.title}</span>
        <button class="control-btn" on:click={nextFile}>→</button>
    </div>

    <Terminal title={currentFile.title}>
        {#each currentFile.categories as category}
            <div class="category">
                <h3 class="category-title"># {category.name}</h3>
                {#each category.rules as rule}
                    <div class="rule">- {rule}</div>
                {/each}
            </div>
        {/each}
    </Terminal>
</div>

<style>
    .rule-viewer {
        width: 100%;
        max-width: var(--measure);
    }

    .controls {
        display: flex;
        align-items: center;
        gap: var(--ch2);
        margin-bottom: var(--ch2);
    }

    .control-btn {
        padding: var(--ch) var(--ch2);
        border: 1px solid var(--border-color);
        background: transparent;
        color: var(--text-color);
        cursor: pointer;
    }

    .control-btn:hover {
        background: var(--border-color);
    }

    .filename {
        flex: 1;
        text-align: center;
    }

    .category {
        margin-bottom: var(--ch2);
    }

    .category-title {
        margin-bottom: var(--ch);
        color: var(--text-muted);
    }

    .rule {
        padding-left: var(--ch2);
    }
</style> 