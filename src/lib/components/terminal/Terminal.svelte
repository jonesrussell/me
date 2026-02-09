<script lang="ts">
	import { terminalState, terminal } from '$lib/stores/terminal.svelte';
	import type { Command } from '$lib/stores/terminal.svelte';
	import ErrorBoundary from '../ErrorBoundary.svelte';

	const { title = '~/dev' } = $props<{
		title?: string;
	}>();

	let terminalError = $state(false);

	const leftCommands = $derived(
		terminalState.commands.filter((c: Command) => c.pane === 'left')
	);
	const rightCommands = $derived(
		terminalState.commands.filter((c: Command) => c.pane === 'right')
	);
	const currentCommandData = $derived(
		terminalState.commands[terminalState.currentCommand]
	);
	const currentIsRightPane = $derived(currentCommandData?.pane === 'right');

	$effect(() => {
		try {
			terminal.loadCommands(); // Will use default commands
		} catch (error) {
			console.error('Terminal error:', error);
			terminalError = true;
		}
		return () => {
			try {
				terminal.stop();
			} catch (error) {
				console.error('Error stopping terminal:', error);
			}
		};
	});

	function handleRetry() {
		terminalError = false;
		try {
			terminal.loadCommands();
		} catch (error) {
			console.error('Terminal retry error:', error);
			terminalError = true;
		}
	}
</script>

