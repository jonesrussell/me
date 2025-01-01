<script lang="ts">
	const { title = '~/developer', command = 'whoami', children } = $props();
	let commandVisible = $state('');
	let outputVisible = $state('');
	let isTyping = $state(true);

	// Type out the command and output
	$effect(() => {
		const text = command;
		const output = children?.() || '';
		let cmdIndex = 0;
		let outIndex = 0;

		// Type command first
		const cmdInterval = setInterval(() => {
			if (cmdIndex <= text.length) {
				commandVisible = text.slice(0, cmdIndex);
				cmdIndex++;
			} else {
				clearInterval(cmdInterval);
				// Start typing output after command is done
				const outInterval = setInterval(() => {
					if (outIndex <= output.length) {
						outputVisible = output.slice(0, outIndex);
						outIndex++;
					} else {
						clearInterval(outInterval);
						isTyping = false;
					}
				}, 50);
			}
		}, 100);

		return () => {
			clearInterval(cmdInterval);
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
		<div class="command-line">
			<span class="prompt">$</span>
			<span class="command">{commandVisible}</span>
			{#if isTyping && commandVisible.length === command.length}
				<span class="cursor">▋</span>
			{/if}
		</div>
		<div class="command-output">
			{outputVisible}
			{#if isTyping && commandVisible.length === command.length}
				<span class="cursor">▋</span>
			{/if}
		</div>
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
		margin-bottom: var(--ch2);
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
