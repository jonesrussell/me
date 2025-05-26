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
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-4);
		background: var(--color-surface-2);
		border-radius: var(--radius-2);
	}

	.specialty-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.specialty-title {
		font-size: var(--font-size-3);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-1);
	}

	.specialty-desc {
		font-size: var(--font-size-2);
		color: var(--color-text-2);
		max-width: var(--measure);
	}

	.specialty-icon {
		font-size: var(--font-size-4);
		color: var(--accent-color);
	}

	@container specialty (width >= 30rem) {
		.specialty {
			flex-direction: row;
			align-items: flex-start;
			gap: var(--space-4);
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
	style="--initial-offset: {index % 2 === 0 ? '-100%' : '100%'}"
>
	<div class="specialty-icon">{specialty.icon}</div>
	<div class="specialty-content">
		<div class="specialty-title">{specialty.title}</div>
		<div class="specialty-desc">{specialty.description}</div>
	</div>
</div>
