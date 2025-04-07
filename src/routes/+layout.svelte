<script lang="ts">
	import '../app.css';
	import SkipToMain from '$lib/components/SkipToMain.svelte';
	import Header from '$lib/components/Header.svelte';
	const { children } = $props();
</script>

<SkipToMain />

<div class="site">
	<Header />

	{@render children()}

	<footer class="footer">
		<div class="container">
			<p>
				&copy; {new Date().getFullYear()} Limitless Developer. All rights reserved.
			</p>
		</div>
	</footer>
</div>

<style>
	.site {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.footer {
		margin-top: auto;
		padding: var(--space-16) var(--space-4);
		border-top: var(--border-width) solid var(--border-color);

		font-size: var(--font-size-sm);
		color: var(--text-muted);
		text-align: center;

		background: var(--bg-darker);
	}
</style>
