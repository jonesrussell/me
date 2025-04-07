<script lang="ts">
	const {
		src,
		alt,
		sizes,
		fetchpriority = 'auto',
		loading = 'lazy',
		className = '',
		width,
		height
	} = $props<{
		src: string;
		alt: string;
		sizes?: string;
		fetchpriority?: 'high' | 'low' | 'auto';
		loading?: 'lazy' | 'eager';
		className?: string;
		width?: number;
		height?: number;
	}>();
</script>

<enhanced:img {src} {alt} {width} {height} {sizes} {fetchpriority} {loading} class={className}
></enhanced:img>
