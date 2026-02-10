import type { Specialty } from '$lib/types/specialty';
import { fetchNorthCloudFeed } from '$lib/services/northcloud-service';

export async function load({ fetch }) {
	// Organizing constants for better maintainability
	const YOUTUBE = {
		channel: 'https://youtube.com/@fullstackdev42',
		videoId: 'B4v7ZDLxiS4',
		videoTitle: 'Add a Google Font to Tailwind CSS | 2023',
		section: {
			title: 'Tutorial',
			subtitle: 'Web Development'
		}
	} as const;

	const TERMINAL_COMMAND = 'npm run dev';

	const specialties: Specialty[] = [
		{
			title: 'Modern JavaScript/TS',
			description: 'Building the future with cutting-edge web technologies',
			icon: '⚡'
		},
		{
			title: 'Golang & PHP',
			description: 'Crafting robust backend solutions with battle-tested technologies',
			icon: '🔧'
		},
		{
			title: 'AI Integration',
			description: 'Harnessing artificial intelligence to solve complex problems',
			icon: '🤖'
		},
		{
			title: 'Cloud & DevOps',
			description: 'Designing and automating scalable cloud-native solutions',
			icon: '☁️'
		}
	];

	const navLinks = [
		{ href: '/blog', icon: '📝', text: 'Read my technical articles' },
		{ href: '/projects', icon: '🚀', text: 'Browse my projects' },
		{ href: '/contact', icon: '✉️', text: 'Get in touch' }
	];

	let northCloudArticles: Awaited<ReturnType<typeof fetchNorthCloudFeed>> = [];
	try {
		northCloudArticles = await fetchNorthCloudFeed(fetch);
	} catch {
		// Feed optional on homepage; continue with empty list
	}

	return {
		youtube: YOUTUBE,
		terminalCommand: TERMINAL_COMMAND,
		specialties,
		navLinks,
		northCloudArticles: northCloudArticles.slice(0, 5)
	};
}
