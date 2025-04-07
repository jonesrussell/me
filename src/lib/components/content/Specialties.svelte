<script lang="ts">
	const { specialties } = $props<{
		specialties: Array<{
			title: string;
			description: string;
			icon: string;
		}>;
	}>();
</script>

<div class="specialties-container">
	<div class="section-header">
		<h2>My Specialties</h2>
		<p class="section-desc">Areas where I excel and bring value to projects</p>
	</div>
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
</div>

<style>
	.specialties-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		width: 100%;
	}

	.section-header {
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

	.specialties {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
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
	}

	.specialty-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.specialty-title {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.specialty-desc {
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	@media (width >= 48ch) {
		.specialties {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}

		.specialty {
			flex-direction: row;
			text-align: left;
			align-items: flex-start;
		}

		.specialty-icon {
			margin-right: var(--space-4);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.specialty {
			transition: none;
			transform: none;
		}
	}
</style>
