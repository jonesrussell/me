<script lang="ts">
	import { base } from '$app/paths';
	export const devToUrl = 'https://dev.to/jonesrussell' as const;
</script>

<style>
	@media (prefers-reduced-motion: reduce) {
		.dev-to-section a,
		.source-note a {
			transition: none;
		}
	}

	section {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin: 0 auto var(--space-16);
		padding: 0 var(--space-4);
		text-align: center;
	}

	.dev-to-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
		margin-bottom: var(--space-16);
	}

	.dev-to-image {
		container-type: inline-size;
		width: 100%;
		border-radius: var(--radius-md);
		overflow: hidden;
		max-width: 24ch;
		aspect-ratio: 1;
	}

	.dev-to-image a {
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: var(--radius-md);
		transition: transform var(--transition-duration) var(--transition-timing);
		overflow: hidden;
	}

	.dev-to-image a:hover {
		transform: scale(1.02);
	}

	.dev-to-image img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--radius-md);
	}

	.source-note {
		margin: var(--space-4) auto 0;
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}
</style>

<section>
	<div class="dev-to-section">
		<div class="dev-to-image">
			<a href={devToUrl} target="_blank" rel="noopener noreferrer" aria-label="View DEV.to profile">
				<img alt="Dev.to logo" src={`${base}/images/dev.to.jpeg`} width="24" height="24" />
			</a>
		</div>
		<p class="source-note">
			This page and <a href={devToUrl} target="_blank" rel="noopener noreferrer">DEV.to</a>
			are syndicated from my
			<a href="https://jonesrussell.github.io/blog/" target="_blank" rel="noopener noreferrer"
				>Jekyll-powered blog</a
			>
		</p>
	</div>
</section>
