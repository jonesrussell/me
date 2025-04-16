<script lang="ts">
	import { commands, terminal, terminalHeight } from '$lib/stores/terminal';
	import { get } from 'svelte/store';

	const {
		command,
		output,
		title = 'Terminal'
	} = $props<{
		command: string;
		output?: string;
		title?: string;
	}>();

	$effect(() => {
		terminal.loadCommands(); // Will use default commands
		return () => terminal.stop();
	});
</script>

<style>
	.terminal {
		background-color: var(--color-bg-secondary);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		font-family: var(--font-mono);
		overflow: hidden;
	}

	.terminal-header {
		background-color: var(--color-bg-tertiary);
		padding: var(--space-2) var(--space-4);
		border-bottom: 1px solid var(--color-border);
	}

	.terminal-title {
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
	}

	.terminal-content {
		padding: var(--space-4);
	}

	.command-line {
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}

	.prompt {
		color: var(--color-accent);
		margin-right: var(--space-2);
	}

	.command {
		color: var(--color-text-primary);
	}

	.command-output {
		color: var(--color-text-secondary);
		margin-left: var(--space-4);
	}
</style>

<div class="terminal" role="log" aria-label="Terminal output">
	<div class="terminal-header">
		<div class="terminal-title">{title}</div>
	</div>
	<div class="terminal-content">
		<div class="command-line">
			<span class="prompt">$</span>
			<span class="command">{command}</span>
		</div>
		{#if output}
			<div class="command-output">{output}</div>
		{/if}
	</div>
</div>
