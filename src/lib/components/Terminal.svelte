<script lang="ts">
	const props = $props();
	const title = props.title || '~/developer';
	let commandVisible = $state('');
	let outputVisible = $state('');
	let currentCommand = $state(0);
	let isTyping = $state(true);

	const commands = ['whoami', 'man russell'];
	const outputs = [
		'russell',
		`RUSSELL(1)                     User Commands                     RUSSELL(1)

NAME
       russell - a limitless developer

SYNOPSIS
       russell [--code] [--create] [--solve] <problem>

DESCRIPTION
       Crafts elegant solutions using modern web technologies.
       Specializes in TypeScript, Go, and cloud architecture.

AUTHOR
       Written by Russell Jones.

COPYRIGHT
       License MIT`
	];

	// Type out commands and outputs in sequence
	$effect(() => {
		let cmdIndex = 0;
		let outIndex = 0;

		const typeNextCommand = () => {
			const cmdInterval = setInterval(() => {
				if (cmdIndex <= commands[currentCommand].length) {
					commandVisible = commands[currentCommand].slice(0, cmdIndex);
					cmdIndex++;
				} else {
					clearInterval(cmdInterval);
					typeOutput();
				}
			}, 100);
		};

		const typeOutput = () => {
			const outInterval = setInterval(() => {
				if (outIndex <= outputs[currentCommand].length) {
					outputVisible = outputs[currentCommand].slice(0, outIndex);
					outIndex++;
				} else {
					clearInterval(outInterval);
					if (currentCommand < commands.length - 1) {
						setTimeout(() => {
							currentCommand++;
							cmdIndex = 0;
							outIndex = 0;
							commandVisible = '';
							outputVisible = '';
							typeNextCommand();
						}, 1000);
					} else {
						isTyping = false;
					}
				}
			}, 25);
		};

		typeNextCommand();

		return () => {
			// Cleanup will be handled by individual intervals
		};
	});
</script>

<div class="terminal-frame">
	<div class="terminal-header">
		<span class="terminal-title">{title}</span>
		<div class="terminal-buttons">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
	<div class="terminal-body">
		{#each commands.slice(0, currentCommand + 1) as cmd, i}
			<div class="command-line">
				<span class="prompt">$</span>
				<span class="command">
					{i === currentCommand ? commandVisible : cmd}
				</span>
				{#if isTyping && i === currentCommand && commandVisible.length === cmd.length}
					<span class="cursor">▋</span>
				{/if}
			</div>
			<div class="command-output">
				{i === currentCommand ? outputVisible : outputs[i]}
				{#if isTyping && i === currentCommand && commandVisible.length === cmd.length}
					<span class="cursor">▋</span>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.terminal-frame {
		background: var(--bg-color);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 6px -1px
			color-mix(in srgb, var(--text-color) 10%, transparent);
	}

	.terminal-header {
		background: color-mix(in srgb, var(--text-color) 5%, transparent);
		padding: var(--ch) var(--ch2);
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--border-color);
	}

	.terminal-title {
		color: var(--text-muted);
		font-size: 0.9em;
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
		padding: var(--ch3) var(--ch2);
		font-family: var(--font-mono);
	}

	.command-line {
		margin-bottom: var(--ch);
		display: flex;
		gap: var(--ch);
		color: var(--text-muted);
	}

	.prompt {
		color: var(--accent-color);
	}

	.command {
		color: var(--text-color);
	}

	.command-output {
		padding-left: calc(var(--ch) * 2);
		color: var(--text-color);
		min-height: 1.5em;
		margin-bottom: var(--ch2);
		white-space: pre-line;
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
</style>
