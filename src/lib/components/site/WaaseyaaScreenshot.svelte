<script lang="ts">
	import { base } from '$app/paths';

	let { sizes = '100vw', loading = 'lazy' } = $props<{
		sizes?: string;
		loading?: 'eager' | 'lazy';
	}>();
	const imagePath = `${base}/images/projects/waaseyaa-homepage-2026-10-04`;
</script>

<style>
	.waaseyaa-screenshot {
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

<figure class="waaseyaa-screenshot">
	<a href="https://waaseyaa.org/">
		<img
			src={`${imagePath}-1240.webp`}
			srcset={`${imagePath}-480.webp 480w, ${imagePath}-640.webp 640w, ${imagePath}-960.webp 960w, ${imagePath}-1240.webp 1240w`}
			{sizes}
			width="1240"
			height="825"
			{loading}
			decoding="async"
			alt="Waaseyaa homepage with the headline Build content applications you control and the Fieldnotes example application."
		/>
	</a>
	<figcaption class="eyebrow">Live homepage / October 4, 2026</figcaption>
</figure>
