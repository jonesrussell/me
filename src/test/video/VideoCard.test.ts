import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import VideoCard from '$lib/components/video/VideoCard.svelte';
import type { Video } from '$lib/types';

const mockVideo: Video = {
	embedId: 'test123',
	title: 'Test Video Title',
	description: 'This is a test video description',
	date: '2024-04-16',
	topics: ['testing', 'svelte', 'vitest'],
	url: 'https://youtube.com/watch?v=test123'
};

describe('VideoCard', () => {
	it('renders video iframe with correct embed ID', () => {
		const { container } = render(VideoCard, { video: mockVideo });
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeInTheDocument();
		expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${mockVideo.embedId}`);
		expect(iframe).toHaveAttribute('title', mockVideo.title);
	});

	it('renders video title', () => {
		const { container } = render(VideoCard, { video: mockVideo });
		const title = container.querySelector('.video-title');
		expect(title).toHaveTextContent(mockVideo.title);
	});

	it('renders video date when provided', () => {
		const { container } = render(VideoCard, { video: mockVideo });
		const date = container.querySelector('.video-date');
		expect(date).toHaveTextContent(mockVideo.date);
	});

	it('renders video description', () => {
		const { container } = render(VideoCard, { video: mockVideo });
		const description = container.querySelector('.description');
		expect(description).toHaveTextContent(mockVideo.description);
	});

	it('renders all topics', () => {
		const { container } = render(VideoCard, { video: mockVideo });
		const topics = container.querySelectorAll('.topic');
		expect(topics).toHaveLength(mockVideo.topics.length);
		topics.forEach((topic, index) => {
			expect(topic).toHaveTextContent(mockVideo.topics[index]);
		});
	});

	it('handles video without topics', () => {
		const videoWithoutTopics = { ...mockVideo, topics: [] };
		const { container } = render(VideoCard, { video: videoWithoutTopics });
		const topics = container.querySelectorAll('.topic');
		expect(topics).toHaveLength(0);
	});

	it('is accessible', () => {
		const { container } = render(VideoCard, { video: mockVideo });

		// Check iframe accessibility
		const iframe = container.querySelector('iframe');
		expect(iframe).toHaveAttribute('title', mockVideo.title);
		expect(iframe).toHaveAttribute('allowfullscreen');
		expect(iframe).toHaveAttribute('loading', 'lazy');

		// Check semantic structure
		const heading = container.querySelector('h3');
		expect(heading).toBeInTheDocument();
		const time = container.querySelector('time');
		expect(time).toBeInTheDocument();
	});
});
