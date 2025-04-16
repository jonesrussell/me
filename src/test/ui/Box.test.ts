import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Box from '$lib/components/ui/Box.svelte';

describe('Box', () => {
	it('renders with default props', () => {
		const { container } = render(Box, {
			props: {
				children: 'Test Content'
			}
		});

		const content = container.querySelector('.box-content');
		if (!content) throw new Error('Box content not found');
		expect(content.textContent).toBe('Test Content');
	});

	it('renders with custom width', () => {
		const { container } = render(Box, {
			props: {
				width: 60,
				children: 'Wide Content'
			}
		});

		const box = container.querySelector('.box');
		if (!box) throw new Error('Box element not found');
		expect(box).toHaveStyle({ '--box-width': '60ch' });
	});

	it('renders with title', () => {
		const { container } = render(Box, {
			props: {
				title: 'Test Title',
				children: 'Content'
			}
		});

		const title = container.querySelector('.header');
		if (!title) throw new Error('Title element not found');
		expect(title.textContent).toBe('Test Title');
	});

	it('renders without title when not provided', () => {
		const { container } = render(Box, {
			props: {
				children: 'Content'
			}
		});

		expect(container.querySelector('.header')).not.toBeInTheDocument();
	});

	it('applies custom styles', () => {
		const { container } = render(Box, {
			props: {
				style: 'margin-top: 1rem;',
				children: 'Styled Content'
			}
		});

		const box = container.querySelector('.box');
		if (!box) throw new Error('Box element not found');
		expect(box).toHaveStyle({ marginTop: '1rem' });
	});

	it('has proper CSS classes for styling', () => {
		const { container } = render(Box, {
			props: {
				children: 'Content'
			}
		});

		const box = container.querySelector('.box');
		const boxFrame = container.querySelector('.box-frame');

		if (!box) throw new Error('Box element not found');
		if (!boxFrame) throw new Error('Box frame element not found');

		expect(box).toBeInTheDocument();
		expect(boxFrame).toBeInTheDocument();
	});

	it('is accessible', () => {
		const { container } = render(Box, {
			props: {
				title: 'Accessible Box',
				children: 'Content'
			}
		});

		const title = container.querySelector('.header');
		const content = container.querySelector('.box-content');

		if (!title) throw new Error('Title element not found');
		if (!content) throw new Error('Content element not found');

		expect(title.textContent).toBe('Accessible Box');
		expect(content.textContent).toBe('Content');
	});
});
