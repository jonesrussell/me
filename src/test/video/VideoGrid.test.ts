import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import VideoGrid from '$lib/components/video/VideoGrid.svelte';
import type { Video } from '$lib/types';

const mockVideos: Video[] = [
	{
		embedId: 'video1',
		title: 'First Test Video',
		description: 'Description for first video',
		date: '2024-04-16',
		topics: ['testing', 'svelte'],
		url: 'https://youtube.com/watch?v=video1'
	},
	{
		embedId: 'video2',
		title: 'Second Test Video',
		description: 'Description for second video',
		date: '2024-04-15',
		topics: ['vitest', 'typescript'],
		url: 'https://youtube.com/watch?v=video2'
	}
];

describe('VideoGrid', () => {
	it('renders the section title', () => {
		const { container } = render(VideoGrid, { videos: mockVideos });
		const title = container.querySelector('h2');
		expect(title).toHaveTextContent('Creative Storytelling');
	});

	it('renders all videos in the grid', () => {
		const { container } = render(VideoGrid, { videos: mockVideos });
		const videoCards = container.querySelectorAll('.video-card');
		expect(videoCards).toHaveLength(mockVideos.length);
	});

	it('renders video titles correctly', () => {
		const { container } = render(VideoGrid, { videos: mockVideos });
		const titles = container.querySelectorAll('.video-title');
		expect(titles).toHaveLength(mockVideos.length);
		titles.forEach((title, index) => {
			expect(title).toHaveTextContent(mockVideos[index].title);
		});
	});

	it('handles empty video list', () => {
		const { container } = render(VideoGrid, { videos: [] });
		const videoCards = container.querySelectorAll('.video-card');
		expect(videoCards).toHaveLength(0);
	});

	it('is accessible', () => {
		const { container } = render(VideoGrid, { videos: mockVideos });

		// Check semantic structure
		const section = container.querySelector('section');
		expect(section).toBeInTheDocument();

		const heading = container.querySelector('h2');
		expect(heading).toBeInTheDocument();

		// Check grid structure
		const grid = container.querySelector('.video-grid');
		expect(grid).toBeInTheDocument();

		// Check video cards accessibility
		const iframes = container.querySelectorAll('iframe');
		iframes.forEach(iframe => {
			expect(iframe).toHaveAttribute('title');
			expect(iframe).toHaveAttribute('allowfullscreen');
			expect(iframe).toHaveAttribute('loading', 'lazy');
		});
	});
});
