<script lang="ts">
	import { base } from '$app/paths';

	const { links } = $props<{
		links: Array<{
			href: string;
			icon: string;
			text: string;
		}>;
	}>();
</script>

<style>
	.action-nav-cards {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
	}

	.action-card {
		display: flex;
		width: 100%;
		padding: var(--space-6);
		text-align: center;
		text-decoration: none;
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		flex-direction: column;
		align-items: center;
		gap: var(--space-6);
	}

	.action-card:hover {
		background: var(--color-mix-light);
		transform: translateY(-0.125rem);
	}

	:global(.action-icon) {
		display: block;
		font-size: var(--font-size-2xl);
		line-height: 1;
		text-align: center;
	}

	:global(.action-text) {
		display: block;
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		text-align: center;
		max-width: 20ch;
	}

	@media (width >= 30rem) {
		.action-nav-cards {
			flex-direction: row;
			justify-content: center;
		}

		.action-card {
			padding: var(--space-4);
			text-align: left;
			flex: 1;
			flex-direction: row;
			justify-content: center;
			gap: var(--space-4);
		}

		:global(.action-icon) {
			font-size: var(--font-size-xl);
		}

		:global(.action-text) {
			text-align: left;
			max-width: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.action-card {
			transition: none;
		}
	}
</style>

<nav class="action-nav-cards">
	{#each links as link (link.href)}
		<a href={`${base}${link.href}`} class="action-card">
			<span class="action-icon">{link.icon}</span>
			<span class="action-text">{link.text}</span>
		</a>
	{/each}
</nav>
