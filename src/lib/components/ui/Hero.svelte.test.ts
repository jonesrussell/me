/// <reference types="@testing-library/jest-dom" />
import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Hero from './Hero.svelte';

describe('Hero', () => {
	it('renders title', () => {
		const { getByRole } = render(Hero, { props: { title: 'Blog' } });
		expect(getByRole('heading', { level: 1 })).toHaveTextContent('Blog');
	});

	it('renders subtitle when provided', () => {
		const { getByText } = render(Hero, { props: { title: 'Blog', subtitle: 'Latest writing' } });
		expect(getByText('Latest writing')).toBeInTheDocument();
	});

	it('does not render subtitle when omitted', () => {
		const { queryByText } = render(Hero, { props: { title: 'Projects' } });
		expect(queryByText('Latest writing')).toBeNull();
	});

	it('sets data-variant attribute when variant prop is provided', () => {
		const { container } = render(Hero, { props: { title: 'Blog', variant: 'blog' } });
		const section = container.querySelector('section');
		expect(section).toHaveAttribute('data-variant', 'blog');
	});

	it('does not set data-variant when variant is omitted', () => {
		const { container } = render(Hero, { props: { title: 'Home' } });
		const section = container.querySelector('section');
		expect(section).not.toHaveAttribute('data-variant');
	});
});
