import { error } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { PageServerLoad } from './$types';
import { fetchPost } from '$lib/services/blog-service';
import { canonicalUrl } from '$lib/config/seo';
import { stripHtmlExcerpt } from '$lib/utils/excerpt';

export const prerender = false;

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const post = await fetchPost(fetch, params.slug);

		if (!post) {
			throw error(404, 'Blog post not found');
		}

		const description = stripHtmlExcerpt(post.content, 160);
		const canonical = canonicalUrl(base, `/blog/${post.slug}`);

		return {
			post,
			description,
			canonical
		};
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}
		throw error(500, 'An unexpected error occurred');
	}
};
