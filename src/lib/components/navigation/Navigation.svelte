<script lang="ts">
	const { links } = $props<{
		links: Array<{
			href: string;
			icon: string;
			text: string;
		}>;
	}>();
</script>

<style>
	.navigation {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
	}

	.nav-link {
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

	.nav-link:hover {
		background: var(--color-mix-light);
		transform: translateY(-0.125ch);
	}

	.nav-icon {
		font-size: var(--font-size-lg);
	}

	.nav-text {
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
	}

	@media (width >= 48ch) {
		.navigation {
			flex-direction: row;
			justify-content: center;
		}

		.nav-link {
			flex: 1;
			justify-content: center;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.nav-link {
			transition: none;
		}
	}
</style>

<nav class="navigation">
	{#each links as link (link.href)}
		<a href={link.href} class="nav-link">
			<span class="nav-icon">{link.icon}</span>
			<span class="nav-text">{link.text}</span>
		</a>
	{/each}
</nav>
