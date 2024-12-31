<script lang="ts">
	const {
		title = '~/developer',
		command = 'whoami',
		content = () => ''
	} = $props();
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
			<span class="command">{command}</span>
		</div>
		{@render content()}
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
	}

	.command-line {
		font-family: 'Fira Code', monospace;
		margin-bottom: var(--ch2);
		color: var(--text-muted);
	}

	.prompt {
		color: var(--accent-color);
		margin-right: var(--ch);
	}

	.command {
		color: var(--text-color);
	}
</style>
