import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Box from '$lib/components/ui/Box.svelte';

describe('Box', () => {
	it('renders with default props', () => {
		const { getByText } = render(Box, {
			props: {
				children: 'Test Content'
			}
		});

		expect(getByText('Test Content')).toBeInTheDocument();
	});

	it('renders with custom width', () => {
		const { container } = render(Box, {
			props: {
				width: 60,
				children: 'Wide Content'
			}
		});

		const box = container.querySelector('.box');
		expect(box).toHaveStyle({ '--box-width': '60ch' });
	});

	it('renders with title', () => {
		const { getByText } = render(Box, {
			props: {
				title: 'Test Title',
				children: 'Content'
			}
		});

		expect(getByText('Test Title')).toBeInTheDocument();
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

		expect(box).toBeInTheDocument();
		expect(boxFrame).toBeInTheDocument();
	});

	it('is accessible', () => {
		const { getByText } = render(Box, {
			props: {
				title: 'Accessible Box',
				children: 'Content'
			}
		});

		// Check title is visible when provided
		expect(getByText('Accessible Box')).toBeInTheDocument();
		// Check content is readable
		expect(getByText('Content')).toBeInTheDocument();
	});
});
