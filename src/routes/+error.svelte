<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	const isNotFound = $derived(page.status === 404);
</script>

<svelte:head
	><title>{isNotFound ? 'Page not found' : 'Unable to load page'} | Russell Jones</title><meta
		name="robots"
		content="noindex"
	/></svelte:head
>
<section class="site-container section-space error-page">
	<p class="eyebrow">{page.status}</p>
	<h1>{isNotFound ? 'Page not found.' : 'This page could not be loaded.'}</h1>
	<p>
		{isNotFound
			? 'The address may have changed, or the page may no longer be available.'
			: 'Please try again. If the problem continues, get in touch.'}
	</p>
	<div class="actions">
		<a class="button" href={resolve('/')}>Go home</a><a class="text-link" href={resolve('/contact')}
			>Contact Russell <span aria-hidden="true">→</span></a
		>
	</div>
</section>
