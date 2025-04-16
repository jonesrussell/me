import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import YouTubeSection from '$lib/components/video/YouTubeSection.svelte';

describe('YouTubeSection Component', () => {
	const testProps = {
		channelUrl: 'https://youtube.com/@testchannel',
		videoId: 'test123',
		videoTitle: 'Test Video Title',
		sectionTitle: 'Check out my YouTube channel',
		sectionSubtitle: 'I create content about web development, programming, and tech.'
	};

	it('renders section header correctly', () => {
		render(YouTubeSection, testProps);
		const title = document.querySelector('h2');
		expect(title).toBeInTheDocument();
		expect(title?.textContent).toBe(testProps.sectionTitle);

		const subtitle = document.querySelector('.section-desc');
		expect(subtitle).toBeInTheDocument();
		expect(subtitle?.textContent).toBe(testProps.sectionSubtitle);
	});

	it('renders video iframe with correct props', () => {
		render(YouTubeSection, testProps);

		const iframe = document.querySelector('iframe');
		expect(iframe).toBeInTheDocument();
		expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${testProps.videoId}`);
		expect(iframe).toHaveAttribute('title', testProps.videoTitle);
		expect(iframe).toHaveAttribute(
			'allow',
			'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
		);
		expect(iframe).toHaveAttribute('allowfullscreen');
	});

	it('renders video title as figcaption', () => {
		render(YouTubeSection, testProps);
		const figcaption = document.querySelector('figcaption');
		expect(figcaption).toBeInTheDocument();
		expect(figcaption?.textContent).toBe(testProps.videoTitle);
	});

	it('renders YouTube link with correct props', () => {
		render(YouTubeSection, testProps);

		const link = document.querySelector('.youtube-link');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', testProps.channelUrl);
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');

		const icon = document.querySelector('.youtube-icon');
		expect(icon).toBeInTheDocument();
		expect(icon?.textContent).toBe('▶');

		const linkText = document.querySelector('.youtube-link span:not(.youtube-icon)');
		expect(linkText).toBeInTheDocument();
		expect(linkText?.textContent).toBe('Subscribe to my channel');
	});

	it('applies correct styling classes', () => {
		render(YouTubeSection, testProps);

		const section = document.querySelector('.youtube-section');
		expect(section).toHaveClass('youtube-section');

		const figure = document.querySelector('.video-figure');
		expect(figure).toHaveClass('video-figure');

		const container = document.querySelector('.video-container');
		expect(container).toHaveClass('video-container');
	});
});
