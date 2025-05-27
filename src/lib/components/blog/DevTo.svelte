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

		position: relative;
		width: 100%;
		height: 50vh;
		min-height: 20rem;
		max-height: 40rem;
		margin: var(--space-16) auto;
		text-align: center;
		background: var(--bg-darker);
		max-width: min(var(--measure), 95%);
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
		padding-bottom: var(--space-8);
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-end;
		gap: var(--space-2);
		z-index: 1;
	}

	.source-note {
		width: 100%;
		margin: 0;
		margin-left: 0;
		padding: var(--space-6) var(--space-8);
		font-size: var(--font-size-lg);
		line-height: 1.5;
		text-align: left;
		color: var(--text);
		background: var(--bg-darker);
		box-shadow: var(--shadow-md);
		backdrop-filter: blur(0.5rem);
		white-space: nowrap;
		box-sizing: border-box;
	}

	.source-note .second-line {
		display: block;
		margin-top: 1rem;
		font-size: var(--font-size-3xl);
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
		}
	}

	@container dev-to (width >= 50rem) {
		section {
			height: 35vh;
		}
	}

	@container dev-to (width >= 75rem) {
		section {
			height: 30vh;
		}
	}
</style>

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
