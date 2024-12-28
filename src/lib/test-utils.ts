import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { tick } from 'svelte';
import { expect, vi } from 'vitest';
import type {
    BaseSvelteComponent,
    KeyboardSequence,
    RenderableComponent,
    TestContext,
    TestInteractions,
    TestRenderResult,
    TestState
} from './test-types';

/**
 * Creates a test context with enhanced user interaction capabilities
 */
export function createTestContext<T extends BaseSvelteComponent>(
    Component: RenderableComponent<T>,
    props?: Record<string, unknown>
): TestContext<T> {
    const user = userEvent.setup();
    const result = render(Component, { props }) as unknown as TestRenderResult<T>;
    const state = createTestState({});

    return {
        user,
        state,
        within,
        findByRole: screen.findByRole,
        findByText: screen.findByText,
        async testA11y() {
            await testAccessibility(result);
        },
        async testKeyboard(sequence) {
            await testKeyboardInteractions(result, sequence, user);
        },
        cleanup() {
            result.unmount();
        },
        container: result.container,
        component: result.component,
        rerender: result.rerender,
        unmount: result.unmount
    };
}

/**
 * Creates a reactive test wrapper with state management
 */
export function createTestState<T extends Record<string, unknown>>(initialState: T): TestState<T> {
    const state = $state(initialState);
    const snapshot = () => $state.snapshot(state) as Partial<T>;
    const reset = () => Object.assign(state, initialState);

    return {
        state,
        snapshot,
        reset,
        async waitForUpdate() {
            await tick();
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    };
}

/**
 * Tests keyboard interactions using userEvent
 */
async function testKeyboardInteractions<T extends BaseSvelteComponent>(
    result: TestRenderResult<T>,
    sequence: KeyboardSequence[],
    user: ReturnType<typeof userEvent.setup>
) {
    const { container } = result;

    for (const { key, target, expectation } of sequence) {
        if (target) {
            const element = typeof target === 'string'
                ? container.querySelector(target)
                : screen.getByText(target);

            if (element) {
                await user.type(element, key);
            }
        } else {
            await user.keyboard(key);
        }
        await expectation();
    }
}

/**
 * Tests accessibility requirements
 */
export async function testAccessibility<T extends BaseSvelteComponent>(
    result: TestRenderResult<T>
) {
    const { container } = result;

    // Check for ARIA attributes
    const elements = container.querySelectorAll('[role], [aria-label], [aria-describedby]');
    expect(elements.length).toBeGreaterThan(0);

    // Check for proper heading structure
    const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const levels = headings.map(h => parseInt(h.tagName.substring(1)));
    for (let i = 1; i < levels.length; i++) {
        expect(levels[i]).toBeLessThanOrEqual(levels[i - 1] + 1);
    }

    // Check for proper focus management
    const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    expect(focusableElements.length).toBeGreaterThan(0);
}

/**
 * Tests component interactions using userEvent
 */
export async function testInteractions<T extends BaseSvelteComponent>(
    Component: RenderableComponent<T>,
    interactions: TestInteractions
): Promise<void> {
    const user = userEvent.setup();
    render(Component);

    if (interactions.setup) {
        await interactions.setup();
    }

    for (const action of interactions.actions) {
        await action(user);
    }

    for (const assertion of interactions.assertions) {
        assertion();
    }
}

/**
 * Tests form interactions
 */
export async function testForm(
    form: HTMLFormElement,
    { inputs, submit }: {
        inputs: Record<string, string | boolean>;
        submit?: boolean;
    }
) {
    const user = userEvent.setup();

    for (const [name, value] of Object.entries(inputs)) {
        const input = within(form).getByRole(
            typeof value === 'boolean' ? 'checkbox' : 'textbox',
            { name: new RegExp(name, 'i') }
        );

        if (typeof value === 'boolean') {
            if (value) {
                await user.click(input);
            }
        } else {
            await user.type(input, value);
        }
    }

    if (submit) {
        const submitButton = within(form).getByRole('button', { name: /submit/i });
        await user.click(submitButton);
    }
}

/**
 * Tests drag and drop interactions
 */
export async function testDragAndDrop(
    draggable: Element,
    dropzone: Element,
    assertion: () => void
) {
    const user = userEvent.setup();

    await user.pointer([
        { target: draggable, keys: '[MouseLeft>]' },
        { target: dropzone },
        { keys: '[/MouseLeft]' }
    ]);

    assertion();
}

/**
 * Creates a mock with enhanced type safety
 */
export function createMock<T extends (...args: unknown[]) => unknown>(
    implementation?: T
) {
    const calls: Parameters<T>[] = [];
    const mock = (...args: Parameters<T>) => {
        calls.push(args);
        return implementation?.(...args);
    };

    return {
        mock,
        calls,
        reset: () => calls.splice(0, calls.length),
        lastCall: () => calls[calls.length - 1]
    };
}

/**
 * Tests error boundary behavior
 */
export async function testErrorBoundary<T extends BaseSvelteComponent>(
    Component: RenderableComponent<T>,
    errorFn: () => void
) {
    render(Component);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    errorFn();

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toBeInTheDocument();

    errorSpy.mockRestore();
}

/**
 * Tests component state transitions
 */
export async function testStateTransitions<
    T extends BaseSvelteComponent,
    S extends Record<string, unknown>
>(
    Component: RenderableComponent<T>,
    transitions: { state: Partial<S>; expectations: (() => void)[] }[]
) {
    const { state, waitForUpdate } = createTestState({} as S);
    render(Component, { props: { state } });

    for (const { state: newState, expectations } of transitions) {
        Object.assign(state, newState);
        await waitForUpdate();
        await Promise.all(expectations.map(expect => expect()));
    }
} 