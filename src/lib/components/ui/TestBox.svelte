<script lang="ts">
	const { children } = $props<{
		children: unknown;
	}>();
</script>

<div>
	{@render children()}
</div>
