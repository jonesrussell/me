import type { Resource } from '$lib/types/resource';

export function filterResources(
	resources: Resource[],
	category: string | null,
	tags: string[],
	search: string
): Resource[] {
	return resources.filter((r) => {
		if (category && r.category !== category) return false;
		if (tags.length > 0 && !tags.every((t) => r.tags.includes(t))) return false;
		if (search) {
			const q = search.toLowerCase();
			const match =
				r.title.toLowerCase().includes(q) ||
				r.description.toLowerCase().includes(q) ||
				r.tags.some((t) => t.toLowerCase().includes(q));
			if (!match) return false;
		}
		return true;
	});
}

