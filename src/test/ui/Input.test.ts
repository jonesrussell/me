import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { fireEvent } from '@testing-library/dom';
import Input from '$lib/components/ui/Input.svelte';

describe('Input', () => {
	it('renders with default props', () => {
		render(Input);
		const input = screen.getByRole('textbox');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('type', 'text');
		expect(input).not.toBeDisabled();
		expect(input).not.toBeRequired();
	});

	it('renders with custom type', () => {
		render(Input, {
			props: {
				type: 'email'
			}
		});
		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('type', 'email');
	});

	it('renders with placeholder', () => {
		render(Input, {
			props: {
				placeholder: 'Enter text'
			}
		});
		const input = screen.getByPlaceholderText('Enter text');
		expect(input).toBeInTheDocument();
	});

	it('can be disabled', () => {
		render(Input, {
			props: {
				disabled: true
			}
		});
		const input = screen.getByRole('textbox');
		expect(input).toBeDisabled();
	});

	it('can be required', () => {
		render(Input, {
			props: {
				required: true
			}
		});
		const input = screen.getByRole('textbox');
		expect(input).toBeRequired();
	});

	it('updates value on input', async () => {
		render(Input);
		const input = screen.getByRole('textbox');
		await fireEvent.input(input, { target: { value: 'test value' } });
		expect(input).toHaveValue('test value');
	});

	it('has proper CSS classes for styling', () => {
		const { container } = render(Input);
		expect(container.querySelector('.input-container')).toBeInTheDocument();
		expect(container.querySelector('.input')).toBeInTheDocument();
	});

	it('is accessible', () => {
		render(Input, {
			props: {
				placeholder: 'Accessible input',
				required: true
			}
		});

		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('placeholder', 'Accessible input');
		expect(input).toBeRequired();
	});
});
