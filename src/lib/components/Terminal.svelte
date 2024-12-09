<script lang="ts">
    import { alignToGrid } from '$lib/utils/grid';
    
    export let title = 'terminal';
    export let width = 60;
    export let prompt = '$';
    
    $: alignedWidth = alignToGrid(width);
    $: contentWidth = alignedWidth - 4;

    let commands: string[] = [];
    let currentCommand = '';

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            commands = [...commands, currentCommand];
            currentCommand = '';
        }
    }
</script>

<div class="terminal" style="--term-width: {alignedWidth}ch">
    <div class="term-header">
        <div class="controls">
            <span class="circle red">●</span>
            <span class="circle yellow">●</span>
            <span class="circle green">●</span>
        </div>
        <div class="title">{title}</div>
    </div>
    
    <div class="term-content">
        {#each commands as command}
            <div class="command-line">
                <span class="prompt">{prompt}</span>
                <span class="command">{command}</span>
            </div>
        {/each}
        <div class="command-line">
            <span class="prompt">{prompt}</span>
            <input
                type="text"
                bind:value={currentCommand}
                on:keydown={handleKeydown}
                style="width: {contentWidth - prompt.length - 1}ch"
            />
        </div>
    </div>
</div>

<style>
    .terminal {
        width: var(--term-width);
        font-family: var(--font-mono);
        background: #1a1a1a;
        border-radius: 6px;
        overflow: hidden;
        line-height: 1.2;
    }

    .term-header {
        background: #2a2a2a;
        padding: var(--ch) var(--ch2);
        display: flex;
        align-items: center;
        gap: var(--ch2);
    }

    .controls {
        display: flex;
        gap: var(--ch);
    }

    .circle {
        font-size: 0.8em;
    }

    .red { color: #ff5f56; }
    .yellow { color: #ffbd2e; }
    .green { color: #27c93f; }
</style> 