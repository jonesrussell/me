<script lang="ts">
	const { completed, total } = $props<{
		completed: number;
		total: number;
	}>();

	const percentage = $derived(total > 0 ? Math.round((completed / total) * 100) : 0);
</script>

<div
	class="progress-container"
	role="progressbar"
	aria-valuenow={completed}
	aria-valuemin={0}
	aria-valuemax={total}
>
	<span class="progress-text">{completed} of {total}</span>
	<div class="progress-track">
		<div class="progress-fill" style:width="{percentage}%"></div>
	</div>
</div>

<style>
	.progress-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.progress-track {
		width: 100%;
		height: 0.5rem;
		background: var(--bg-darker);
		border: 0.0625rem solid var(--border-color);
		border-radius: var(--radius-sm);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--accent-color);
		border-radius: var(--radius-sm);
		transition: width 0.3s ease;
	}

	.progress-text {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}
</style>
