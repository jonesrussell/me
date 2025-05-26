<script lang="ts">
	import { commands, terminal, terminalHeight, terminalMinHeight } from '$lib/stores/terminal';
	import { get } from 'svelte/store';
	const props = $props();
	const title = props.title || '~/developer';

	$effect(() => {
		terminal.loadCommands(); // Will use default commands
		return () => terminal.stop();
	});
</script>

<style>
	.terminal-frame {
		display: flex;
		position: relative;

		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;

		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);

		overflow: hidden;
		flex-direction: column;
	}

	@media (min-width: var(--container-md)) {
		.terminal-frame {
			max-width: min(var(--container-lg), 100%);
		}
	}

	.terminal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		height: var(--space-6);
		padding: 0 var(--space-4);
		border-bottom: var(--border-width) solid var(--border-color);

		background: var(--color-mix-light);
	}

	.terminal-title {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--text-muted);
	}

	.terminal-buttons {
		display: flex;
		gap: var(--space-2);
	}

	.terminal-buttons span {
		width: var(--space-2);
		height: var(--space-2);
		background: var(--text-muted);
		border-radius: var(--radius-full);

		opacity: 0.5;
	}

	.terminal-body {
		display: flex;
		position: relative;

		padding: var(--space-4);
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;

		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
		flex-direction: column;
		gap: var(--space-2);
		white-space: pre-wrap;
		word-break: break-word;
	}

	.command-line {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;

		margin-top: var(--space-2);

		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-base);
		color: var(--text-muted);
	}

	.prompt {
		font-weight: var(--font-weight-bold);
		color: var(--accent-color);
		white-space: nowrap;
	}

	.command {
		font-weight: var(--font-weight-normal);
		color: var(--text-color);
		word-break: break-word;
	}

	.command-output {
		margin-top: var(--space-2);
		padding-left: calc(var(--ch) * 3);

		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-relaxed);
		color: var(--text-color);
		white-space: pre-wrap;
		word-break: break-word;

		animation: crt-reveal 50ms linear;
	}

	@keyframes crt-reveal {
		from {
			opacity: 0.8;
			clip-path: inset(0 0 100% 0);
		}

		to {
			opacity: 1;
			clip-path: inset(0 0 0 0);
		}
	}

	.cursor {
		display: inline-block;

		width: var(--space-2);
		height: 100%;

		color: var(--accent-color);

		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}

		50% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.command-output {
			animation: none;
		}

		.cursor {
			animation: none;
		}
	}
</style>

<div class="terminal-frame" style:height={$terminalHeight} style:min-height={$terminalMinHeight}>
	<div class="terminal-header">
		<span class="terminal-title">{title}</span>
		<div class="terminal-buttons">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
	<div class="terminal-body">
		{#each get(commands).filter((cmd) => cmd.completed) as command (command.cmd)}
			<div class="command-line">
				<span class="prompt">$</span>
				<span class="command">{command.cmd}</span>
			</div>
			<div class="command-output">{command.output}</div>
		{/each}
		{#if $terminal.currentCommand < get(commands).length}
			<div class="command-line">
				<span class="prompt">$</span>
				<span class="command">{$terminal.commandVisible}</span>
				{#if $terminal.isTyping && $terminal.commandVisible.length === get(commands)[$terminal.currentCommand]?.cmd?.length && !$terminal.outputVisible}
					<span class="cursor">▋</span>
				{/if}
			</div>
			<div class="command-output">{$terminal.outputVisible}</div>
		{/if}
	</div>
</div>
