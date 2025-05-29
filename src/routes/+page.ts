// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import type { Specialty } from '$lib/types/specialty';

export function load() {
	const YOUTUBE_CHANNEL = 'https://youtube.com/@fullstackdev42';
	const YOUTUBE_VIDEO_ID = 'B4v7ZDLxiS4';
	const YOUTUBE_VIDEO_TITLE = 'Add a Google Font to Tailwind CSS | 2023';
	const YOUTUBE_SECTION_TITLE = 'Tutorial';
	const YOUTUBE_SECTION_SUBTITLE = 'Web Development';
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
		{ href: '/projects', icon: '🚀', text: 'Browse my open source projects' },
		{ href: '/contact', icon: '✉️', text: 'Get in touch' }
	];

	return {
		youtubeChannel: YOUTUBE_CHANNEL,
		youtubeVideoId: YOUTUBE_VIDEO_ID,
		youtubeVideoTitle: YOUTUBE_VIDEO_TITLE,
		youtubeSectionTitle: YOUTUBE_SECTION_TITLE,
		youtubeSectionSubtitle: YOUTUBE_SECTION_SUBTITLE,
		terminalCommand: TERMINAL_COMMAND,
		specialties,
		navLinks
	};
}
