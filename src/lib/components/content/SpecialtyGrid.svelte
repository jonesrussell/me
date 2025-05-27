<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';

	const props = $props<{
		specialties: Array<{
			title: string;
			description: string;
			icon: string;
		}>;
		title?: string;
		description?: string;
	}>();

	let elements = $state<HTMLElement[]>([]);
	let activeIntersection = $state<number | null>(null);
	let revealedStates = $derived(props.specialties.map(() => false));
	let allRevealed = $derived(revealedStates.every((state: boolean) => state));

	function handleIntersect(event: CustomEvent<IntersectionObserverEntry>, index: number) {
		const entry = event.detail;
		if (entry.isIntersecting && !revealedStates[index]) {
			revealedStates[index] = true;
			if (!allRevealed) {
				activeIntersection = index;
			}
		}
	}
</script>

<style>
	.specialty-grid {
		container-type: inline-size;
		container-name: specialty-grid;
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		width: 100%;
		margin-top: var(--space-16);
	}

	.grid {
		display: grid;
		gap: var(--space-8);
		grid-template-columns: 1fr;
		width: 100%;
	}

	.section-header {
		display: flex;
		width: 100%;
		margin-bottom: var(--space-8);
		flex-direction: column;
		gap: var(--space-4);
		text-align: center;
	}

	.section-title {
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.section-desc {
		margin: 0 auto;
		font-size: var(--font-size-lg);
		color: var(--text-muted);
		max-width: var(--measure);
	}

	.specialty {
		container-type: inline-size;
		container-name: specialty;
		display: flex;
		height: 100%;
		padding: var(--space-8);
		background: var(--bg-darker);
		border-radius: var(--radius-lg);
		opacity: 0;
		transition:
			transform var(--transition-duration) var(--transition-timing),
			opacity var(--transition-duration) var(--transition-timing);
		transform: translateY(var(--space-4));
		flex-direction: column;
		gap: var(--space-6);
		min-height: var(--space-32);
	}

	.specialty.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.specialty.intersecting {
		background: var(--bg-color);
	}

	.specialty:hover {
		transform: translateY(calc(var(--space-2) * -1));
	}

	.specialty-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		height: 100%;
	}

	.specialty-header {
		display: flex;
		align-items: center;
		gap: var(--space-6);
	}

	.specialty-icon {
		display: flex;
		width: var(--space-12);
		height: var(--space-12);
		padding: var(--space-2);
		font-size: var(--font-size-3xl);
		color: var(--accent-color);
		background: var(--color-mix-light);
		border-radius: var(--radius-lg);
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.specialty-title {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.specialty-desc {
		font-size: var(--font-size-lg);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
		flex: 1;
	}

	@container specialty-grid (width >= 40rem) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-6);
		}
	}

	@container specialty-grid (width >= 80rem) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
			gap: var(--space-6);
		}

		.specialty {
			min-height: var(--space-48);
		}

		.specialty-title {
			font-size: var(--font-size-lg);
		}

		.specialty-desc {
			font-size: var(--font-size-base);
		}
	}

	@container specialty (width >= 30rem) {
		.specialty {
			flex-direction: row;
			align-items: flex-start;
		}

		.specialty-icon {
			flex-shrink: 0;
		}
	}

	@container specialty (width >= 50rem) {
		.specialty {
			flex-direction: column;
		}

		.specialty-title {
			font-size: var(--font-size-2xl);
		}
	}
</style>

<div class="specialty-grid">
	{#if props.title || props.description}
		<div class="section-header">
			{#if props.title}
				<h2 class="section-title">{props.title}</h2>
			{/if}
			{#if props.description}
				<p class="section-desc">{props.description}</p>
			{/if}
		</div>
	{/if}

	<div class="grid">
		{#each props.specialties as specialty, i (specialty.title)}
			<IntersectionObserver
				element={elements[i]}
				on:observe={(e) => handleIntersect(e, i)}
				threshold={0.1}
				rootMargin="-50px"
			>
				<div bind:this={elements[i]}>
					<div
						class="specialty"
						class:visible={revealedStates[i]}
						class:intersecting={!revealedStates[i] && activeIntersection === i}
					>
						<div class="specialty-content">
							<div class="specialty-header">
								<div class="specialty-icon">{specialty.icon}</div>
								<div class="specialty-title">{specialty.title}</div>
							</div>
							<div class="specialty-desc">{specialty.description}</div>
						</div>
					</div>
				</div>
			</IntersectionObserver>
		{/each}
	</div>
</div>
