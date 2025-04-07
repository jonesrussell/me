import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
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
		render(Specialties, { specialties: testSpecialties });
		expect(screen.getByText('My Specialties')).toBeInTheDocument();
		expect(screen.getByText('Areas where I excel and bring value to projects')).toBeInTheDocument();
	});

	it('renders all specialties', () => {
		render(Specialties, { specialties: testSpecialties });

		testSpecialties.forEach(specialty => {
			expect(screen.getByText(specialty.title)).toBeInTheDocument();
			expect(screen.getByText(specialty.description)).toBeInTheDocument();
			expect(screen.getByText(specialty.icon)).toBeInTheDocument();
		});
	});

	it('applies correct styling classes', () => {
		render(Specialties, { specialties: testSpecialties });

		const container = document.querySelector('.specialties-container');
		expect(container).toHaveClass('specialties-container');

		const specialties = document.querySelectorAll('.specialty');
		specialties.forEach(specialty => {
			expect(specialty).toHaveClass('specialty');
		});
	});

	it('handles empty specialties array', () => {
		render(Specialties, { specialties: [] });
		expect(screen.getByText('My Specialties')).toBeInTheDocument();
		const specialties = document.querySelectorAll('.specialty');
		expect(specialties.length).toBe(0);
	});

	it('renders with single specialty', () => {
		const singleSpecialty = [testSpecialties[0]];
		render(Specialties, { specialties: singleSpecialty });

		expect(screen.getByText(singleSpecialty[0].title)).toBeInTheDocument();
		expect(screen.getByText(singleSpecialty[0].description)).toBeInTheDocument();
		expect(screen.getByText(singleSpecialty[0].icon)).toBeInTheDocument();
	});
});
