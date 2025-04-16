import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import BlogHeader from '$lib/components/blog/BlogHeader.svelte';

describe('BlogHeader', () => {
	it('renders the header title', () => {
		const { container } = render(BlogHeader);
		const title = container.querySelector('h1');
		expect(title).toHaveTextContent('Web Developer Blog');
	});

	it('renders the subtitle', () => {
		const { container } = render(BlogHeader);
		const subtitle = container.querySelector('.subtitle');
		expect(subtitle).toHaveTextContent('Open Source Enthusiast');
	});

	it('renders the Dev.to logo image', () => {
		const { container } = render(BlogHeader);
		const image = container.querySelector('.header-image img');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('alt', 'Dev.to logo');
		expect(image).toHaveAttribute('width', '24');
		expect(image).toHaveAttribute('height', '24');
	});

	it('renders the Dev.to profile link', () => {
		const { container } = render(BlogHeader);
		const link = container.querySelector('.header-image a');
		expect(link).toHaveAttribute('href', 'https://dev.to/jonesrussell');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		expect(link).toHaveAttribute('aria-label', 'View DEV.to profile');
	});

	it('renders the source note with correct links', () => {
		const { container } = render(BlogHeader);
		const sourceNote = container.querySelector('.source-note');
		expect(sourceNote).toBeInTheDocument();

		const links = sourceNote?.querySelectorAll('a');
		expect(links).toHaveLength(2);

		// DEV.to link
		expect(links?.[0]).toHaveAttribute('href', 'https://dev.to/jonesrussell');
		expect(links?.[0]).toHaveAttribute('target', '_blank');
		expect(links?.[0]).toHaveAttribute('rel', 'noopener noreferrer');

		// Jekyll blog link
		expect(links?.[1]).toHaveAttribute('href', 'https://jonesrussell.github.io/blog/');
		expect(links?.[1]).toHaveAttribute('target', '_blank');
		expect(links?.[1]).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('has proper CSS classes for styling', () => {
		const { container } = render(BlogHeader);

		const header = container.querySelector('header');
		expect(header).toBeInTheDocument();

		const headerImage = container.querySelector('.header-image');
		expect(headerImage).toBeInTheDocument();

		const subtitle = container.querySelector('.subtitle');
		expect(subtitle).toBeInTheDocument();

		const sourceNote = container.querySelector('.source-note');
		expect(sourceNote).toBeInTheDocument();
	});

	it('is accessible', () => {
		const { container } = render(BlogHeader);

		// Check semantic structure
		const header = container.querySelector('header');
		expect(header).toBeInTheDocument();

		const h1 = container.querySelector('h1');
		expect(h1).toBeInTheDocument();

		// Check image accessibility
		const img = container.querySelector('img');
		expect(img).toHaveAttribute('alt');

		// Check link accessibility
		const links = container.querySelectorAll('a');
		links.forEach(link => {
			expect(link).toHaveAttribute('target', '_blank');
			expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		});
	});
});
