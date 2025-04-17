<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const { specialties } = $props<{
		specialties: Array<{
			title: string;
			description: string;
			icon: string;
		}>;
	}>();

	let elements = $state<HTMLElement[]>([]);
	let intersectingStates = $state<boolean[]>([]);

	$effect(() => {
		intersectingStates = specialties.map(() => false);
	});

	function handleIntersect(event: CustomEvent<IntersectionObserverEntry>, index: number) {
		const entry = event.detail;
		console.log(`Item ${index} is intersecting:`, entry.isIntersecting);

		if (entry.isIntersecting && !intersectingStates[index]) {
			intersectingStates[index] = true;
		}
	}
</script>

<style>
	.specialties-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--space-2);
	}

	h2 {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.section-desc {
		margin-top: var(--space-2);
		font-size: var(--font-size-base);
		color: var(--text-muted);
	}

	.specialties {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-top: var(--space-2);
	}

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
			opacity 1s ease-out,
			transform 1s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.specialty.visible {
		opacity: 1;
		transform: translateX(0);
	}

	.specialty:hover {
		background: var(--color-mix-light);
		transform: translateY(-0.125ch) translateX(0);
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
		.specialties {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-4);
		}

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

<div class="specialties-container">
	<div class="section-header">
		<h2>My Specialties</h2>
		<p class="section-desc">Areas where I excel and bring value to projects</p>
	</div>
	<div class="specialties">
		{#each specialties as specialty, i (specialty.title)}
			<IntersectionObserver
				element={elements[i]}
				on:observe={(e) => handleIntersect(e, i)}
				threshold={0}
				rootMargin="0px 0px -200px 0px"
			>
				<div
					bind:this={elements[i]}
					class="specialty"
					class:visible={intersectingStates[i]}
					style="transform: {intersectingStates[i]
						? 'translateX(0)'
						: i % 2 === 0
							? 'translateX(-100%)'
							: 'translateX(100%)'};"
				>
					<div class="specialty-icon">{specialty.icon}</div>
					<div class="specialty-content">
						<div class="specialty-title">{specialty.title}</div>
						<div class="specialty-desc">{specialty.description}</div>
					</div>
				</div>
			</IntersectionObserver>
		{/each}
	</div>
</div>
