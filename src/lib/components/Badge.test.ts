import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Badge from './Badge.svelte';

describe('Badge', () => {
	it('renders with default type', () => {
		const { container } = render(Badge, {
			props: {
				children: () => 'Test Badge'
			}
		});
		const badge = container.querySelector('.badge');
		expect(badge).toHaveClass('info');
		expect(badge?.textContent).toContain('Test Badge');
	});

	it('renders with success type', () => {
		const { container } = render(Badge, {
			props: {
				type: 'success',
				children: () => 'Success Badge'
			}
		});
		const badge = container.querySelector('.badge');
		expect(badge).toHaveClass('success');
		expect(badge?.textContent).toContain('Success Badge');
	});

	it('renders with warning type', () => {
		const { container } = render(Badge, {
			props: {
				type: 'warning',
				children: () => 'Warning Badge'
			}
		});
		const badge = container.querySelector('.badge');
		expect(badge).toHaveClass('warning');
		expect(badge?.textContent).toContain('Warning Badge');
	});

	it('renders with error type', () => {
		const { container } = render(Badge, {
			props: {
				type: 'error',
				children: () => 'Error Badge'
			}
		});
		const badge = container.querySelector('.badge');
		expect(badge).toHaveClass('error');
		expect(badge?.textContent).toContain('Error Badge');
	});
});
