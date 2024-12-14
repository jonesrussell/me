<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="error">
	<h1>{$page.status}: {$page.error?.message}</h1>
	<p>Sorry, something went wrong.</p>
	<a href="/">Return home</a>
</div>

<style>
	.error {
		padding: var(--ch4);
		text-align: center;
	}
</style>
