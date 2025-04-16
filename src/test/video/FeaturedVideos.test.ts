import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import FeaturedVideos from '$lib/components/video/FeaturedVideos.svelte';
import type { Video } from '$lib/types';

const mockVideos: Video[] = [
	{
		embedId: 'video1',
		title: 'First Featured Video',
		description: 'Description for first featured video',
		date: '2024-04-16',
		topics: ['featured', 'svelte'],
		url: 'https://youtube.com/watch?v=video1'
	},
	{
		embedId: 'video2',
		title: 'Second Featured Video',
		description: 'Description for second featured video',
		date: '2024-04-15',
		topics: ['featured', 'typescript'],
		url: 'https://youtube.com/watch?v=video2'
	}
];

describe('FeaturedVideos', () => {
	it('renders the section title', () => {
		const { container } = render(FeaturedVideos, { videos: mockVideos });
		const title = container.querySelector('h2');
		expect(title).toHaveTextContent('🎥 Featured Videos');
	});

	it('renders all featured videos in the grid', () => {
		const { container } = render(FeaturedVideos, { videos: mockVideos });
		const videoCards = container.querySelectorAll('.video-card');
		expect(videoCards).toHaveLength(mockVideos.length);
	});

	it('renders video titles correctly', () => {
		const { container } = render(FeaturedVideos, { videos: mockVideos });
		const titles = container.querySelectorAll('.video-title');
		expect(titles).toHaveLength(mockVideos.length);
		titles.forEach((title, index) => {
			expect(title).toHaveTextContent(mockVideos[index].title);
		});
	});

	it('handles empty video list', () => {
		const { container } = render(FeaturedVideos, { videos: [] });
		const videoCards = container.querySelectorAll('.video-card');
		expect(videoCards).toHaveLength(0);
	});

	it('has correct CSS classes for responsive layout', () => {
		const { container } = render(FeaturedVideos, { videos: mockVideos });
		const section = container.querySelector('section');
		expect(section).toHaveClass('featured-videos');

		const grid = container.querySelector('.video-grid');
		expect(grid).toBeInTheDocument();
	});

	it('is accessible', () => {
		const { container } = render(FeaturedVideos, { videos: mockVideos });

		// Check semantic structure
		const section = container.querySelector('section');
		expect(section).toBeInTheDocument();
		expect(section).toHaveClass('featured-videos');

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
