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
		padding: var(--space-4);
		text-decoration: none;
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		align-items: center;
		gap: var(--space-2);
	}

	.action-card:hover {
		background: var(--color-mix-light);
		transform: translateY(-0.125ch);
	}

	.action-icon {
		font-size: var(--font-size-lg);
	}

	.action-text {
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
	}

	@media (width >= 48ch) {
		.action-nav-cards {
			flex-direction: row;
			justify-content: center;
		}

		.action-card {
			flex: 1;
			justify-content: center;
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
