import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import YouTubeSection from '$lib/components/video/YouTubeSection.svelte';

describe('YouTubeSection Component', () => {
	const testProps = {
		channelUrl: 'https://youtube.com/@testchannel',
		videoId: 'test123',
		videoTitle: 'Test Video Title'
	};

	it('renders section header correctly', () => {
		render(YouTubeSection, testProps);
		expect(screen.getByText('Check out my YouTube channel')).toBeInTheDocument();
		expect(screen.getByText('I create content about web development, programming, and tech.')).toBeInTheDocument();
	});

	it('renders video iframe with correct props', () => {
		render(YouTubeSection, testProps);

		const iframe = screen.getByTitle(testProps.videoTitle);
		expect(iframe).toBeInTheDocument();
		expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${testProps.videoId}`);
		expect(iframe).toHaveAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
		expect(iframe).toHaveAttribute('allowfullscreen');
	});

	it('renders video title as figcaption', () => {
		render(YouTubeSection, testProps);
		expect(screen.getByText(testProps.videoTitle)).toBeInTheDocument();
	});

	it('renders YouTube link with correct props', () => {
		render(YouTubeSection, testProps);

		const link = screen.getByText('Subscribe to my channel').closest('a');
		expect(link).toHaveAttribute('href', testProps.channelUrl);
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		expect(screen.getByText('▶')).toBeInTheDocument();
	});

	it('applies correct styling classes', () => {
		render(YouTubeSection, testProps);

		const section = screen.getByRole('region', { name: 'youtube-section' });
		expect(section).toHaveClass('youtube-section');

		const figure = screen.getByRole('figure');
		expect(figure).toHaveClass('video-figure');

		const container = screen.getByRole('complementary');
		expect(container).toHaveClass('video-container');
	});
});
