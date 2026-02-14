import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SeriesProgressBar from './SeriesProgressBar.svelte';

describe('SeriesProgressBar', () => {
	it('should render the progress text', () => {
		render(SeriesProgressBar, { props: { completed: 3, total: 14 } });
		expect(screen.getByText('3 of 14')).toBeTruthy();
	});

	it('should render a progress bar with correct width', () => {
		const { container } = render(SeriesProgressBar, { props: { completed: 7, total: 14 } });
		const fill = container.querySelector('.progress-fill') as HTMLElement;
		expect(fill.style.width).toBe('50%');
	});

	it('should show 0% when nothing is completed', () => {
		const { container } = render(SeriesProgressBar, { props: { completed: 0, total: 14 } });
		const fill = container.querySelector('.progress-fill') as HTMLElement;
		expect(fill.style.width).toBe('0%');
	});

	it('should show 100% when all completed', () => {
		const { container } = render(SeriesProgressBar, { props: { completed: 14, total: 14 } });
		const fill = container.querySelector('.progress-fill') as HTMLElement;
		expect(fill.style.width).toBe('100%');
	});

	it('should have accessible role and aria attributes', () => {
		render(SeriesProgressBar, { props: { completed: 5, total: 14 } });
		const bar = screen.getByRole('progressbar');
		expect(bar).toBeTruthy();
		expect(bar.getAttribute('aria-valuenow')).toBe('5');
		expect(bar.getAttribute('aria-valuemax')).toBe('14');
	});
});
