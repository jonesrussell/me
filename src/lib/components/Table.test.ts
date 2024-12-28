import { createTestContext } from '$lib/test-utils';
import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import Table from './Table.svelte';

describe('Table Component', () => {
	describe('Rendering', () => {
		test('renders empty table with headers', async () => {
			const ctx = createTestContext(Table, {
				headers: ['Name', 'Age', 'City'],
				rows: []
			});

			const table = ctx.container.querySelector('.table');
			expect(table).toBeInTheDocument();

			// Check headers
			const headerRow = ctx.container.querySelector('.header-row');
			expect(headerRow).toHaveTextContent('Name');
			expect(headerRow).toHaveTextContent('Age');
			expect(headerRow).toHaveTextContent('City');

			ctx.cleanup();
		});

		test('renders table with data', async () => {
			const ctx = createTestContext(Table, {
				headers: ['Name', 'Age', 'City'],
				rows: [
					['John', '30', 'New York'],
					['Jane', '25', 'London']
				]
			});

			// Check data rows
			const rows = ctx.container.querySelectorAll('.table-row');
			expect(rows).toHaveLength(2);
			expect(rows[0]).toHaveTextContent('John');
			expect(rows[0]).toHaveTextContent('30');
			expect(rows[0]).toHaveTextContent('New York');

			ctx.cleanup();
		});

		test('aligns to grid width', async () => {
			const width = 80;
			const ctx = createTestContext(Table, {
				headers: ['Name'],
				rows: [['Test']],
				width
			});

			const table = ctx.container.querySelector('.table');
			const style = window.getComputedStyle(table!);
			expect(style.getPropertyValue('--table-width')).toBe(`${width}ch`);

			ctx.cleanup();
		});
	});

	describe('Accessibility', () => {
		test('meets accessibility requirements', async () => {
			const ctx = createTestContext(Table, {
				headers: ['Name', 'Age'],
				rows: [['John', '30']]
			});

			await ctx.testA11y();
			ctx.cleanup();
		});

		test('has proper table semantics', async () => {
			const ctx = createTestContext(Table, {
				headers: ['Name', 'Age'],
				rows: [['John', '30']]
			});

			const table = ctx.container.querySelector('.table');
			expect(table).toHaveAttribute('role', 'table');

			const headerRow = ctx.container.querySelector('.header-row');
			expect(headerRow).toHaveAttribute('role', 'row');

			const dataRows = ctx.container.querySelectorAll('.table-row');
			dataRows.forEach((row) => {
				expect(row).toHaveAttribute('role', 'row');
			});

			ctx.cleanup();
		});
	});

	describe('State Management', () => {
		test('updates when data changes', async () => {
			const ctx = createTestContext(Table, {
				headers: ['Name'],
				rows: [['Initial']]
			});

			const { state, waitForUpdate } = ctx.state;

			// Update rows
			state.rows = [['Updated']];
			await waitForUpdate();

			const row = ctx.container.querySelector('.table-row');
			expect(row).toHaveTextContent('Updated');

			ctx.cleanup();
		});

		test('recalculates column widths when data changes', async () => {
			const ctx = createTestContext(Table, {
				headers: ['Short'],
				rows: [['A']]
			});

			const { state, waitForUpdate } = ctx.state;

			// Update with longer content
			state.rows = [['Much Longer Content']];
			await waitForUpdate();

			const row = ctx.container.querySelector('.table-row');
			expect(row?.textContent).toContain('Much Longer Content');

			// Check if borders adjusted to new width
			const borders = ctx.container.querySelectorAll('.table-border');
			borders.forEach((border) => {
				expect(border.textContent?.length).toBeGreaterThan(5);
			});

			ctx.cleanup();
		});
	});

	describe('Error Handling', () => {
		test('handles missing row data gracefully', async () => {
			type PartialRow = (string | undefined)[];
			const ctx = createTestContext(Table, {
				headers: ['Name', 'Age'],
				rows: [['John', undefined] as PartialRow]
			});

			const row = ctx.container.querySelector('.table-row');
			expect(row).toHaveTextContent('John');
			expect(row).toHaveTextContent(''); // Empty cell for missing data

			ctx.cleanup();
		});

		test('handles empty headers and rows', async () => {
			const ctx = createTestContext(Table);

			const table = ctx.container.querySelector('.table');
			expect(table).toBeInTheDocument();
			expect(table).not.toBeNull();

			ctx.cleanup();
		});
	});
});
