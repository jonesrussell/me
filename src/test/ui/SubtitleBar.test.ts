import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import SubtitleBar from '$lib/components/ui/SubtitleBar.svelte';

describe('SubtitleBar', () => {
	it('renders with default text', () => {
		const { container } = render(SubtitleBar);
		const subtitle = container.querySelector('.subtitle-bar');
		if (!subtitle) throw new Error('Subtitle element not found');
		expect(subtitle.textContent?.trim()).toBe(
			'Building elegant solutions with modern web technologies'
		);
	});

	it('renders with custom text', () => {
		const { container } = render(SubtitleBar, {
			props: {
				text: 'Custom Subtitle'
			}
		});
		const subtitle = container.querySelector('.subtitle-bar');
		if (!subtitle) throw new Error('Subtitle element not found');
		expect(subtitle.textContent?.trim()).toBe('Custom Subtitle');
	});

	it('has proper styling', () => {
		const { container } = render(SubtitleBar);
		const subtitle = container.querySelector('.subtitle-bar');
		if (!subtitle) throw new Error('Subtitle element not found');
		expect(subtitle).toHaveClass('subtitle-bar');
	});
});
