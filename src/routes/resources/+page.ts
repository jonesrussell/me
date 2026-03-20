import { loadResources } from '$lib/services/resource-loader';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const modules = import.meta.glob('$lib/data/resources/*.md', {
		query: '?raw',
		eager: true
	}) as Record<string, string>;

	// import.meta.glob with ?raw wraps content in { default: string }
	const rawModules: Record<string, string> = {};
	for (const [path, mod] of Object.entries(modules)) {
		rawModules[path] = typeof mod === 'string' ? mod : (mod as { default: string }).default;
	}

	const resources = loadResources(rawModules);

	return { resources };
};
