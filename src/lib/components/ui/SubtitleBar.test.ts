import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import SubtitleBar from './SubtitleBar.svelte';

describe('SubtitleBar', () => {
	it('renders with default text', () => {
		const { container } = render(SubtitleBar);
		const subtitle = container.querySelector('.subtitle-bar');
		expect(subtitle).toBeInTheDocument();
		expect(subtitle?.textContent?.trim()).toBe('Building elegant solutions with modern web technologies');
	});

	it('renders with custom text', () => {
		const { container } = render(SubtitleBar, {
			props: {
				text: 'Custom Subtitle'
			}
		});
		const subtitle = container.querySelector('.subtitle-bar');
		expect(subtitle).toBeInTheDocument();
		expect(subtitle?.textContent?.trim()).toBe('Custom Subtitle');
	});

	it('has proper styling', () => {
		const { container } = render(SubtitleBar);
		const subtitle = container.querySelector('.subtitle-bar');
		expect(subtitle).toBeInTheDocument();
		expect(subtitle).toHaveClass('subtitle-bar');
	});
});
