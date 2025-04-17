<script lang="ts">
	const { specialties } = $props<{
		specialties: Array<{
			title: string;
			description: string;
			icon: string;
		}>;
	}>();

	let revealedStates = $state<boolean[]>([]);

	$effect(() => {
		revealedStates = specialties.map(() => false);
		console.log('Initialized revealed states:', revealedStates);
	});

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const index = specialties.findIndex(
						(_: unknown, i: number) =>
							entry.target === document.querySelector(`.specialty:nth-child(${i + 1})`)
					);

					console.log(`Item ${index} intersection:`, {
						isIntersecting: entry.isIntersecting,
						intersectionRatio: entry.intersectionRatio,
						boundingClientRect: entry.boundingClientRect
					});

					if (index !== -1 && entry.isIntersecting) {
						console.log(`Scheduling reveal for item ${index} (${specialties[index].title})`);
						setTimeout(() => {
							revealedStates[index] = true;
							console.log(`Revealed item ${index} (${specialties[index].title})`);
							console.log('Current revealed states:', revealedStates);
						}, index * 150);
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: '0px 0px -50px 0px'
			}
		);

		const elements = document.querySelectorAll('.specialty');
		console.log(`Observing ${elements.length} specialty items`);
		elements.forEach((element, index) => {
			console.log(`Setting up observer for item ${index}`);
			observer.observe(element);
		});

		return () => {
			console.log('Cleaning up observers');
			elements.forEach((element) => observer.unobserve(element));
		};
	});
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
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.specialty.revealed {
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

		.specialty.revealed {
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
			<div
				class="specialty"
				class:revealed={revealedStates[i]}
				style="transform: {revealedStates[i]
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
		{/each}
	</div>
</div>
