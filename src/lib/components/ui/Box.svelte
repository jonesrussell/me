<script lang="ts">
	const {
		title = undefined,
		width = undefined,
		children
	} = $props<{
		title?: string;
		width?: number;
		children: () => string;
	}>();
</script>

<style>
	.box {
		width: 100%;
		max-width: 100%;
		font-family: var(--font-mono);
		line-height: var(--line-height-tight);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
		transition: all var(--transition-duration) var(--transition-timing);
		min-width: 0;
		overflow-wrap: break-word;
	}

	@media (width >= 50rem) {
		.box {
			max-width: 40ch;
		}
	}

	.box:hover {
		box-shadow: var(--shadow-md);
		transform: translateY(-0.125rem);
	}

	.box-frame {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.header {
		padding: var(--space-2) var(--space-4);
		border-bottom: var(--border-width) solid var(--border-color);
		font-weight: var(--font-weight-medium);
		color: var(--text-muted);
	}

	@media (prefers-reduced-motion: reduce) {
		.box {
			transition: none;
		}
	}
</style>

<div class="box">
	<div class="box-frame">
		{#if title}
			<div class="header">
				<div class="title">{title}</div>
			</div>
		{/if}
		<div class="content">
			{@render children()}
		</div>
	</div>
</div>
