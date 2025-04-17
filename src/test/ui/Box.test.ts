import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Box from '$lib/components/ui/Box.svelte';
import { createChildrenFunction } from '../test-utils';

describe('Box', () => {
	it('renders with default props', async () => {
		const { getByText } = render(Box, {
			props: {
				children: createChildrenFunction('Test Content')
			}
		});

		// Wait for the content to be rendered
		await new Promise(resolve => setTimeout(resolve, 0));
		expect(getByText('Test Content')).toBeInTheDocument();
	});

	it('renders with custom width', () => {
		const { container } = render(Box, {
			props: {
				width: 60,
				children: createChildrenFunction('Wide Content')
			}
		});

		const box = container.querySelector('.box') as HTMLElement;
		if (!box) throw new Error('Box element not found');
		expect(box.style.getPropertyValue('--box-width')).toBe('60ch');
	});

	it('renders with title', () => {
		const { getByText } = render(Box, {
			props: {
				title: 'Test Title',
				children: createChildrenFunction('Content')
			}
		});

		expect(getByText('Test Title')).toBeInTheDocument();
	});

	it('renders without title when not provided', () => {
		const { container } = render(Box, {
			props: {
				children: createChildrenFunction('Content')
			}
		});

		expect(container.querySelector('.header')).not.toBeInTheDocument();
	});

	it('applies custom styles', () => {
		const { container } = render(Box, {
			props: {
				style: 'margin-top: 1rem;',
				children: createChildrenFunction('Styled Content')
			}
		});

		const box = container.querySelector('.box') as HTMLElement;
		if (!box) throw new Error('Box element not found');
		expect(box.style.marginTop).toBe('1rem');
	});

	it('has required structural elements', () => {
		const { container } = render(Box, {
			props: {
				children: createChildrenFunction('Content')
			}
		});

		const box = container.querySelector('.box');
		const boxFrame = container.querySelector('.box-frame');
		const content = container.querySelector('.content');

		if (!box) throw new Error('Box element not found');
		if (!boxFrame) throw new Error('Box frame element not found');
		if (!content) throw new Error('Content element not found');

		expect(box).toBeInTheDocument();
		expect(boxFrame).toBeInTheDocument();
		expect(content).toBeInTheDocument();
	});

	it('is accessible', async () => {
		const { getByText } = render(Box, {
			props: {
				title: 'Accessible Box',
				children: createChildrenFunction('Content')
			}
		});

		// Wait for the content to be rendered
		await new Promise(resolve => setTimeout(resolve, 0));
		expect(getByText('Accessible Box')).toBeInTheDocument();
		expect(getByText('Content')).toBeInTheDocument();
	});
});
