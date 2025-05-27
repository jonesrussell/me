<script lang="ts">
	const { text = 'Building elegant solutions with modern web technologies' } = $props<{
		text?: string;
	}>();
</script>

<style>
	.subtitle-bar {
		position: relative;
		width: 100%;
		margin-top: var(--space-4);
		padding-block: var(--space-4);
		border-bottom: var(--border-width) solid var(--border-color);
		background: var(--bg-darker);
	}

	.subtitle-bar::before {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 0.125rem;
		background: linear-gradient(90deg, var(--accent-color), var(--secondary-accent));
		opacity: 0.5;
		content: '';
	}

	.container {
		font-size: var(--font-size-sm);
		text-align: center;
		color: var(--text-muted);
		opacity: 0.9;
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		padding-inline: var(--space-4);
	}
</style>

<div class="subtitle-bar">
	<div class="container">{text}</div>
</div>
