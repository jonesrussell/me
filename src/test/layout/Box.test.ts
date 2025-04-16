import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { tick } from 'svelte';
import Box from '$lib/components/layout/Box.svelte';

describe('Box', () => {
	it('renders with default props', async () => {
		const { container } = render(Box, {
			props: {
				children: () => 'Test Content'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		const content = container.querySelector('.content');
		expect(content).toBeInTheDocument();
		expect(content?.textContent?.trim()).toBe('Test Content');
	});

	it('renders with custom width', async () => {
		const { container } = render(Box, {
			props: {
				width: 60,
				children: () => 'Wide Content'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		const box = container.querySelector('.box');
		const style = box?.getAttribute('style') || '';
		expect(style).toContain('--box-width: 60ch');
	});

	it('renders with title', async () => {
		const { container } = render(Box, {
			props: {
				title: 'Test Title',
				children: () => 'Content'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		const title = container.querySelector('.title');
		expect(title).toBeInTheDocument();
		expect(title?.textContent?.trim()).toBe('Test Title');
	});

	it('renders without title when not provided', async () => {
		const { container } = render(Box, {
			props: {
				children: () => 'Content'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		const header = container.querySelector('.header');
		expect(header).not.toBeInTheDocument();
	});

	it('applies custom styles', async () => {
		const { container } = render(Box, {
			props: {
				style: 'margin-top: 1rem;',
				children: () => 'Styled Content'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		const box = container.querySelector('.box');
		const style = box?.getAttribute('style') || '';
		expect(style).toContain('margin-top: 1rem;');
	});

	it('has proper CSS classes for styling', async () => {
		const { container } = render(Box, {
			props: {
				children: () => 'Content'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		expect(container.querySelector('.box')).toBeInTheDocument();
		expect(container.querySelector('.box-frame')).toBeInTheDocument();
		expect(container.querySelector('.content')).toBeInTheDocument();
	});

	it('is accessible', async () => {
		const { container } = render(Box, {
			props: {
				title: 'Accessible Box',
				children: () => 'Content'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		// Check semantic structure
		const box = container.querySelector('.box');
		expect(box).toBeInTheDocument();

		// Check title is visible when provided
		const title = container.querySelector('.title');
		expect(title).toBeInTheDocument();
		expect(title?.textContent?.trim()).toBe('Accessible Box');

		// Check content is readable
		const content = container.querySelector('.content');
		expect(content).toBeInTheDocument();
		expect(content?.textContent?.trim()).toBe('Content');
	});
});
