<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import Specialty from './Specialty.svelte';

	const { specialties } = $props<{
		specialties: Array<{
			title: string;
			description: string;
			icon: string;
		}>;
	}>();

	let elements = $state<HTMLElement[]>([]);
	let activeIntersection = $state<number | null>(null);
	let revealedStates = $derived(specialties.map(() => false));

	function handleIntersect(event: CustomEvent<IntersectionObserverEntry>, index: number) {
		const entry = event.detail;

		if (entry.isIntersecting) {
			revealedStates[index] = true;
			activeIntersection = index;
		}
	}
</script>

<style>
	.specialties-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
		margin-top: var(--space-16);
	}

	.section-header {
		display: flex;
		width: 100%;
		margin-bottom: var(--space-4);
		flex-direction: column;
		gap: var(--space-2);
	}

	.section-title {
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		text-align: left;
		color: var(--text-color);
	}

	.section-desc {
		font-size: var(--font-size-base);
		text-align: left;
		color: var(--text-muted);
		max-width: var(--measure);
	}

	.specialties {
		container-type: inline-size;
		container-name: specialties;
		display: grid;
		gap: var(--space-4);
		grid-template-columns: 1fr;
	}

	@container specialties (width >= 30rem) {
		.specialties-container {
			margin-top: var(--space-12);
		}

		.specialties {
			grid-template-columns: repeat(2, 1fr);
		}

		.section-title {
			font-size: var(--font-size-3xl);
		}
	}

	@container specialties (width >= 50rem) {
		.specialties-container {
			margin-top: var(--space-16);
		}

		.specialties {
			grid-template-columns: repeat(3, 1fr);
			gap: var(--space-6);
		}

		.section-title {
			font-size: var(--font-size-4xl);
		}
	}

	@container specialties (width >= 75rem) {
		.specialties {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>

<div class="specialties-container">
	<div class="section-header">
		<h2 class="section-title">My Specialties</h2>
		<p class="section-desc">Expert solutions for your unique challenges</p>
	</div>
	<div class="specialties">
		{#each specialties as specialty, i (specialty.title)}
			<IntersectionObserver
				element={elements[i]}
				on:observe={(e) => handleIntersect(e, i)}
				threshold={0.1}
				rootMargin="-50px"
			>
				<div bind:this={elements[i]}>
					<Specialty
						{specialty}
						index={i}
						isIntersecting={activeIntersection === i}
						isRevealed={revealedStates[i]}
					/>
				</div>
			</IntersectionObserver>
		{/each}
	</div>
</div>
