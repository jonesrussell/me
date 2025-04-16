import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { tick } from 'svelte';
import ResourceCard from '$lib/components/resources/ResourceCard.svelte';

const mockResource = {
	title: 'Test Resource',
	url: 'https://example.com',
	description: 'A test resource description',
	category: 'Test Category',
	stars: 1000
};

describe('ResourceCard', () => {
	it('renders resource title as a link', async () => {
		const { container } = render(ResourceCard, {
			props: {
				resource: mockResource
			}
		});

		const title = container.querySelector('h3 a');
		expect(title).toBeInTheDocument();
		expect(title?.textContent?.trim()).toBe(mockResource.title);
		expect(title).toHaveAttribute('href', mockResource.url);
		expect(title).toHaveAttribute('target', '_blank');
		expect(title).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('renders resource description', async () => {
		const { container } = render(ResourceCard, {
			props: {
				resource: mockResource
			}
		});

		const description = container.querySelector('.description');
		expect(description).toBeInTheDocument();
		expect(description?.textContent?.trim()).toBe(mockResource.description);
	});

	it('renders star count badge', async () => {
		const { container } = render(ResourceCard, {
			props: {
				resource: mockResource
			}
		});

		const badge = container.querySelector('.badge');
		expect(badge).toBeInTheDocument();
		// Check that the badge contains the star count
		expect(badge?.textContent).toContain('⭐ 1,000');
	});

	it('renders category badge', async () => {
		const { container } = render(ResourceCard, {
			props: {
				resource: mockResource
			}
		});

		const categoryBadge = container.querySelector('.category .badge');
		expect(categoryBadge).toBeInTheDocument();
		// Check that the badge contains the category
		expect(categoryBadge?.textContent).toContain(mockResource.category);
	});

	it('handles resource without stars', async () => {
		const resourceWithoutStars = { ...mockResource, stars: undefined };
		const { container } = render(ResourceCard, {
			props: {
				resource: resourceWithoutStars
			}
		});

		const starBadge = container.querySelector('.badge');
		expect(starBadge?.textContent).not.toContain('⭐');
	});

	it('has proper CSS classes for styling', async () => {
		const { container } = render(ResourceCard, {
			props: {
				resource: mockResource
			}
		});

		expect(container.querySelector('.resource')).toBeInTheDocument();
		expect(container.querySelector('.resource-header')).toBeInTheDocument();
		expect(container.querySelector('.description')).toBeInTheDocument();
		expect(container.querySelector('.category')).toBeInTheDocument();
	});

	it('is accessible', async () => {
		const { container } = render(ResourceCard, {
			props: {
				resource: mockResource
			}
		});

		// Check semantic structure
		const article = container.querySelector('.resource');
		expect(article).toBeInTheDocument();

		const heading = container.querySelector('h3');
		expect(heading).toBeInTheDocument();

		// Check link accessibility
		const link = container.querySelector('a');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});
});
