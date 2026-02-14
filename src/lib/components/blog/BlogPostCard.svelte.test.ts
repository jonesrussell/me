import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import BlogPostCard from './BlogPostCard.svelte';

const mockPost = {
	title: 'Testing in Go',
	link: 'https://example.com/testing-go',
	content: '<p>Learn how to write effective tests in Go using the standard testing package.</p>',
	published: '2025-01-10',
	formattedDate: 'January 10, 2025',
	categories: ['go', 'testing'],
	slug: 'testing-in-go'
};

describe('BlogPostCard', () => {
	it('should render the post title', () => {
		render(BlogPostCard, { props: { post: mockPost } });
		expect(screen.getByText('Testing in Go')).toBeTruthy();
	});

	it('should display categories in bracket format', () => {
		render(BlogPostCard, { props: { post: mockPost } });
		expect(screen.getByText('[go, testing]')).toBeTruthy();
	});

	it('should show published date', () => {
		render(BlogPostCard, { props: { post: mockPost } });
		expect(screen.getByText('2025-01-10')).toBeTruthy();
	});

	it('should render truncated excerpt', () => {
		render(BlogPostCard, { props: { post: mockPost } });
		expect(screen.getByText(/Learn how to write effective tests/)).toBeTruthy();
	});

	it('should link to the post', () => {
		const { container } = render(BlogPostCard, { props: { post: mockPost } });
		const link = container.querySelector('a[href="https://example.com/testing-go"]');
		expect(link).toBeTruthy();
	});
});
