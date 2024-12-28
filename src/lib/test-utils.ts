import { render, screen, within, type RenderResult } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import type { ComponentProps, SvelteComponent } from 'svelte';
import { tick } from 'svelte';
import { expect, vi } from 'vitest';

// Import the correct type from Testing Library
type SvelteComponentConstructor<T extends SvelteComponent> = (new (args: { target: HTMLElement; props?: Record<string, unknown> }) => T) & {
    render(props?: Record<string, unknown>): T;
};

type UserEvent = ReturnType<typeof userEvent.setup>;

/**
 * Enhanced test context with user event simulation
 */
interface TestContext<T extends SvelteComponent> {
    user: UserEvent;
    state: ReturnType<typeof createTestState<Record<string, unknown>>>;
    within: typeof within;
    findByRole: typeof screen.findByRole;
    findByText: typeof screen.findByText;
    testA11y: () => Promise<void>;
    testKeyboard: (sequence: KeyboardSequence[]) => Promise<void>;
    cleanup: () => void;
    container: HTMLElement;
    component: T;
    rerender: (props: Partial<ComponentProps<T>>) => Promise<void>;
    unmount: () => void;
}

interface KeyboardSequence {
    key: string;
    target?: string | RegExp;
    expectation: () => Promise<void>;
}

/**
 * Creates a test context with enhanced user interaction capabilities
 */
export function createTestContext<T extends SvelteComponent>(
    Component: SvelteComponentConstructor<T>,
    props?: ComponentProps<T>
): TestContext<T> {
    const user = userEvent.setup();
    // @ts-expect-error - Testing Library's type definitions are not fully compatible
    const result = render(Component, { props });
    const state = createTestState({});

    return {
        user,
        state,
        within,
        findByRole: screen.findByRole,
        findByText: screen.findByText,
        async testA11y() {
            await testAccessibility(result as unknown as RenderResult<SvelteComponent>);
        },
        async testKeyboard(sequence) {
            await testKeyboardInteractions(result as unknown as RenderResult<SvelteComponent>, sequence, user);
        },
        cleanup() {
            result.unmount();
        },
        container: result.container,
        component: result.component as T,
        rerender: result.rerender,
        unmount: result.unmount
    };
}

/**
 * Tests keyboard interactions using userEvent
 */
async function testKeyboardInteractions(
    result: RenderResult<SvelteComponent>,
    sequence: KeyboardSequence[],
    user: UserEvent
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
 * Creates a reactive test wrapper with state management
 */
export function createTestState<T extends Record<string, unknown>>(initialState: T) {
    const state = $state(initialState);
    const snapshot = () => $state.snapshot(state);
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
 * Tests accessibility requirements
 */
export async function testAccessibility(result: RenderResult<SvelteComponent>) {
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
export async function testInteractions<T extends SvelteComponent>(
    Component: SvelteComponentConstructor<T>,
    interactions: {
        setup?: () => Promise<void>;
        actions: ((user: UserEvent) => Promise<void>)[];
        assertions: (() => void)[];
    }
) {
    const user = userEvent.setup();
    // @ts-expect-error - Testing Library's type definitions are not fully compatible
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
export async function testErrorBoundary<T extends SvelteComponent>(
    Component: SvelteComponentConstructor<T>,
    errorFn: () => void
) {
    // @ts-expect-error - Testing Library's type definitions are not fully compatible
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
    T extends SvelteComponent,
    S extends Record<string, unknown>
>(
    Component: SvelteComponentConstructor<T>,
    transitions: { state: Partial<S>; expectations: (() => void)[] }[]
) {
    const { state, waitForUpdate } = createTestState({} as S);
    // @ts-expect-error - Testing Library's type definitions are not fully compatible
    render(Component, { props: { state } });

    for (const { state: newState, expectations } of transitions) {
        Object.assign(state, newState);
        await waitForUpdate();
        await Promise.all(expectations.map(expect => expect()));
    }
} 