<script lang="ts">
	import { slideIn, fadeIn, hoverScale } from '$lib/utils/animations';

	const { specialty, index, isIntersecting } = $props<{
		specialty: {
			title: string;
			description: string;
			icon: string;
		};
		index: number;
		isIntersecting: boolean;
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
	}

	.specialty.intersecting {
		background: var(--color-mix-medium);
		border-color: var(--accent-color);
	}

	.specialty-icon {
		font-size: var(--font-size-2xl);
		line-height: var(--line-height-tight);
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

	@media (width >= 48ch) {
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
		}
	}
</style>

<div
	class="specialty"
	class:intersecting={isIntersecting}
	use:hoverScale
	in:slideIn={{ delay: index * 100 }}
	out:fadeIn
>
	<div class="specialty-icon">{specialty.icon}</div>
	<div class="specialty-content">
		<div class="specialty-title">{specialty.title}</div>
		<div class="specialty-desc">{specialty.description}</div>
	</div>
</div>
