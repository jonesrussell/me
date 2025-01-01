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
		margin-bottom: var(--ch4);
		font-family: 'Fira Code', monospace;
		text-align: center;
	}

	.name {
		font-size: 1.2em;
	}

	.title {
		margin: var(--ch) 0;
		color: var(--text-muted);
	}

	.specialties {
		color: var(--text-muted);
	}
</style>
