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

	@media (prefers-reduced-motion: reduce) {
		.specialty {
			transition: none;
			transform: none;
		}
	}
</style>
