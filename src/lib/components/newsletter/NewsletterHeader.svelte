<!-- NewsletterHeader.svelte -->
<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}

	let { title, description }: Props = $props();
</script>

<style>
	.newsletter-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		text-align: center;
	}

	.header-title {
		display: flex;
		gap: var(--space-2);
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-lg);
	}

	.bracket {
		font-weight: var(--font-weight-bold);
		color: var(--accent-color);
	}

	h3 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-base);
		color: var(--text-color);
	}

	.description {
		margin: 0;
		font-size: var(--font-size-2);
		color: var(--color-text-2);
		max-width: 65rem;
	}

	@media (--container-lg) {
		h3 {
			font-size: var(--font-size-4);
		}
	}
</style>

<div class="newsletter-header">
	<div class="header-title">
		<span class="bracket">[</span>
		<h3>{title}</h3>
		<span class="bracket">]</span>
	</div>
	<p class="description">{description}</p>
</div>
