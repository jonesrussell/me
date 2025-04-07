<script lang="ts">
	import {
		commands,
		debug,
		terminal,
		terminalHeight
	} from '$lib/stores/terminal';
	import { get } from 'svelte/store';
	const props = $props();
	const title = props.title || '~/developer';

	$effect(() => {
		terminal.loadCommands(); // Will use default commands
		return () => terminal.stop();
	});

	// Debug logging
	$effect(() => {
		if (import.meta.env.DEV) {
			console.log('Terminal Debug State:', {
				height: $terminalHeight,
				debug: $debug
			});
		}
	});
</script>

<div
	class="terminal-frame"
	style:height={$terminalHeight}
	style:min-height={$terminalHeight}
>
	<div class="terminal-header">
		<span class="terminal-title">{title}</span>
		<div class="terminal-buttons">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
	<div class="terminal-body">
		{#each [...Array($terminal.currentCommand + 1).keys()] as i}
			{@const currentCommands = get(commands)}
			<div class="command-line">
				<span class="prompt">$</span>
				<span class="command">
					{i === $terminal.currentCommand
						? $terminal.commandVisible
						: currentCommands[i]?.cmd || ''}
				</span>
				{#if $terminal.isTyping && i === $terminal.currentCommand && $terminal.commandVisible.length === currentCommands[i]?.cmd?.length && !$terminal.outputVisible}
					<span class="cursor">▋</span>
				{/if}
			</div>
			<div class="command-output">
				{i === $terminal.currentCommand
					? $terminal.outputVisible
					: currentCommands[i]?.output || ''}
			</div>
		{/each}
	</div>
	{#if import.meta.env.DEV}
		<div class="debug">
			<pre>
Height Calculations:
------------------
Header Height: {$debug.headerHeight}ch
Padding: {$debug.padding}ch
Max Lines: {$debug.maxLines}
Raw Height: {$debug.rawHeight}ch
Final Height: {$debug.totalHeight}

Current State:
-------------
Current Lines: {$debug.currentLines}

Commands:
--------
{$debug.commands
					.map(
						(c) => `${c.cmd}:
  Lines: ${c.lines}

  Breakdown: ${c.breakdown}`
					)
					.join('\n')}
			</pre>
		</div>
	{/if}
</div>

<style>
	.terminal-frame {
		display: flex;
		position: relative;

		width: 100%;

		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);

		overflow: hidden;
		flex-direction: column;
		max-width: min(var(--measure), 100%);
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

		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
		flex-direction: column;
		gap: var(--space-2);
		white-space: pre-wrap;
	}

	.command-line {
		display: flex;
		gap: var(--space-2);

		margin-top: var(--space-2);

		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-base);
		color: var(--text-muted);
	}

	.prompt {
		font-weight: var(--font-weight-bold);
		color: var(--accent-color);
	}

	.command {
		font-weight: var(--font-weight-normal);
		color: var(--text-color);
	}

	.command-output {
		margin-top: var(--space-2);
		padding-left: var(--space-6);

		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-relaxed);
		color: var(--text-color);
		white-space: pre;

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

	.debug {
		position: absolute;
		top: calc(100% + var(--space-4));
		right: 0;
		left: 0;

		margin-bottom: var(--space-8);
		padding: var(--space-4);

		font-family: var(--font-mono);
		font-size: var(--font-size-xs);

		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
		z-index: 100;
		white-space: pre;
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
