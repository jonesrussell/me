<script lang="ts">
	import {
		commands,
		debug,
		terminal,
		terminalHeight
	} from '$lib/stores/terminal';
	const props = $props();
	const title = props.title || '~/developer';

	$effect(() => {
		terminal.start();
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
		{#each Array($terminal.currentCommand + 1) as _, i}
			<div class="command-line">
				<span class="prompt">$</span>
				<span class="command">
					{i === $terminal.currentCommand
						? $terminal.commandVisible
						: commands[i].cmd}
				</span>
				{#if $terminal.isTyping && i === $terminal.currentCommand && $terminal.commandVisible.length === commands[i].cmd.length && !$terminal.outputVisible}
					<span class="cursor">▋</span>
				{/if}
			</div>
			<div class="command-output">
				{i === $terminal.currentCommand
					? $terminal.outputVisible
					: commands[i].output}
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
		width: 100%;
		max-width: 80ch;
		background: var(--bg-color);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		overflow: visible;
		box-shadow: 0 4px 6px -1px
			color-mix(in srgb, var(--text-color) 10%, transparent);
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.terminal-header {
		height: 3ch;
		background: color-mix(in srgb, var(--text-color) 5%, transparent);
		padding: 0 var(--ch2);
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--border-color);
	}

	.terminal-title {
		color: var(--text-muted);
		font-size: 0.9em;
		font-weight: var(--font-weight-medium);
	}

	.terminal-buttons {
		display: flex;
		gap: var(--ch);

		& span {
			width: 12px;
			height: 12px;
			border-radius: 50%;
			background: var(--text-muted);
			opacity: 0.5;
		}
	}

	.terminal-body {
		padding: var(--ch);
		font-family: var(--font-mono);
		line-height: var(--line-height);
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.command-line {
		display: flex;
		gap: var(--ch);
		color: var(--text-muted);
		line-height: var(--line-height);
		font-weight: var(--font-weight-normal);
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
		padding-left: calc(var(--ch) * 2);
		color: var(--text-color);
		white-space: pre;
		animation: crtReveal 50ms linear;
		line-height: var(--line-height);
		font-weight: var(--font-weight-normal);
	}

	@keyframes crtReveal {
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
		top: calc(100% + 1rem);
		left: 0;
		right: 0;
		background: var(--bg-color);
		border: 1px solid var(--border-color);
		padding: var(--ch2);
		font-family: var(--font-mono);
		font-size: 0.8em;
		white-space: pre;
		z-index: 100;
		margin-bottom: 2rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
