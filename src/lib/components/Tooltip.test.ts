import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Tooltip from './Tooltip.svelte';

describe('Tooltip', () => {
	it('renders with required props', () => {
		const { container } = render(Tooltip, {
			props: {
				text: 'Tooltip text',
				children: () => '<button>Hover me</button>'
			}
		});

		const wrapper = container.querySelector('.tooltip-wrapper');
		const tooltip = container.querySelector('.tooltip');

		expect(wrapper).toBeInTheDocument();
		expect(tooltip).toBeInTheDocument();
		expect(tooltip?.textContent?.trim()).toBe('Tooltip text');
	});

	it('renders children content', () => {
		const { container } = render(Tooltip, {
			props: {
				text: 'Tooltip text',
				children: () => '<button>Hover me</button>'
			}
		});

		expect(container.textContent).toContain('Hover me');
	});

	it('positions tooltip correctly', () => {
		const positions = ['top', 'bottom', 'left', 'right'] as const;

		positions.forEach((position) => {
			const { container } = render(Tooltip, {
				props: {
					text: 'Tooltip text',
					position,
					children: () => '<button>Hover me</button>'
				}
			});

			const tooltip = container.querySelector('.tooltip');
			expect(tooltip).toHaveAttribute('data-position', position);
		});
	});

	it('has default top position', () => {
		const { container } = render(Tooltip, {
			props: {
				text: 'Tooltip text',
				children: () => '<button>Hover me</button>'
			}
		});

		const tooltip = container.querySelector('.tooltip');
		expect(tooltip).toHaveAttribute('data-position', 'top');
	});

	it('shows tooltip on hover', async () => {
		const { container } = render(Tooltip, {
			props: {
				text: 'Tooltip text',
				children: () => '<button>Hover me</button>'
			}
		});

		const wrapper = container.querySelector('.tooltip-wrapper') as HTMLElement;
		const tooltip = container.querySelector('.tooltip') as HTMLElement;

		expect(tooltip).toHaveClass('tooltip');
		expect(tooltip).not.toHaveClass('visible');

		// Hover state
		await fireEvent.mouseEnter(wrapper);
		expect(tooltip).toHaveClass('visible');

		// Remove hover
		await fireEvent.mouseLeave(wrapper);
		expect(tooltip).not.toHaveClass('visible');
	});

	it('has correct styling', () => {
		const { container } = render(Tooltip, {
			props: {
				text: 'Tooltip text',
					children: () => '<button>Hover me</button>'
			}
		});

		const wrapper = container.querySelector('.tooltip-wrapper');
		const tooltip = container.querySelector('.tooltip');

		expect(wrapper).toHaveStyle({
			position: 'relative',
			display: 'inline-block'
		});

		expect(tooltip).toHaveStyle({
			position: 'absolute',
			'white-space': 'nowrap',
			'z-index': '1'
		});
	});
});
