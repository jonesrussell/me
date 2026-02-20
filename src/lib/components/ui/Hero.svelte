<script lang="ts">
	import type { Snippet } from 'svelte';

	const { title, subtitle, variant, children } = $props<{
		title?: string;
		subtitle?: string;
		variant?: 'blog' | 'projects' | 'resources' | 'contact';
		children?: Snippet;
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
			padding: var(--space-32) var(--space-12);
		}

		.hero-title {
			font-size: var(--font-size-5xl);
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
		padding: var(--space-20) var(--space-8);
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
				var(--hero-accent, var(--color-mix-light)) 0%,
				transparent 70%
			);
		opacity: 0.12;
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
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.hero-subtitle {
		margin: var(--space-4) 0 0 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		letter-spacing: var(--letter-spacing-loose);
		color: var(--hero-accent, var(--text-muted));
	}

	/* Per-variant accent tints */
	.hero[data-variant='blog'] {
		--hero-accent: rgb(101 130 95);
	}

	.hero[data-variant='projects'] {
		--hero-accent: rgb(85 115 125);
	}

	.hero[data-variant='resources'] {
		--hero-accent: rgb(130 120 80);
	}

	.hero[data-variant='contact'] {
		--hero-accent: rgb(101 130 95);
	}

	.hero-topo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		color: var(--hero-accent, var(--accent-color));
		pointer-events: none;
		z-index: 0;
	}
</style>

<section class="hero" data-variant={variant || undefined}>
	<div class="hero-content">
		<h1 class="hero-title">{title}</h1>
		{#if subtitle}
			<p class="hero-subtitle">{subtitle}</p>
		{/if}
	</div>
	{#if children}
		{@render children()}
	{/if}
	{#if variant}
		<svg
			class="hero-topo"
			aria-hidden="true"
			viewBox="0 0 800 400"
			preserveAspectRatio="xMaxYMid slice"
			xmlns="http://www.w3.org/2000/svg"
		>
			<ellipse cx="650" cy="200" rx="50" ry="35" fill="none" stroke="currentColor" stroke-width="1" opacity="0.45" />
			<ellipse cx="650" cy="200" rx="100" ry="72" fill="none" stroke="currentColor" stroke-width="1" opacity="0.32" />
			<ellipse cx="650" cy="200" rx="155" ry="110" fill="none" stroke="currentColor" stroke-width="1" opacity="0.22" />
			<ellipse cx="650" cy="200" rx="215" ry="155" fill="none" stroke="currentColor" stroke-width="1" opacity="0.15" />
			<ellipse cx="650" cy="200" rx="280" ry="205" fill="none" stroke="currentColor" stroke-width="1" opacity="0.10" />
			<ellipse cx="650" cy="200" rx="355" ry="260" fill="none" stroke="currentColor" stroke-width="1" opacity="0.06" />
			<ellipse cx="650" cy="200" rx="440" ry="320" fill="none" stroke="currentColor" stroke-width="1" opacity="0.04" />
		</svg>
	{/if}
</section>
