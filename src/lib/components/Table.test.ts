import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import Table from './Table.svelte';

describe('Table Component', () => {
	describe('Rendering', () => {
		test('renders empty table with headers', async () => {
			const { container } = render(Table, {
				props: {
					headers: ['Name', 'Age', 'City'],
					rows: []
				}
			});

			const table = container.querySelector('.table');
			expect(table).toBeInTheDocument();

			// Check headers
			const headerRow = container.querySelector('.header-row');
			expect(headerRow).toHaveTextContent('Name');
			expect(headerRow).toHaveTextContent('Age');
			expect(headerRow).toHaveTextContent('City');
		});

		test('renders table with data', async () => {
			const { container } = render(Table, {
				props: {
					headers: ['Name', 'Age', 'City'],
					rows: [
						['John', '30', 'New York'],
						['Jane', '25', 'London']
					]
				}
			});

			// Check data rows
			const rows = container.querySelectorAll('.table-row');
			expect(rows).toHaveLength(2);
			expect(rows[0]).toHaveTextContent('John');
			expect(rows[0]).toHaveTextContent('30');
			expect(rows[0]).toHaveTextContent('New York');
		});

		test('aligns to grid width', async () => {
			const width = 80;
			const { container } = render(Table, {
				props: {
					headers: ['Name'],
					rows: [['Test']],
					width
				}
			});

			const table = container.querySelector('.table');
			const style = window.getComputedStyle(table!);
			expect(style.getPropertyValue('--table-width')).toBe(`${width}ch`);
		});
	});

	describe('Accessibility', () => {
		test('meets accessibility requirements', async () => {
			const { container } = render(Table, {
				props: {
					headers: ['Name', 'Age'],
					rows: [['John', '30']]
				}
			});

			const table = container.querySelector('.table');
			expect(table).toHaveAttribute('role', 'table');
			expect(table).toBeVisible();
		});

		test('has proper table semantics', async () => {
			const { container } = render(Table, {
				props: {
					headers: ['Name', 'Age'],
					rows: [['John', '30']]
				}
			});

			const table = container.querySelector('.table');
			expect(table).toHaveAttribute('role', 'table');

			const headerRow = container.querySelector('.header-row');
			expect(headerRow).toHaveAttribute('role', 'row');

			const dataRows = container.querySelectorAll('.table-row');
			dataRows.forEach((row) => {
				expect(row).toHaveAttribute('role', 'row');
			});
		});
	});

	describe('State Management', () => {
		test('updates when data changes', async () => {
			const { container, rerender } = render(Table, {
				props: {
					headers: ['Name'],
					rows: [['Initial']]
				}
			});

			// Initial state
			let row = container.querySelector('.table-row');
			expect(row).toHaveTextContent('Initial');

			// Update rows
			await rerender({
				headers: ['Name'],
				rows: [['Updated']]
			});
			row = container.querySelector('.table-row');
			expect(row).toHaveTextContent('Updated');
		});

		test('recalculates column widths when data changes', async () => {
			const { container, rerender } = render(Table, {
				props: {
					headers: ['Short'],
					rows: [['A']]
				}
			});

			// Initial state
			let row = container.querySelector('.table-row');
			expect(row).toHaveTextContent('A');

			// Update with longer content
			await rerender({
				headers: ['Short'],
				rows: [['Much Longer Content']]
			});
			row = container.querySelector('.table-row');
			expect(row?.textContent).toContain('Much Longer Content');

			// Check if borders adjusted to new width
			const borders = container.querySelectorAll('.table-border');
			borders.forEach((border) => {
				expect(border.textContent?.length).toBeGreaterThan(5);
			});
		});
	});

	describe('Error Handling', () => {
		test('handles missing row data gracefully', async () => {
			type PartialRow = (string | undefined)[];
			const { container } = render(Table, {
				props: {
					headers: ['Name', 'Age'],
					rows: [['John', undefined] as PartialRow]
				}
			});

			const row = container.querySelector('.table-row');
			expect(row).toHaveTextContent('John');
			expect(row).toHaveTextContent(''); // Empty cell for missing data
		});

		test('handles empty headers and rows', async () => {
			const { container } = render(Table);

			const table = container.querySelector('.table');
			expect(table).toBeInTheDocument();
			expect(table).not.toBeNull();
		});
	});
});
