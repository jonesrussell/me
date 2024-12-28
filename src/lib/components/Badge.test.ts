import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import Badge from './Badge.mock.svelte';

describe('Badge', () => {
    test('renders with default type (info)', () => {
        const { container } = render(Badge);
        const badge = container.querySelector('.badge');
        expect(badge).toHaveClass('badge', 'info');
        expect(badge?.textContent).toContain('ℹ');
    });

    test('renders success badge', () => {
        const { container } = render(Badge, {
            props: { type: 'success' }
        });
        const badge = container.querySelector('.badge');
        expect(badge).toHaveClass('badge', 'success');
        expect(badge?.textContent).toContain('✓');
    });

    test('renders warning badge', () => {
        const { container } = render(Badge, {
            props: { type: 'warning' }
        });
        const badge = container.querySelector('.badge');
        expect(badge).toHaveClass('badge', 'warning');
        expect(badge?.textContent).toContain('⚠');
    });

    test('renders error badge', () => {
        const { container } = render(Badge, {
            props: { type: 'error' }
        });
        const badge = container.querySelector('.badge');
        expect(badge).toHaveClass('badge', 'error');
        expect(badge?.textContent).toContain('✗');
    });
}); 