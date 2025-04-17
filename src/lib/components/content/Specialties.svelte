<script lang="ts">
	const { specialties } = $props<{
		specialties: Array<{
			title: string;
			description: string;
			icon: string;
		}>;
	}>();
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
		transition: all var(--transition-duration) var(--transition-timing);
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
	}

	.specialty:hover {
		background: var(--color-mix-light);
		transform: translateY(-0.125ch);
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
	}
</style>

<div class="specialties-container">
	<div class="section-header">
		<h2>My Specialties</h2>
		<p class="section-desc">Areas where I excel and bring value to projects</p>
	</div>
	<div class="specialties">
		{#each specialties as specialty (specialty.title)}
			<div class="specialty">
				<div class="specialty-icon">{specialty.icon}</div>
				<div class="specialty-content">
					<div class="specialty-title">{specialty.title}</div>
					<div class="specialty-desc">{specialty.description}</div>
				</div>
			</div>
		{/each}
	</div>
</div>
