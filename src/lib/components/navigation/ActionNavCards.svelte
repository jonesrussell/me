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
		flex-direction: column;
		align-items: center;
		gap: var(--space-6);
		padding: var(--space-6);
		text-align: center;
		text-decoration: none;
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		width: 100%;
	}

	.action-card:hover {
		background: var(--color-mix-light);
		transform: translateY(-0.125ch);
	}

	:global(.action-icon) {
		font-size: var(--font-size-2xl);
		display: block;
		text-align: center;
		line-height: 1;
	}

	:global(.action-text) {
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		display: block;
		text-align: center;
		max-width: 20ch;
	}

	@media (min-width: 30rem) {
		.action-nav-cards {
			flex-direction: row !important;
			justify-content: center;
		}

		.action-card {
			flex: 1;
			flex-direction: row !important;
			justify-content: center;
			text-align: left;
			gap: var(--space-4);
			padding: var(--space-4);
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
