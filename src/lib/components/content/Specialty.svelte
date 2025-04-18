<script lang="ts">
	import { fade } from 'svelte/transition';
	import { hoverScale } from '$lib/utils/animations';

	const { specialty, index, isIntersecting, isRevealed } = $props<{
		specialty: {
			title: string;
			description: string;
			icon: string;
		};
		index: number;
		isIntersecting: boolean;
		isRevealed: boolean;
	}>();
</script>

<style>
	.specialty {
		display: flex;
		padding: var(--space-6);
		text-align: center;
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
		transition: background 0.3s ease-out;
		opacity: 0;
		transform: translateX(var(--initial-offset));
		transition:
			opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.specialty.visible {
		opacity: 1;
		transform: translateX(0);
	}

	.specialty.intersecting {
		background: var(--color-mix-medium);
		border-color: var(--accent-color);
		box-shadow: 0 0 0 1px var(--accent-color);
	}

	.specialty:hover {
		background: var(--color-mix-light);
		transform: translateY(-0.125ch);
	}

	.specialty-icon {
		font-size: var(--font-size-2xl);
		line-height: var(--line-height-tight);
		color: var(--accent-color);
	}

	.specialty-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.specialty-title {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
		line-height: var(--line-height-tight);
	}

	.specialty-desc {
		font-size: var(--font-size-base);
		line-height: var(--line-height-base);
		color: var(--text-muted);
	}

	@media (width >= 80ch) {
		.specialty {
			flex-direction: row;
			text-align: left;
			align-items: flex-start;
			padding: var(--space-4);
		}

		.specialty-icon {
			margin-right: var(--space-3);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.specialty {
			transition: none;
			transform: none;
			opacity: 1;
		}

		.specialty.visible {
			transition: none;
			transform: none;
			opacity: 1;
		}
	}
</style>

<div
	class="specialty"
	class:visible={isRevealed}
	class:intersecting={isIntersecting}
	use:hoverScale
	style="--initial-offset: {index % 2 === 0 ? '-100%' : '100%'}"
>
	<div class="specialty-icon">{specialty.icon}</div>
	<div class="specialty-content">
		<div class="specialty-title">{specialty.title}</div>
		<div class="specialty-desc">{specialty.description}</div>
	</div>
</div>
