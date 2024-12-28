import { createTestContext, testInteractions } from '$lib/test-utils';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import Badge from './Badge.mock.svelte';

describe('Badge Component', () => {
    describe('Rendering', () => {
        test('renders with default type (info)', async () => {
            const ctx = createTestContext(Badge);
            const badge = await ctx.findByRole('status', { name: /info/i });

            expect(badge).toHaveClass('badge', 'info');
            expect(badge).toHaveTextContent('ℹ');

            ctx.cleanup();
        });

        test('renders success badge', async () => {
            const ctx = createTestContext(Badge, { type: 'success' });
            const badge = await ctx.findByRole('status', { name: /success/i });

            expect(badge).toHaveClass('badge', 'success');
            expect(badge).toHaveTextContent('✓');

            ctx.cleanup();
        });

        test('renders warning badge', async () => {
            const ctx = createTestContext(Badge, { type: 'warning' });
            const badge = await ctx.findByRole('status', { name: /warning/i });

            expect(badge).toHaveClass('badge', 'warning');
            expect(badge).toHaveTextContent('⚠');

            ctx.cleanup();
        });

        test('renders error badge', async () => {
            const ctx = createTestContext(Badge, { type: 'error' });
            const badge = await ctx.findByRole('status', { name: /error/i });

            expect(badge).toHaveClass('badge', 'error');
            expect(badge).toHaveTextContent('✗');

            ctx.cleanup();
        });
    });

    describe('Accessibility', () => {
        test('meets accessibility requirements', async () => {
            const ctx = createTestContext(Badge);
            await ctx.testA11y();
            ctx.cleanup();
        });

        test('handles keyboard navigation', async () => {
            const ctx = createTestContext(Badge);

            await ctx.testKeyboard([
                {
                    key: 'Tab',
                    expectation: async () => {
                        const badge = await ctx.findByRole('status');
                        expect(badge).toHaveFocus();
                    }
                }
            ]);

            ctx.cleanup();
        });
    });

    describe('Interactions', () => {
        test('handles click events', async () => {
            const handleClick = vi.fn();
            const ctx = createTestContext(Badge);
            const badge = await ctx.findByRole('status');

            // Attach click handler manually since it's not in props
            badge.addEventListener('click', handleClick);
            await ctx.user.click(badge);
            expect(handleClick).toHaveBeenCalled();

            ctx.cleanup();
        });

        test('handles hover states', async () => {
            await testInteractions(Badge, {
                actions: [
                    async (user) => {
                        const badge = await screen.findByRole('status');
                        await user.hover(badge);
                    }
                ],
                assertions: [
                    () => {
                        const badge = screen.getByRole('status', { name: /./i });
                        expect(badge).toHaveClass('hover');
                    }
                ]
            });
        });
    });

    describe('State Management', () => {
        test('updates type reactively', async () => {
            const ctx = createTestContext(Badge);
            const { state, waitForUpdate } = ctx.state;

            state.type = 'success';
            await waitForUpdate();

            const badge = await ctx.findByRole('status');
            expect(badge).toHaveClass('success');

            ctx.cleanup();
        });
    });

    describe('Error Handling', () => {
        test('handles invalid type gracefully', async () => {
            const ctx = createTestContext(Badge, {
                type: 'invalid'
            });

            const badge = await ctx.findByRole('status');
            expect(badge).toHaveClass('info'); // Falls back to default

            ctx.cleanup();
        });
    });
}); 