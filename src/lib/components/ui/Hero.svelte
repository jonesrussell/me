<script lang="ts">
	const { title, subtitle, children } = $props<{
		title?: string;
		subtitle?: string;
		children?: () => unknown;
	}>();
</script>

<style>
	.hero {
		display: flex;
		position: relative;
		width: 100%;
		padding: var(--space-12) var(--space-4);
		background: linear-gradient(to bottom, var(--bg-color), var(--bg-darker));
		border-radius: var(--radius-lg);
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
		overflow: hidden;
	}

	.hero-content {
		text-align: center;
		z-index: 1;
	}

	.hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, var(--color-mix-faint) 0%, transparent 70%);
		pointer-events: none;
	}

	.hero-title {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.hero-subtitle {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-xl);
		color: var(--text-muted);
	}

	@media (--container-md) {
		.hero {
			min-height: 60vh;
			padding: var(--space-20) var(--space-8);
		}

		.hero-title {
			font-size: var(--font-size-4xl);
		}
	}
</style>

<section class="hero">
	<div class="hero-content">
		<h1 class="hero-title">{title}</h1>
		{#if subtitle}
			<p class="hero-subtitle">{subtitle}</p>
		{/if}
	</div>
	{#if children}
		{@render children()}
	{/if}
</section>
