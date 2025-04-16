import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Specialties from '$lib/components/content/Specialties.svelte';

describe('Specialties Component', () => {
	const testSpecialties = [
		{
			title: 'Test Specialty 1',
			description: 'Test description 1',
			icon: '⚡'
		},
		{
			title: 'Test Specialty 2',
			description: 'Test description 2',
			icon: '🔧'
		}
	];

	it('renders section header correctly', () => {
		render(Specialties, { props: { specialties: testSpecialties } });
		const header = document.querySelector('h2');
		expect(header).toBeInTheDocument();
		expect(header?.textContent).toBe('My Specialties');

		const description = document.querySelector('.section-desc');
		expect(description).toBeInTheDocument();
		expect(description?.textContent).toBe('Areas where I excel and bring value to projects');
	});

	it('renders all specialties', () => {
		render(Specialties, { props: { specialties: testSpecialties } });

		const titles = document.querySelectorAll('.specialty-title');
		const descriptions = document.querySelectorAll('.specialty-desc');
		const icons = document.querySelectorAll('.specialty-icon');

		expect(titles.length).toBe(testSpecialties.length);
		expect(descriptions.length).toBe(testSpecialties.length);
		expect(icons.length).toBe(testSpecialties.length);

		testSpecialties.forEach((specialty, index) => {
			expect(titles[index].textContent).toBe(specialty.title);
			expect(descriptions[index].textContent).toBe(specialty.description);
			expect(icons[index].textContent).toBe(specialty.icon);
		});
	});

	it('applies correct styling classes', () => {
		render(Specialties, { props: { specialties: testSpecialties } });

		const container = document.querySelector('.specialties-container');
		expect(container).toHaveClass('specialties-container');

		const specialties = document.querySelectorAll('.specialty');
		specialties.forEach(specialty => {
			expect(specialty).toHaveClass('specialty');
		});
	});

	it('handles empty specialties array', () => {
		render(Specialties, { props: { specialties: [] } });
		const header = document.querySelector('h2');
		expect(header).toBeInTheDocument();
		expect(header?.textContent).toBe('My Specialties');

		const specialties = document.querySelectorAll('.specialty');
		expect(specialties.length).toBe(0);
	});

	it('renders with single specialty', () => {
		const singleSpecialty = [testSpecialties[0]];
		render(Specialties, { props: { specialties: singleSpecialty } });

		const title = document.querySelector('.specialty-title');
		expect(title).toBeInTheDocument();
		expect(title?.textContent).toBe(singleSpecialty[0].title);

		const desc = document.querySelector('.specialty-desc');
		expect(desc).toBeInTheDocument();
		expect(desc?.textContent).toBe(singleSpecialty[0].description);

		const icon = document.querySelector('.specialty-icon');
		expect(icon).toBeInTheDocument();
		expect(icon?.textContent).toBe(singleSpecialty[0].icon);
	});
});
