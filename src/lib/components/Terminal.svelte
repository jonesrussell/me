<script lang="ts">
	const props = $props();
	const title = props.title || '~/developer';
	let commandVisible = $state('');
	let outputVisible = $state('');
	let currentCommand = $state(0);
	let isTyping = $state(true);
	let terminalHeight = $state('auto');

	const commands = ['whoami', 'man russell'];
	const outputs = [
		'russell',
		`RUSSELL(1)                     User Commands                     RUSSELL(1)

NAME
       russell - a limitless developer

SYNOPSIS
       russell [--build] [--innovate] [--ship] <solution>

DESCRIPTION
       Crafts elegant solutions using modern web technologies.
       Specializes in TypeScript, Go, and cloud architecture.

AUTHOR
       Written by Russell Jones.

COPYRIGHT
       License MIT`
	];

	$effect(() => {
		// When output changes, measure and set the height
		if (outputVisible && currentCommand === commands.length - 1) {
			terminalHeight =
				document.querySelector('.terminal-body')?.scrollHeight + 'px';
		}
	});

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
					// Show output instantly
					outputVisible = outputs[currentCommand];
					if (currentCommand < commands.length - 1) {
						setTimeout(() => {
							currentCommand++;
							cmdIndex = 0;
							commandVisible = '';
							outputVisible = '';
							typeNextCommand();
						}, 1000);
					} else {
						isTyping = false;
					}
				}
			}, 100);
		};

		typeNextCommand();

		return () => {
			// Cleanup will be handled by individual intervals
		};
	});
</script>

<div class="terminal-frame" style:height={terminalHeight}>
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
				{#if isTyping && i === currentCommand && commandVisible.length === cmd.length && !outputVisible}
					<span class="cursor">▋</span>
				{/if}
			</div>
			<div class="command-output">
				{i === currentCommand ? outputVisible : outputs[i]}
			</div>
		{/each}
	</div>
</div>

<style>
	.terminal-frame {
		width: 100%;
		max-width: 80ch;
		background: var(--bg-color);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 6px -1px
			color-mix(in srgb, var(--text-color) 10%, transparent);
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
		padding: var(--ch2);
		font-family: var(--font-mono);
		line-height: var(--line-height);
	}

	.command-line {
		display: flex;
		gap: var(--ch);
		color: var(--text-muted);
		margin-bottom: calc(var(--ch) * 0.5);
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
		margin-bottom: var(--ch);
		white-space: pre-line;
		animation: crtReveal 50ms linear;
	}

	@keyframes crtReveal {
		from {
			clip-path: inset(0 0 100% 0);
		}
		to {
			clip-path: inset(0 0 0 0);
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
</style>
