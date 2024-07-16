<script lang="ts">
	export let action;
	export let label;
</script>

<button type="button" on:click={action} aria-label={label} class="w-[16px] border border-gray-400">
	<!-- Icon or character goes here -->
</button>
