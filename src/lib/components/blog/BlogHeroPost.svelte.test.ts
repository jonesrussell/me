import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import BlogHeroPost from './BlogHeroPost.svelte';

const mockPost = {
	title: 'Building CLI Tools with Go',
	link: 'https://example.com/go-cli',
	content: '<p>A deep dive into building CLI tools with Go and Cobra.</p>',
	published: '2025-01-15',
	formattedDate: 'January 15, 2025',
	categories: ['go', 'cli'],
	slug: 'building-cli-tools-with-go'
};

describe('BlogHeroPost', () => {
	it('should render the post title', () => {
		render(BlogHeroPost, { props: { post: mockPost } });
		expect(screen.getByText('Building CLI Tools with Go')).toBeTruthy();
	});

	it('should display the LATEST badge', () => {
		render(BlogHeroPost, { props: { post: mockPost } });
		expect(screen.getByText('[LATEST]')).toBeTruthy();
	});

	it('should show metadata with date and categories', () => {
		render(BlogHeroPost, { props: { post: mockPost } });
		expect(screen.getByText(/January 15, 2025/)).toBeTruthy();
		expect(screen.getByText(/go, cli/)).toBeTruthy();
	});

	it('should render excerpt from content', () => {
		render(BlogHeroPost, { props: { post: mockPost } });
		expect(screen.getByText(/A deep dive into building CLI tools/)).toBeTruthy();
	});

	it('should link to the post', () => {
		const { container } = render(BlogHeroPost, { props: { post: mockPost } });
		const link = container.querySelector('a[href="https://example.com/go-cli"]');
		expect(link).toBeTruthy();
	});
});
