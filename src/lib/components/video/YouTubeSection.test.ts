import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import YouTubeSection from './YouTubeSection.svelte';

describe('YouTubeSection', () => {
	const mockProps = {
		channelUrl: 'https://youtube.com/@example',
		videoId: 'abc123',
		videoTitle: 'Test Video'
	};

	it('renders the section header', () => {
		render(YouTubeSection, { props: mockProps });
		expect(screen.getByText('Check out my YouTube channel')).toBeInTheDocument();
		expect(screen.getByText('I create content about web development, programming, and tech.')).toBeInTheDocument();
	});

	it('renders the video iframe with correct attributes', () => {
		render(YouTubeSection, { props: mockProps });
		const iframe = screen.getByTitle(mockProps.videoTitle);
		expect(iframe).toBeInTheDocument();
		expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${mockProps.videoId}`);
		expect(iframe).toHaveAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
		expect(iframe).toHaveAttribute('allowfullscreen');
	});

	it('renders the video title as figcaption', () => {
		render(YouTubeSection, { props: mockProps });
		expect(screen.getByText(mockProps.videoTitle)).toBeInTheDocument();
	});

	it('renders the YouTube channel link with correct attributes', () => {
		render(YouTubeSection, { props: mockProps });
		const link = screen.getByText('Subscribe to my channel').closest('a');
		expect(link).toHaveAttribute('href', mockProps.channelUrl);
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});
});
