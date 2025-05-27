<script lang="ts">
	import { base } from '$app/paths';
	import devToImage from '$lib/images/dev.to.jpeg';
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
		--dev-to-bg: url('/images/dev.to.jpeg');

		container-type: inline-size;
		container-name: dev-to;

		position: relative;
		width: 100%;
		height: 50vh;
		min-height: 15rem;
		text-align: center;
		background: var(--bg-darker);
		overflow: hidden;
	}

	section::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: var(--dev-to-bg);
		background-size: cover;
		background-position: center;
		z-index: 0;
	}

	.dev-to-section {
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
		padding: var(--space-4);
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-end;
		gap: var(--space-2);
		z-index: 1;
	}

	.source-note {
		width: 100%;
		margin: 0;
		padding: var(--space-4);
		font-size: var(--font-size-base);
		line-height: 1.5;
		text-align: left;
		color: var(--text);
		background: var(--bg-darker);
		box-shadow: var(--shadow-md);
		backdrop-filter: blur(0.5rem);
		white-space: nowrap;
		box-sizing: border-box;
	}

	.heading {
		margin-bottom: var(--space-4);
		padding: var(--space-4);
		font-size: var(--font-size-2xl);
		font-weight: 700;
		text-align: center;
		color: var(--text);
		max-width: 100%;
		box-sizing: border-box;
	}

	.source-note .second-line {
		display: block;
		margin-top: 0.5rem;
		font-size: var(--font-size-xl);
	}

	.source-note a {
		display: inline-block;
		margin: 0 0.25ch;
		font-weight: 600;
		text-decoration: none;
		color: var(--accent-color);
		transition: color var(--transition-duration) var(--transition-timing);
	}

	.source-note a:hover {
		text-decoration: underline;
		color: var(--accent-color-hover);
	}

	@media (prefers-reduced-motion: reduce) {
		.source-note a {
			transition: none;
		}
	}

	@container dev-to (width >= 30rem) {
		section {
			height: 40vh;
			max-width: min(var(--measure), 95%);
		}
	}

	@container dev-to (width >= 50rem) {
		section {
			height: 30vh;
			max-width: min(var(--measure), 90%);
		}
	}

	@container dev-to (width >= 75rem) {
		section {
			height: 25vh;
			max-width: min(var(--measure), 85%);
		}
	}
</style>

<div class="container">
	<h2 class="heading">My Dev.to Posts</h2>
	<section>
		<div class="dev-to-section">
			<p class="source-note">
				This page and <a href={devToUrl} target="_blank" rel="noopener noreferrer">DEV.to</a>
				are syndicated
				<span class="second-line">
					from my
					<a href="https://jonesrussell.github.io/blog/" target="_blank" rel="noopener noreferrer"
						>Jekyll-powered blog</a
					>
				</span>
			</p>
		</div>
	</section>
</div>
