<script lang="ts">
	import { base } from '$app/paths';
	const imagePath = `${base}/images/people/russell-jones`;
</script>

<style>
	.portrait {
		display: block;
		inline-size: min(100%, 20rem);
		block-size: auto;
		justify-self: center;
		border: 0.0625rem solid var(--border-color);
	}

	@media (width < 40rem) {
		.portrait {
			inline-size: min(100%, 12rem);
			justify-self: start;
		}
	}
</style>

<img
	class="portrait"
	src={`${imagePath}-640.webp`}
	srcset={`${imagePath}-192.webp 192w, ${imagePath}-320.webp 320w, ${imagePath}-640.webp 640w, ${imagePath}.webp 1000w`}
	sizes="(max-width: 639px) 192px, (max-width: 895px) 30vw, 320px"
	width="1000"
	height="1000"
	loading="eager"
	decoding="async"
	alt="Russell Jones smiling, wearing glasses and a dark suit jacket."
/>
