<script lang="ts">
	const { specialties } = $props<{
		specialties: Array<{
			title: string;
			description: string;
			icon: string;
		}>;
	}>();
</script>

<div class="specialties">
	<div class="section-header">
		<h2>My Specialties</h2>
		<p class="section-desc">Areas where I excel and bring value to projects</p>
	</div>
	{#each specialties as specialty}
		<div class="specialty">
			<div class="specialty-icon">{specialty.icon}</div>
			<div class="specialty-content">
				<div class="specialty-title">{specialty.title}</div>
				<div class="specialty-desc">{specialty.description}</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.specialties {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		width: 100%;
	}

	.section-header {
		margin-bottom: var(--space-8);
		text-align: center;
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

	@container (width < 40ch) {
		.specialty {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.specialty-icon {
			margin-bottom: var(--space-4);
		}
	}

	@media (width >= 48ch) {
		.specialties {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.specialty {
			transition: none;
			transform: none;
		}
	}
</style>
