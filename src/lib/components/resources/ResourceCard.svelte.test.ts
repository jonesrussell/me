/// <reference types="@testing-library/jest-dom" />
import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import ResourceCard from './ResourceCard.svelte';
import type { Resource } from '$lib/types/resource';

const baseResource: Resource = {
	title: 'Go',
	url: 'https://go.dev',
	category: 'Languages & Frameworks',
	tags: ['backend', 'cli'],
	description: 'My primary backend language.',
	dailyDriver: true
};

describe('ResourceCard', () => {
	it('renders title as external link', () => {
		const { getByRole } = render(ResourceCard, { props: { resource: baseResource } });
		const link = getByRole('link', { name: 'Go' });
		expect(link).toHaveAttribute('href', 'https://go.dev');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('shows daily driver badge when dailyDriver is true', () => {
		const { getByText } = render(ResourceCard, { props: { resource: baseResource } });
		expect(getByText('daily driver')).toBeInTheDocument();
	});

	it('does not show daily driver badge when dailyDriver is false', () => {
		const resource = { ...baseResource, dailyDriver: false };
		const { queryByText } = render(ResourceCard, { props: { resource } });
		expect(queryByText('daily driver')).toBeNull();
	});

	it('renders description', () => {
		const { getByText } = render(ResourceCard, { props: { resource: baseResource } });
		expect(getByText('My primary backend language.')).toBeInTheDocument();
	});

	it('renders tags as buttons', () => {
		const { getByRole } = render(ResourceCard, { props: { resource: baseResource } });
		expect(getByRole('button', { name: 'backend' })).toBeInTheDocument();
		expect(getByRole('button', { name: 'cli' })).toBeInTheDocument();
	});
});
