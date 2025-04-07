<script lang="ts">
	const { href = '#main' } = $props<{
		href?: string;
	}>();
</script>

<a {href} class="skip-to-main"> Skip to main content </a>

<style>
	.skip-to-main {
		position: absolute;
		top: -100%;
		left: var(--space-4);

		padding: var(--space-4) var(--space-8);

		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		text-decoration: none;
		color: var(--bg-color);
		background: var(--accent-color);
		border-radius: var(--radius-sm);

		opacity: 0;

		transition: opacity var(--transition-duration) var(--transition-timing);
		z-index: 100;
	}

	.skip-to-main:focus {
		top: var(--space-4);
		opacity: 1;
	}
</style>
