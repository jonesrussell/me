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

	@media (width >= 50rem) {
		.specialties {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 40rem), 1fr));
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
