<script lang="ts">
	const { title, subtitle, children } = $props<{
		title?: string;
		subtitle?: string;
		children?: () => unknown;
	}>();
</script>

<style>


	@keyframes hero-enter {
		from {
			opacity: 0;
			transform: translateY(0.5rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (--container-md) {
		.hero {
			min-height: 30vh;
			padding: var(--space-20) var(--space-8);
		}

		.hero-title {
			font-size: var(--font-size-4xl);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-content {
			animation: none;
		}
	}

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
		animation: hero-enter 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	/* Atmospheric radial gradient */
	.hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(
				ellipse 80% 60% at 50% 40%,
				var(--color-mix-light) 0%,
				transparent 70%
			);
		pointer-events: none;
	}

	/* Subtle grain texture */
	.hero::after {
		content: '';
		position: absolute;
		inset: 0;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 8rem;
		opacity: 0.03;
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
		margin: var(--space-2) 0 0 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-xl);
		color: var(--text-muted);
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
