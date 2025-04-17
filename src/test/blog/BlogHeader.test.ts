import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import BlogHeader from '$lib/components/blog/BlogHeader.svelte';

describe('BlogHeader', () => {
	it('renders the header title', () => {
		const { getByRole } = render(BlogHeader);
		const title = getByRole('heading', { level: 1 });
		expect(title).toHaveTextContent('Web Developer Blog');
	});

	it('renders the subtitle', () => {
		const { getByText } = render(BlogHeader);
		const subtitle = getByText('Open Source Enthusiast');
		expect(subtitle).toHaveClass('subtitle');
	});

	it('renders the Dev.to logo image', () => {
		const { getByRole } = render(BlogHeader);
		const image = getByRole('img', { name: 'Dev.to logo' });
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('width', '24');
		expect(image).toHaveAttribute('height', '24');
	});

	it('renders the Dev.to profile link', () => {
		const { getByRole } = render(BlogHeader);
		const link = getByRole('link', { name: 'View DEV.to profile' });
		expect(link).toHaveAttribute('href', 'https://dev.to/jonesrussell');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('renders the source note with correct links', () => {
		const { getByTestId, getAllByRole } = render(BlogHeader);
		const sourceNote = getByTestId('source-note');
		expect(sourceNote).toBeInTheDocument();

		const links = getAllByRole('link');
		const devToLink = links.find(
			link => link.getAttribute('href') === 'https://dev.to/jonesrussell'
		);
		const jekyllLink = links.find(
			link => link.getAttribute('href') === 'https://jonesrussell.github.io/blog/'
		);

		expect(devToLink).toHaveAttribute('target', '_blank');
		expect(devToLink).toHaveAttribute('rel', 'noopener noreferrer');

		expect(jekyllLink).toHaveAttribute('target', '_blank');
		expect(jekyllLink).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('has proper semantic structure and accessibility', () => {
		const { getByRole, getAllByRole } = render(BlogHeader);

		// Check semantic structure
		const banner = getByRole('banner');
		expect(banner).toBeInTheDocument();

		const heading = getByRole('heading', { level: 1 });
		expect(heading).toBeInTheDocument();

		// Check image accessibility
		const img = getByRole('img');
		expect(img).toHaveAttribute('alt');

		// Check link accessibility
		const links = getAllByRole('link');
		links.forEach(link => {
			expect(link).toHaveAttribute('target', '_blank');
			expect(link).toHaveAttribute('rel', 'noopener noreferrer');
			expect(link).toHaveAttribute('aria-label');
		});
	});
});
