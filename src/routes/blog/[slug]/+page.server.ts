import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchPost } from '$lib/services/blog-service';

export const prerender = false;

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const post = await fetchPost(fetch, params.slug);

		if (!post) {
			throw error(404, 'Blog post not found');
		}

		return {
			post
		};
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}
		throw error(500, 'An unexpected error occurred');
	}
};
