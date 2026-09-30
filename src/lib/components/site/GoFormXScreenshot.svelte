<script lang="ts">
	import { base } from '$app/paths';

	let { sizes = '100vw', loading = 'lazy' } = $props<{
		sizes?: string;
		loading?: 'eager' | 'lazy';
	}>();
	const imagePath = `${base}/images/projects/goformx-homepage-2026-09-30`;
</script>

<style>
	.goformx-screenshot {
		margin: 0;
	}

	a {
		display: block;
		background: white;
		border: 0.0625rem solid var(--border-color);
	}

	img {
		display: block;
		inline-size: 100%;
		block-size: auto;
	}

	figcaption {
		margin-block-start: 1rem;
	}
</style>

<figure class="goformx-screenshot">
	<a href="https://www.goformx.com/">
		<img
			src={`${imagePath}-1240.webp`}
			srcset={`${imagePath}-480.webp 480w, ${imagePath}-640.webp 640w, ${imagePath}-960.webp 960w, ${imagePath}-1240.webp 1240w`}
			{sizes}
			width="1240"
			height="825"
			{loading}
			decoding="async"
			alt="GoFormX homepage with the headline ‘One home for your forms’ and an illustrative shared inbox of synthetic submissions."
		/>
	</a>
	<figcaption class="eyebrow">Live homepage / September 30, 2026</figcaption>
</figure>
