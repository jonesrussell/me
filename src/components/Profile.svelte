<script lang="ts">
	// existing imports...

	let {
		name,
		title = 'Limitless Developer',
		specialties
	} = $props<{
		name: string;
		title?: string;
		specialties: string[];
	}>();
</script>

<div class="profile-container">
	<h1>{name}</h1>
	<h2>{title}</h2>
	<div class="specialties">
		{specialties.join(' | ')}
	</div>
</div>

<style>
	.profile-container {
		font-family: 'Fira Code', monospace;
		text-align: center;
		padding: 2rem;
	}

	.specialties {
		margin-top: 1rem;
		color: var(--text-secondary);
	}
</style>
