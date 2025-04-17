import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Input from '$lib/components/ui/Input.svelte';

describe('Input Component', () => {
	it('initializes with default value', () => {
		const { container } = render(Input);
		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');
		expect(input.value).toBe('');
	});

	it('updates value on user input', async () => {
		const { container } = render(Input);
		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');

		await fireEvent.input(input, { target: { value: 'test value' } });
		expect(input.value).toBe('test value');
	});

	it('respects disabled state', () => {
		const { container } = render(Input, {
			props: { disabled: true }
		});

		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');
		expect(input.disabled).toBe(true);
	});

	it('handles required validation', () => {
		const { container } = render(Input, {
			props: { required: true }
		});

		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');
		expect(input.required).toBe(true);
	});

	it('supports different input types', () => {
		const { container } = render(Input, {
			props: { type: 'email' }
		});

		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');
		expect(input.type).toBe('email');
	});

	it('maintains value after rerender', async () => {
		const { container, rerender } = render(Input);
		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');

		await fireEvent.input(input, { target: { value: 'test value' } });
		await rerender({});

		expect(input.value).toBe('test value');
	});

	it('has proper accessibility attributes', () => {
		const { container } = render(Input);
		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');

		expect(input.getAttribute('role')).toBe('textbox');
		expect(input.getAttribute('aria-label')).toBe('Text input');
	});

	it('updates value with placeholder', () => {
		const { container } = render(Input, {
			props: { placeholder: 'Enter text' }
		});

		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');
		expect(input.placeholder).toBe('Enter text');
		expect(input.getAttribute('aria-label')).toBe('Enter text');
	});
});
