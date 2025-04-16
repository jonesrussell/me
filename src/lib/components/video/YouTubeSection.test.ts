import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import YouTubeSection from './YouTubeSection.svelte';

const mockProps = {
	videoId: 'test123',
	videoTitle: 'Test Video',
	channelUrl: 'https://youtube.com/channel/test',
	sectionTitle: 'Check out my YouTube channel',
	sectionSubtitle: 'I create content about web development, programming, and tech.'
};

describe('YouTubeSection', () => {
	it('renders the section header', () => {
		render(YouTubeSection, mockProps);
		expect(screen.getByText(mockProps.sectionTitle)).toBeInTheDocument();
		expect(screen.getByText(mockProps.sectionSubtitle)).toBeInTheDocument();
	});

	it('renders the video iframe with correct attributes', () => {
		render(YouTubeSection, mockProps);
		const iframe = screen.getByTitle(mockProps.videoTitle);
		expect(iframe).toBeInTheDocument();
		expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${mockProps.videoId}`);
		expect(iframe).toHaveAttribute('title', mockProps.videoTitle);
	});

	it('renders the video title as figcaption', () => {
		render(YouTubeSection, mockProps);
		expect(screen.getByText(mockProps.videoTitle)).toBeInTheDocument();
	});

	it('renders the YouTube channel link with correct attributes', () => {
		render(YouTubeSection, mockProps);
		const link = screen.getByText('Subscribe to my channel').closest('a');
		expect(link).toHaveAttribute('href', mockProps.channelUrl);
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('applies correct styling classes', () => {
		render(YouTubeSection, mockProps);
		expect(document.querySelector('.youtube-section')).toBeInTheDocument();
		expect(document.querySelector('.video-container')).toBeInTheDocument();
	});
});
