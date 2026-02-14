<script lang="ts">
	import { completedCount } from '$lib/stores/series-progress.svelte';

	const { title, description, seriesId, totalEntries, href } = $props<{
		title: string;
		description: string;
		seriesId: string;
		totalEntries: number;
		href: string;
	}>();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a {href} class="pinned-process">
	<div class="process-header">
		<span class="process-label">[SERIES]</span>
		<span class="process-title">{title}</span>
		<span class="process-dots" aria-hidden="true"></span>
		<span class="process-progress">{completedCount(seriesId)}/{totalEntries} completed</span>
	</div>
	<p class="process-description">&gt; {description}</p>
</a>

<style>
	.pinned-process {
		display: block;
		padding: var(--space-4);
		text-decoration: none;
		color: inherit;
		background: var(--bg-darker);
		border: 0.0625rem solid var(--border-color);
		border-radius: var(--radius-md);
		transition: border-color var(--transition-base);
	}

	.pinned-process:hover {
		border-color: var(--accent-color);
	}

	.process-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-2);
		flex-wrap: wrap;
	}

	.process-label {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-bold);
		text-transform: uppercase;
		color: var(--accent-color);
		letter-spacing: 0.05ch;
	}

	.process-label::before {
		content: '';
		display: inline-block;
		width: var(--space-2);
		height: var(--space-2);
		border-radius: var(--radius-full);
		background: var(--accent-color);
		margin-inline-end: var(--space-2);
		vertical-align: middle;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.4;
		}

		50% {
			opacity: 1;
		}
	}

	.process-title {
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.process-dots {
		flex-grow: 1;
		border-block-end: 0.0625rem dotted var(--border-color);
		height: 0.0625rem;
		min-width: var(--space-8);
	}

	.process-progress {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		white-space: nowrap;
	}

	.process-description {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		margin-block-start: var(--space-2);
		margin-block-end: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.pinned-process {
			transition: none;
		}

		.process-label::before {
			animation: none;
		}
	}
</style>
