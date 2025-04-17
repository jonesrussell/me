<script lang="ts">
	import { elasticOut, expoOut } from 'svelte/easing';

	const { specialty, index, isVisible, isIntersecting } = $props<{
		specialty: {
			title: string;
			description: string;
			icon: string;
		};
		index: number;
		isVisible: boolean;
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
		opacity: 0;
		transform: translateX(-100%);
		transition:
			opacity 0.5s expoOut,
			transform 0.5s elasticOut,
			background 0.3s ease-out;
	}

	.specialty.visible {
		opacity: 1;
		transform: translateX(0);
	}

	.specialty.intersecting {
		background: var(--color-mix-medium);
		border-color: var(--accent-color);
	}

	.specialty:hover {
		background: var(--color-mix-light);
		transform: translateY(-0.125ch) translateX(0);
		transition:
			transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
			background 0.2s ease-out;
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
			transform: none;
		}

		.specialty.visible {
			opacity: 1;
			transform: none;
		}
	}
</style>

<div
	class="specialty"
	class:visible={isVisible}
	class:intersecting={isIntersecting}
	style="transform: {isVisible
		? 'translateX(0)'
		: index % 2 === 0
			? 'translateX(-100%)'
			: 'translateX(100%)'};
	transition-delay: {isVisible ? `${index * 0.1}s` : '0s'};"
>
	<div class="specialty-icon">{specialty.icon}</div>
	<div class="specialty-content">
		<div class="specialty-title">{specialty.title}</div>
		<div class="specialty-desc">{specialty.description}</div>
	</div>
</div>
