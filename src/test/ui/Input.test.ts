import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { fireEvent } from '@testing-library/dom';
import Input from '$lib/components/ui/Input.svelte';

describe('Input', () => {
	it('renders with default props', () => {
		const { container } = render(Input);
		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('type', 'text');
		expect(input).not.toBeDisabled();
		expect(input).not.toBeRequired();
	});

	it('renders with custom type', () => {
		const { container } = render(Input, {
			type: 'email'
		});
		const input = container.querySelector('input');
		expect(input).toHaveAttribute('type', 'email');
	});

	it('renders with placeholder', () => {
		const { container } = render(Input, {
			placeholder: 'Enter text'
		});
		const input = container.querySelector('input');
		expect(input).toHaveAttribute('placeholder', 'Enter text');
	});

	it('can be disabled', () => {
		const { container } = render(Input, {
			disabled: true
		});
		const input = container.querySelector('input');
		expect(input).toBeDisabled();
	});

	it('can be required', () => {
		const { container } = render(Input, {
			required: true
		});
		const input = container.querySelector('input');
		expect(input).toBeRequired();
	});

	it('updates value on input', async () => {
		const { container } = render(Input);
		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();

		if (input) {
			await fireEvent.input(input, { target: { value: 'test value' } });
			expect(input).toHaveValue('test value');
		}
	});

	it('has proper CSS classes for styling', () => {
		const { container } = render(Input);
		expect(container.querySelector('.input-container')).toBeInTheDocument();
		expect(container.querySelector('.input')).toBeInTheDocument();
	});

	it('is accessible', () => {
		const { container } = render(Input, {
			placeholder: 'Accessible input',
			required: true
		});

		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('placeholder');
		expect(input).toBeRequired();
	});
});
