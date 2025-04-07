<script lang="ts">
	const { title, description } = $props<{
		title: string;
		description: string;
	}>();
</script>

<div class="header">
	<h1>{title}</h1>
	<p class="intro">{description}</p>
</div>

<style>
	.header {
		margin-bottom: var(--space-6);
		text-align: center;
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.intro {
		margin: var(--space-3) 0 0 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	@media (width >= 48ch) {
		.header {
			margin-bottom: var(--space-8);
		}

		h1 {
			font-size: var(--font-size-xl);
		}

		.intro {
			margin: var(--space-4) 0 0 0;
			font-size: var(--font-size-lg);
		}
	}

	@media (width >= 80ch) {
		h1 {
			font-size: var(--font-size-2xl);
		}
	}
</style>
