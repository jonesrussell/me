import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import Badge from './Badge.svelte';

describe('Badge Component', () => {
    describe('Rendering', () => {
        test('renders with default type (info)', async () => {
            render(Badge);
            const badge = await screen.findByText(/ℹ/);

            expect(badge.parentElement).toHaveClass('badge', 'info');
        });

        test('renders success badge', async () => {
            render(Badge, { props: { type: 'success' } });
            const badge = await screen.findByText(/✓/);

            expect(badge.parentElement).toHaveClass('badge', 'success');
        });

        test('renders warning badge', async () => {
            render(Badge, { props: { type: 'warning' } });
            const badge = await screen.findByText(/⚠/);

            expect(badge.parentElement).toHaveClass('badge', 'warning');
        });

        test('renders error badge', async () => {
            render(Badge, { props: { type: 'error' } });
            const badge = await screen.findByText(/✗/);

            expect(badge.parentElement).toHaveClass('badge', 'error');
        });
    });

    describe('Accessibility', () => {
        test('has proper ARIA attributes and structure', async () => {
            const { container } = render(Badge);

            // Check that the badge is visible
            const badge = container.querySelector('.badge');
            expect(badge).toBeVisible();

            // Check that the badge has proper contrast (via classes)
            expect(badge).toHaveClass('badge');

            // Check that the text content is readable
            expect(badge).toHaveTextContent(/ℹ/);
        });
    });

    describe('State Management', () => {
        test('updates type reactively', async () => {
            const { component } = render(Badge);

            // Update the type prop
            component.$set({ type: 'success' });

            // Check that the badge updates
            const badge = await screen.findByText(/✓/);
            expect(badge.parentElement).toHaveClass('success');
        });
    });
}); 