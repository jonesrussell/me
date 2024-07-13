// NewsletterSignupForm.test.js
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';

import NewsletterSignupForm from './NewsletterSignupForm.svelte';

test('initial form state', () => {
	render(NewsletterSignupForm);

	const emailInput = screen.getByLabelText('Email:');
	const nameInput = screen.getByLabelText('Name:');
	const button = screen.getByRole('button', { name: 'Sign Up' });

	expect(emailInput).toBeInTheDocument();
	expect(nameInput).toBeInTheDocument();
	expect(button).toBeInTheDocument();
});

test('form submission', async () => {
	const user = userEvent.setup();
	render(NewsletterSignupForm);

	const emailInput = screen.getByLabelText('Email:');
	const nameInput = screen.getByLabelText('Name:');
	const button = screen.getByRole('button', { name: 'Sign Up' });

	await user.type(emailInput, 'test@example.com');
	await user.type(nameInput, 'Test User');
	await user.click(button);

	// Here you would typically expect some side effect to have happened,
	// like a function being called with the form data. Since your form
	// currently only logs the form data, there isn't much to assert here.
});
