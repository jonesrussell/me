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
		width: 100%;
	}

	.footer {
		margin-top: auto;
		padding: var(--space-8) var(--space-4);
		font-size: var(--font-size-sm);
		text-align: center;
		color: var(--text-muted);
		background: var(--bg-darker);
		border-top: var(--border-width) solid var(--border-color);
	}

	@media (width >= 48ch) {
		.footer {
			padding: var(--space-16) var(--space-8);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none !important;
			animation: none !important;
		}
	}
</style>
