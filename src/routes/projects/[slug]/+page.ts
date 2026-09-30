import { error } from '@sveltejs/kit';
import { caseStudies } from '$lib/data/site';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => caseStudies.map(({ slug }) => ({ slug }));
export const prerender = true;
export const load: PageLoad = ({ params }) => {
	const project = caseStudies.find(project => project.slug === params.slug);
	if (!project) error(404, 'Project not found');
	return { project };
};
