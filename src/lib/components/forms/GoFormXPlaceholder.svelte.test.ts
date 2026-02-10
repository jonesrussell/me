import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import GoFormXPlaceholder from './GoFormXPlaceholder.svelte';

describe('GoFormXPlaceholder', () => {
	it('renders core message and data attribute', () => {
		const { container } = render(GoFormXPlaceholder);

		const wrapper = container.querySelector('[data-goformx-placeholder]');
		expect(wrapper).toBeTruthy();
		expect(wrapper?.textContent).toContain('GoFormX (Coming Soon)');
		expect(wrapper?.textContent).toContain('A unified form engine for all my sites.');
		expect(wrapper?.textContent).toContain('forms, but programmable');
	});

	it('renders optional title and description', () => {
		const { container } = render(GoFormXPlaceholder, {
			props: { title: 'Stay Updated', description: 'Subscribe for updates.' }
		});

		expect(container.querySelector('.placeholder-title')?.textContent).toBe('Stay Updated');
		expect(container.querySelector('.placeholder-description')?.textContent).toBe(
			'Subscribe for updates.'
		);
	});

	it('renders link to goformx.com', () => {
		const { container } = render(GoFormXPlaceholder);

		const link = container.querySelector('a[href="https://goformx.com/"]');
		expect(link).toBeTruthy();
		expect(link?.getAttribute('target')).toBe('_blank');
		expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
		expect(link?.textContent).toContain('Launching soon');
	});

	it('applies variant and class', () => {
		const { container } = render(GoFormXPlaceholder, {
			props: { variant: 'inline', class: 'custom-section' }
		});

		const wrapper = container.querySelector('[data-goformx-placeholder]');
		expect(wrapper?.classList.contains('placeholder')).toBe(true);
		expect(wrapper?.classList.contains('inline')).toBe(true);
		expect(wrapper?.classList.contains('custom-section')).toBe(true);
	});
});