<style>


	@media (width >= 30rem) {
		.terminal-frame {
			max-width: min(var(--container-lg), 100%);
		}
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

	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}

		51%,
		100% {
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

		.terminal-body::after {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.terminal-retry-button {
			transition: none;
		}
	}

	.terminal-frame {
		display: flex;
		position: relative;
		container-type: inline-size;
		container-name: terminal;

		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;

		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);

		overflow: hidden;
		flex-direction: column;
	}

	.terminal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		height: var(--space-6);
		padding: 0 var(--space-4);
		border-bottom: 1px solid var(--border-color);

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
		border-radius: var(--radius-full);
	}

	.terminal-buttons span:nth-child(1) {
		background: rgb(255 95 87);
	}

	.terminal-buttons span:nth-child(2) {
		background: rgb(255 189 46);
	}

	.terminal-buttons span:nth-child(3) {
		background: rgb(39 201 63);
	}

	.terminal-body {
		display: flex;
		position: relative;
		flex-direction: column;
		gap: var(--space-2);

		padding: var(--space-4);
		overflow-x: auto;
		overflow-y: auto;

		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);

		min-height: 10rem;
		max-height: 30rem;
	}

	.pane {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		min-width: 0;
	}

	.pane-divider {
		display: none;
		flex-shrink: 0;
		width: 1px;
		background: var(--border-color);
		align-self: stretch;
	}

	/* Split layout only at tablet/desktop (≥48rem) to avoid squishing on small screens */
	@container terminal (width >= 48rem) {
		.terminal-body.terminal-body--split {
			flex-direction: row;
			gap: 0;
		}

		.terminal-body.terminal-body--split .pane {
			flex: 1;
			padding-inline: var(--space-2);
		}

		.terminal-body.terminal-body--split .pane:first-child {
			padding-inline-start: 0;
		}

		.terminal-body.terminal-body--split .pane:last-child {
			padding-inline-end: 0;
		}

		.terminal-body.terminal-body--split .pane-divider {
			display: block;
		}
	}

	/* CRT scanline overlay */
	.terminal-body::after {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			to bottom,
			transparent 0,
			transparent 0.125rem,
			rgb(0 0 0 / 0.03) 0.125rem,
			rgb(0 0 0 / 0.03) 0.25rem
		);
		pointer-events: none;
		z-index: 1;
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
		overflow-wrap: anywhere;
		text-shadow: 0 0 0.5rem color-mix(in srgb, var(--accent-color) 20%, transparent);
	}

	.command-output {
		margin-top: var(--space-2);
		padding-left: 3ch;

		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-relaxed);
		color: var(--text-color);
		white-space: pre-wrap;
		overflow-wrap: anywhere;

		animation: crt-reveal 0.1s linear;
	}

	.cursor {
		display: inline-block;

		width: var(--space-2);
		height: 100%;

		color: var(--accent-color);

		animation: blink 1s step-end infinite;
	}

	.terminal-error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-4);
		padding: var(--space-8);
		min-height: 10rem;
	}

	.terminal-error-content {
		text-align: center;
	}

	.terminal-error-icon {
		margin-bottom: var(--space-2);
		font-size: var(--font-size-2xl);
	}

	.terminal-error-message {
		margin-bottom: var(--space-4);
		color: var(--text-muted);
	}

	.terminal-retry-button {
		padding: var(--space-3) var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.terminal-retry-button:hover {
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
		border-color: var(--accent-color);
	}

	.terminal-retry-button:focus {
		outline: 0.125rem solid var(--accent-color);
		outline-offset: 0.125rem;
	}
</style>

<ErrorBoundary>
	<div
		class="terminal-frame"
		style:height={terminalState.height}
		style:min-height={terminalState.minHeight}
	>
		<div class="terminal-header">
			<span class="terminal-title">{title}</span>
			<div class="terminal-buttons">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div
			class="terminal-body"
			class:terminal-body--split={terminalState.splitOpen}
		>
			{#if terminalError}
				<div class="terminal-error">
					<div class="terminal-error-content">
						<div class="terminal-error-icon" aria-hidden="true">$</div>
						<p class="terminal-error-message">Terminal unavailable</p>
						<button class="terminal-retry-button" onclick={handleRetry}> Restart terminal </button>
					</div>
				</div>
			{:else if terminalState.splitOpen}
				<div class="pane pane-left">
					{#each leftCommands.filter((cmd) => cmd.completed) as command (command.cmd)}
						<div class="command-line">
							<span class="prompt">$</span>
							<span class="command">{command.cmd}</span>
						</div>
						<div class="command-output">{command.output}</div>
					{/each}
				</div>
				<div class="pane-divider" aria-hidden="true"></div>
				<div class="pane pane-right">
					{#each rightCommands.filter((cmd) => cmd.completed) as command (command.cmd)}
						<div class="command-line">
							<span class="prompt">$</span>
							<span class="command">{command.cmd}</span>
						</div>
						<div class="command-output">{command.output}</div>
					{/each}
					{#if terminalState.currentCommand < terminalState.commands.length && currentIsRightPane && !currentCommandData?.completed}
						<div class="command-line">
							<span class="prompt">$</span>
							<span class="command">{terminalState.commandVisible}</span>
							{#if terminalState.isTyping && terminalState.commandVisible.length === currentCommandData?.cmd?.length && !terminalState.outputVisible}
								<span class="cursor"></span>
							{/if}
						</div>
						<div class="command-output">{terminalState.outputVisible}</div>
					{/if}
				</div>
			{:else}
				{#each terminalState.commands.filter((cmd) => cmd.completed) as command (command.cmd)}
					<div class="command-line">
						<span class="prompt">$</span>
						<span class="command">{command.cmd}</span>
					</div>
					<div class="command-output">{command.output}</div>
				{/each}
				{#if terminalState.currentCommand < terminalState.commands.length && !currentCommandData?.completed}
					<div class="command-line">
						<span class="prompt">$</span>
						<span class="command">{terminalState.commandVisible}</span>
						{#if terminalState.isTyping && terminalState.commandVisible.length === terminalState.commands[terminalState.currentCommand]?.cmd?.length && !terminalState.outputVisible}
							<span class="cursor"></span>
						{/if}
					</div>
					<div class="command-output">{terminalState.outputVisible}</div>
				{/if}
			{/if}
		</div>
	</div>
</ErrorBoundary>
