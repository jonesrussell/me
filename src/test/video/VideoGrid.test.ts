import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import VideoGrid from '$lib/components/video/VideoGrid.svelte';
import type { Video } from '$lib/types/video';

const mockVideos: Video[] = [
	{
		title: 'First Test Video',
		description: 'Description for first video',
		topics: ['testing', 'svelte'],
		url: 'https://example.com/video1',
		embedId: 'video1',
		date: '2024-04-16'
	},
	{
		title: 'Second Test Video',
		description: 'Description for second video',
		topics: ['typescript', 'testing'],
		url: 'https://example.com/video2',
		embedId: 'video2',
		date: '2024-04-17'
	}
];

describe('VideoGrid', () => {
	it('renders all videos', () => {
		const { container } = render(VideoGrid, { videos: mockVideos });
		const videoCards = container.querySelectorAll('article');
		expect(videoCards).toHaveLength(mockVideos.length);
	});

	it('handles empty video list', () => {
		const { container } = render(VideoGrid, { videos: [] });
		const videoCards = container.querySelectorAll('article');
		expect(videoCards).toHaveLength(0);
	});
});
