import { describe, it, expect, vi } from 'vitest';
import { renderComponent, simulateInput, testComponentEvent } from '../test-utils';
import Input from '$lib/components/ui/Input.svelte';

describe('Input Component', () => {
	it('initializes with default value', () => {
		const { getByTestId } = renderComponent(Input);
		const input = getByTestId('input') as HTMLInputElement;
		expect(input.value).toBe('');
	});

	it('updates value on user input', async () => {
		const { getByTestId } = renderComponent(Input);
		const input = getByTestId('input') as HTMLInputElement;

		await simulateInput(input, 'test value');
		expect(input.value).toBe('test value');
	});

	it('emits change event with new value', async () => {
		const onChange = vi.fn();
		await testComponentEvent(
			Input,
			{ onChange },
			'change',
			{ value: 'test value' },
			onChange
		);
	});

	it('respects disabled state', () => {
		const { getByTestId } = renderComponent(Input, { disabled: true });
		const input = getByTestId('input') as HTMLInputElement;
		expect(input.disabled).toBe(true);
	});

	it('handles required validation', () => {
		const { getByTestId } = renderComponent(Input, { required: true });
		const input = getByTestId('input') as HTMLInputElement;
		expect(input.required).toBe(true);
	});

	it('supports different input types', () => {
		const { getByTestId } = renderComponent(Input, { type: 'email' });
		const input = getByTestId('input') as HTMLInputElement;
		expect(input.type).toBe('email');
	});

	it('maintains value after rerender', async () => {
		const { getByTestId, rerender } = renderComponent(Input);
		const input = getByTestId('input') as HTMLInputElement;

		await simulateInput(input, 'test value');
		await rerender({});

		expect(input.value).toBe('test value');
	});
});
