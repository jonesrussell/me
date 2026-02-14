<script lang="ts">
	interface Props {
		postCount: number;
		lastUpdated: string;
	}

	const { postCount, lastUpdated }: Props = $props();
</script>

<style>
	.terminal-header {
		container-type: inline-size;
		position: relative;
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		overflow: hidden;
	}

	.terminal-header::after {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			rgb(255 255 255 / 0.02) 0,
			rgb(255 255 255 / 0.02) 1px,
			transparent 1px,
			transparent 3px
		);
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.terminal-header::after {
			display: none;
		}
	}

	.terminal-chrome {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-2) var(--space-4);
		background: color-mix(in srgb, var(--bg-darker) 90%, var(--border-color));
		border-block-end: 1px solid var(--border-color);
	}

	.terminal-dots {
		display: flex;
		gap: var(--space-2);
	}

	.terminal-dot {
		width: var(--space-3);
		height: var(--space-3);
		background: var(--border-color);
		border-radius: var(--radius-full);
	}

	.terminal-path {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.terminal-body {
		display: flex;
		padding: var(--space-4);
		flex-direction: column;
		gap: var(--space-2);
	}

	.terminal-prompt {
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		color: var(--text-color);
	}

	.terminal-prompt-symbol {
		color: var(--accent-color);
	}

	.terminal-output {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}
</style>

<div class="terminal-header">
	<div class="terminal-chrome">
		<div class="terminal-dots">
			<span class="terminal-dot"></span>
			<span class="terminal-dot"></span>
			<span class="terminal-dot"></span>
		</div>
		<span class="terminal-path">/blog</span>
	</div>
	<div class="terminal-body">
		<div class="terminal-prompt">
			<span class="terminal-prompt-symbol">$</span> ls -la ./posts
		</div>
		<div class="terminal-output">
			total {postCount} articles &middot; last updated {lastUpdated}
		</div>
	</div>
</div>
