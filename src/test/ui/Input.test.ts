import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Input from '$lib/components/ui/Input.svelte';

describe('Input', () => {
	// Core functionality tests
	it('renders an input element with default props', () => {
		const { container } = render(Input);
		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
		if (!input) throw new Error('Input element not found');
		expect(input).toHaveAttribute('type', 'text');
		expect(input).not.toBeDisabled();
		expect(input).not.toBeRequired();
	});

	it('handles different input types correctly', () => {
		const { container } = render(Input, { props: { type: 'email' } });
		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');
		expect(input).toHaveAttribute('type', 'email');

		const { container: container2 } = render(Input, { props: { type: 'password' } });
		const input2 = container2.querySelector('input');
		if (!input2) throw new Error('Input element not found');
		expect(input2).toHaveAttribute('type', 'password');
	});

	// User interaction tests
	it('updates value when user types', async () => {
		const { container } = render(Input);
		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');

		input.value = 'test value';
		input.dispatchEvent(new Event('input'));

		expect(input).toHaveValue('test value');
	});

	// Accessibility tests
	it('supports accessibility attributes', () => {
		const { container } = render(Input, {
			props: {
				placeholder: 'Enter your name',
				required: true,
				disabled: false
			}
		});

		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');
		expect(input).toHaveAttribute('placeholder', 'Enter your name');
		expect(input).toBeRequired();
		expect(input).not.toBeDisabled();
	});

	// State management tests
	it('maintains disabled state correctly', () => {
		const { container } = render(Input, { props: { disabled: true } });
		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');
		expect(input).toBeDisabled();

		const { container: container2 } = render(Input, { props: { disabled: false } });
		const input2 = container2.querySelector('input');
		if (!input2) throw new Error('Input element not found');
		expect(input2).not.toBeDisabled();
	});

	// Edge cases
	it('handles empty values correctly', async () => {
		const { container } = render(Input);
		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');

		input.value = '';
		input.dispatchEvent(new Event('input'));

		expect(input).toHaveValue('');
	});

	it('handles special characters in input', async () => {
		const { container } = render(Input);
		const input = container.querySelector('input');
		if (!input) throw new Error('Input element not found');

		const specialChars = '!@#$%^&*()_+';
		input.value = specialChars;
		input.dispatchEvent(new Event('input'));

		expect(input).toHaveValue(specialChars);
	});
});
