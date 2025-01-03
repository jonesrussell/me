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
  Height: ${c.height}
  Breakdown: ${c.breakdown}`
					)
					.join('\n')}
			</pre>
		</div>
	{/if}
</div>

<style>
	.terminal-frame {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: min(var(--measure), 100%);
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-lg);
		background: var(--bg-color);
		overflow: hidden;
		box-shadow: var(--shadow-lg);
	}

	.terminal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: var(--ch3);
		padding: 0 var(--ch2);
		background: var(--color-mix-light);
		border-bottom: calc(1 * var(--ch) / 16) solid var(--border-color);
	}

	.terminal-title {
		color: var(--text-muted);
		font-size: calc(1.5 * var(--ch));
		font-weight: var(--font-weight-medium);
	}

	.terminal-buttons {
		display: flex;
		gap: var(--ch);
	}

	.terminal-buttons span {
		width: var(--ch);
		height: var(--ch);
		border-radius: var(--radius-full);
		background: var(--text-muted);
		opacity: 0.5;
	}

	.terminal-body {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--ch);
		padding: var(--ch2);
		font-family: var(--font-mono);
		font-size: calc(1.5 * var(--ch));
		line-height: var(--line-height-relaxed);
		white-space: pre-wrap;
	}

	.command-line {
		display: flex;
		gap: var(--ch2);
		margin-top: var(--ch);
		color: var(--text-muted);
		font-size: calc(1.5 * var(--ch));
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-base);
	}

	.prompt {
		color: var(--accent-color);
		font-weight: var(--font-weight-bold);
	}

	.command {
		color: var(--text-color);
		font-weight: var(--font-weight-normal);
	}

	.command-output {
		margin-top: var(--ch);
		padding-left: calc(var(--ch) * 3);
		color: var(--text-color);
		font-size: calc(1.5 * var(--ch));
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-relaxed);
		animation: crt-reveal 50ms linear;
		white-space: pre;
	}

	@keyframes crt-reveal {
		from {
			clip-path: inset(0 0 100% 0);
			opacity: 0.8;
		}

		to {
			clip-path: inset(0 0 0 0);
			opacity: 1;
		}
	}

	.cursor {
		display: inline-block;
		width: var(--ch);
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
		top: calc(100% + var(--ch2));
		right: 0;
		left: 0;
		z-index: 100;
		margin-bottom: var(--ch4);
		padding: var(--ch2);
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--bg-color);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		white-space: pre;
		box-shadow: var(--shadow-md);
	}
</style>
