<script lang="ts">
	const { href = '#main' } = $props<{
		href?: string;
	}>();
</script>

<a {href} class="skip-to-main"> Skip to main content </a>

<style>
	.skip-to-main {
		position: absolute;
		z-index: 100;
		top: -100%;
		left: var(--space-4);

		padding: var(--space-4) var(--space-8);
		border-radius: var(--radius-sm);

		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--bg-color);
		text-decoration: none;

		opacity: 0;
		background: var(--accent-color);

		transition: opacity var(--transition-duration) var(--transition-timing);
	}

	.skip-to-main:focus {
		top: var(--space-4);
		opacity: 1;
	}
</style>
