<script lang="ts">
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
		container-type: inline-size;
		container-name: specialty;
		display: flex;
		padding: var(--space-4);
		background: var(--color-surface-2);
		border-radius: var(--radius-2);
		opacity: 0;
		transition:
			opacity 0.5s ease-out,
			transform 0.5s ease-out;
		transform: translateX(var(--initial-offset, 0));
		flex-direction: column;
		gap: var(--space-4);
	}

	.specialty.visible {
		opacity: 1;
		transform: translateX(0);
	}

	.specialty.intersecting {
		opacity: 1;
		transform: translateX(0);
	}

	.specialty:hover {
		transition: transform 0.2s ease-out;
		transform: scale(1.02);
	}

	.specialty-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.specialty-header {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: var(--space-2);
		line-height: 1;
	}

	.specialty-icon {
		display: inline-block;
		font-size: var(--font-size-4);
		line-height: 1;
		color: var(--accent-color);
		vertical-align: middle;
	}

	.specialty-title {
		display: inline-block;
		margin-bottom: 0;
		font-size: var(--font-size-3);
		font-weight: var(--font-weight-bold);
		line-height: 1;
		color: var(--color-text-1);
		vertical-align: middle;
	}

	.specialty-desc {
		font-size: var(--font-size-2);
		color: var(--color-text-2);
		max-width: var(--measure);
	}

	@container specialty (width >= 30rem) {
		.specialty {
			padding: var(--space-6);
		}

		.specialty-icon {
			font-size: var(--font-size-5);
		}
	}

	@container specialty (width >= 50rem) {
		.specialty {
			padding: var(--space-6);
		}

		.specialty-title {
			font-size: var(--font-size-4);
		}
	}
</style>

<div
	class="specialty"
	class:visible={isRevealed}
	class:intersecting={isIntersecting}
	use:hoverScale
	style="

--initial-offset: {index % 2 === 0 ? '-100%' : '100%'}"
>
	<div class="specialty-content">
		<div class="specialty-header">
			<div class="specialty-icon">{specialty.icon}</div>
			<div class="specialty-title">{specialty.title}</div>
		</div>
		<div class="specialty-desc">{specialty.description}</div>
	</div>
</div>
