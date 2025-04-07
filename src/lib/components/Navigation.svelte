<script lang="ts">
	const { links } = $props<{
		links: Array<{
			href: string;
			icon: string;
			text: string;
		}>;
	}>();
</script>

<nav class="navigation">
	{#each links as link}
		<a href={link.href} class="nav-link">
			<span class="nav-icon">{link.icon}</span>
			<span class="nav-text">{link.text}</span>
		</a>
	{/each}
</nav>

<style>
	@container (width < 40ch) {
		.nav-link {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.nav-icon {
			margin-bottom: var(--space-2);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.nav-link {
			transition: none;
		}
	}
</style>
