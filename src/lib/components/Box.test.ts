import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Box from './Box.svelte';

describe('Box', () => {
	it('renders with default props', () => {
		const { container } = render(Box, {
			props: {
				children: () => 'Test Content'
			}
		});
		const box = container.querySelector('.box');
		expect(box).toBeInTheDocument();
		expect(box).toHaveStyle({ '--box-width': '40ch' });
		expect(container.textContent).toContain('Test Content');
	});

	it('renders with custom width', () => {
		const { container } = render(Box, {
			props: {
				width: 60,
				children: () => 'Wide Content'
			}
		});
		const box = container.querySelector('.box');
		expect(box).toHaveStyle({ '--box-width': '60ch' });
		expect(container.textContent).toContain('Wide Content');
	});

	it('renders with title', () => {
		const { container } = render(Box, {
			props: {
				title: 'Test Box',
				children: () => 'Box Content'
			}
		});
		const header = container.querySelector('.header');
		expect(header?.textContent).toContain('Test Box');
		expect(container.textContent).toContain('Box Content');
	});

	it('renders with custom style', () => {
		const { container } = render(Box, {
			props: {
				style: 'margin-top: 1rem;',
				children: () => 'Styled Content'
			}
		});
		const box = container.querySelector('.box');
		expect(box).toHaveStyle({ 'margin-top': '1rem' });
		expect(container.textContent).toContain('Styled Content');
	});
}); 