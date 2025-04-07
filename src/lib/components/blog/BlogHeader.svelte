<script lang="ts">
	import devToProfile from '$lib/images/dev.to.jpeg?enhanced';

	export const devToUrl = 'https://dev.to/jonesrussell' as const;
</script>

<header>
	<div class="header-image">
		<a href={devToUrl} target="_blank" rel="noopener noreferrer">
			<picture>
				<source
					type="image/webp"
					srcset={devToProfile.sources['image/webp']}
					sizes="(min-width: 1280px) 1280px, (min-width: 768px) 768px, 100vw"
				/>
				<source
					type="image/jpeg"
					srcset={devToProfile.sources['image/jpeg']}
					sizes="(min-width: 1280px) 1280px, (min-width: 768px) 768px, 100vw"
				/>
				<img
					{...devToProfile.img}
					alt="Russell Jones's DEV.to Profile"
					class="dev-to-screenshot"
					sizes="(min-width: 1280px) 1280px, (min-width: 768px) 768px, 100vw"
					fetchpriority="high"
					loading="eager"
					decoding="sync"
				/>
			</picture>
		</a>
	</div>
	<h1>Web Developer Blog</h1>
	<p class="subtitle">Open Source Enthusiast</p>
	<p class="source-note">
		This page and <a href={devToUrl} target="_blank" rel="noopener noreferrer"
			>DEV.to</a
		>
		are syndicated from my
		<a
			href="https://jonesrussell.github.io/blog/"
			target="_blank"
			rel="noopener noreferrer">Jekyll-powered blog</a
		>
	</p>
</header>

<style>
	@media (prefers-reduced-motion: reduce) {
		.header-image a,
		.source-note a {
			transition: none;
		}
	}

	@container (width > 48ch) {
		.header-image {
			max-width: 48ch;
		}
	}

	header {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin: 0 auto var(--space-16);
		padding: 0 var(--space-4);
		text-align: center;
	}

	.header-image {
		overflow: hidden;
		width: 100%;
		max-width: 34.75ch;
		margin: 0 auto var(--space-8);
		border-radius: var(--radius-md);
		aspect-ratio: 16/9;
		container-type: inline-size;
	}

	.header-image a {
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: var(--radius-md);
		transition: transform var(--transition-duration) var(--transition-timing);
		overflow: hidden;
	}

	.header-image a:hover {
		transform: scale(1.02);
	}

	.dev-to-screenshot {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--radius-md);
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-tight);
		color: var(--accent-color);
		background: linear-gradient(
			to right,
			var(--accent-color),
			var(--accent-color-hover)
		);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		margin: var(--space-4) auto 0;
		font-size: var(--font-size-lg);
		color: var(--text-muted);
	}

	.source-note {
		margin: var(--space-4) auto 0;
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}
</style>
