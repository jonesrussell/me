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
		} else if (activeIntersection === index) {
			activeIntersection = null;
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
		margin-bottom: var(--space-2);
		text-align: center;
	}

	.section-title {
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
		container-type: inline-size;
		container-name: specialties;
		display: grid;
		gap: var(--space-4);
		grid-template-columns: 1fr;
	}

	@container specialties (width >= 30rem) {
		.specialties {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@container specialties (width >= 50rem) {
		.specialties {
			grid-template-columns: repeat(3, 1fr);
			gap: var(--space-6);
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
		<h2 class="section-title">Our Specialties</h2>
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
