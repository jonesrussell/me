import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Table from './Table.svelte';

describe('Table', () => {
	const sampleHeaders = ['Name', 'Age', 'City'];
	const sampleRows = [
		['John', '30', 'New York'],
		['Alice', '25', 'London']
	];

	it('renders with default props', () => {
		const { container } = render(Table);
		const table = container.querySelector('.table');
		expect(table).toBeInTheDocument();
		expect(table).toHaveStyle({ '--table-width': '60ch' });
	});

	it('renders headers and rows', () => {
		const { container } = render(Table, {
			props: {
				headers: sampleHeaders,
				rows: sampleRows
			}
		});

		const headerRow = container.querySelector('.header-row');
		expect(headerRow?.textContent).toContain('Name');
		expect(headerRow?.textContent).toContain('Age');
		expect(headerRow?.textContent).toContain('City');

		const tableRows = container.querySelectorAll('.table-row');
		expect(tableRows).toHaveLength(2);
		expect(tableRows[0].textContent).toContain('John');
		expect(tableRows[0].textContent).toContain('30');
		expect(tableRows[0].textContent).toContain('New York');
	});

	it('renders with custom width', () => {
		const { container } = render(Table, {
			props: {
				width: 80,
				headers: sampleHeaders,
				rows: sampleRows
			}
		});
		const table = container.querySelector('.table');
		expect(table).toHaveStyle({ '--table-width': '80ch' });
	});

	it('renders table borders', () => {
		const { container } = render(Table, {
			props: {
				headers: sampleHeaders,
				rows: sampleRows
			}
		});
		const borders = container.querySelectorAll('.table-border');
		expect(borders).toHaveLength(3); // Top, middle, and bottom borders

		// Check border characters
		expect(borders[0].textContent).toContain('┌'); // Top left
		expect(borders[0].textContent).toContain('┐'); // Top right
		expect(borders[1].textContent).toContain('├'); // Middle left
		expect(borders[1].textContent).toContain('┤'); // Middle right
		expect(borders[2].textContent).toContain('└'); // Bottom left
		expect(borders[2].textContent).toContain('┘'); // Bottom right
	});

	it('aligns columns correctly', () => {
		const headers = ['A', 'BB', 'CCC'];
		const rows = [['1', '22', '333']];

		const { container } = render(Table, {
			props: { headers, rows }
		});

		const headerRow = container.querySelector('.header-row');
		const tableRow = container.querySelector('.table-row');

		// Check that shorter values are padded
		expect(headerRow?.textContent).toContain('A  '); // Padded to match '333'
		expect(headerRow?.textContent).toContain('BB '); // Padded to match '333'
		expect(tableRow?.textContent).toContain('1  '); // Padded to match '333'
		expect(tableRow?.textContent).toContain('22 '); // Padded to match '333'
	});
});
