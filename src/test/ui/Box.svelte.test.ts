import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Box from '$lib/components/ui/Box.svelte';

describe('Box', () => {
	it('renders with default props', () => {
		render(Box, {
			props: {
				children: 'Test Content'
			}
		});

		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});

	it('renders with custom width', () => {
		render(Box, {
			props: {
				width: 60,
				children: 'Wide Content'
			}
		});

		const box = screen.getByText('Wide Content').closest('.box');
		expect(box).toHaveStyle({ '--box-width': '60ch' });
	});

	it('renders with title', () => {
		render(Box, {
			props: {
				title: 'Test Title',
				children: 'Content'
			}
		});

		expect(screen.getByText('Test Title')).toBeInTheDocument();
	});

	it('renders without title when not provided', () => {
		render(Box, {
			props: {
				children: 'Content'
			}
		});

		expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
	});

	it('applies custom styles', () => {
		render(Box, {
			props: {
				style: 'margin-top: 1rem;',
				children: 'Styled Content'
			}
		});

		const box = screen.getByText('Styled Content').closest('.box');
		expect(box).toHaveStyle({ marginTop: '1rem' });
	});

	it('has proper CSS classes for styling', () => {
		render(Box, {
			props: {
				children: 'Content'
			}
		});

		const box = screen.getByText('Content').closest('.box');
		const boxFrame = box?.querySelector('.box-frame');

		expect(box).toBeInTheDocument();
		expect(boxFrame).toBeInTheDocument();
	});

	it('is accessible', () => {
		render(Box, {
			props: {
				title: 'Accessible Box',
				children: 'Content'
			}
		});

		// Check title is visible when provided
		expect(screen.getByText('Accessible Box')).toBeInTheDocument();
		// Check content is readable
		expect(screen.getByText('Content')).toBeInTheDocument();
	});
});
