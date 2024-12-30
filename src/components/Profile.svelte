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

<div class="profile">
	<div class="name">{name}</div>
	<div class="title">{title}</div>
	<div class="specialties">{specialties.join(' | ')}</div>
</div>

<style>
	.profile {
		text-align: center;
		margin-bottom: var(--ch4);
		font-family: 'Fira Code', monospace;
	}

	.name {
		font-size: 1.2em;
	}

	.title {
		color: var(--text-muted);
		margin: var(--ch) 0;
	}

	.specialties {
		color: var(--text-muted);
	}
</style>
