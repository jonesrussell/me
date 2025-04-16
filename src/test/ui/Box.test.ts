import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Box from '$lib/components/layout/Box.svelte';

describe('Box', () => {
	it('renders with default props', () => {
		const { container } = render(Box, {
			props: {
				children: () => 'Test Content'
			}
		});

		const content = container.querySelector('.content');
		expect(content).toBeInTheDocument();
		expect(content?.textContent).toBe('Test Content');
	});

	it('renders with custom width', () => {
		const { container } = render(Box, {
			props: {
				width: 60,
				children: () => 'Wide Content'
			}
		});

		const box = container.querySelector('.box');
		const style = box?.getAttribute('style') || '';
		expect(style).toContain('--box-width: 60ch');
	});

	it('renders with title', () => {
		const { container } = render(Box, {
			props: {
				title: 'Test Title',
				children: () => 'Content'
			}
		});

		const title = container.querySelector('.title');
		expect(title).toBeInTheDocument();
		expect(title?.textContent).toBe('Test Title');
	});

	it('renders without title when not provided', () => {
		const { container } = render(Box, {
			props: {
				children: () => 'Content'
			}
		});

		const header = container.querySelector('.header');
		expect(header).not.toBeInTheDocument();
	});

	it('applies custom styles', () => {
		const { container } = render(Box, {
			props: {
				style: 'margin-top: 1rem;',
				children: () => 'Styled Content'
			}
		});

		const box = container.querySelector('.box');
		const style = box?.getAttribute('style') || '';
		expect(style).toContain('margin-top: 1rem;');
	});

	it('has proper CSS classes for styling', () => {
		const { container } = render(Box, {
			props: {
				children: () => 'Content'
			}
		});

		expect(container.querySelector('.box')).toBeInTheDocument();
		expect(container.querySelector('.box-frame')).toBeInTheDocument();
		expect(container.querySelector('.content')).toBeInTheDocument();
	});

	it('is accessible', () => {
		const { container } = render(Box, {
			props: {
				title: 'Accessible Box',
				children: () => 'Content'
			}
		});

		// Check semantic structure
		const box = container.querySelector('.box');
		expect(box).toBeInTheDocument();

		// Check title is visible when provided
		const title = container.querySelector('.title');
		expect(title).toBeInTheDocument();
		expect(title?.textContent).toBe('Accessible Box');

		// Check content is readable
		const content = container.querySelector('.content');
		expect(content).toBeInTheDocument();
		expect(content?.textContent).toBe('Content');
	});
});
