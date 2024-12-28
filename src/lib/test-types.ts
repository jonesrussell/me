import type { Matcher, MatcherOptions, SelectorMatcherOptions, waitForOptions } from '@testing-library/dom';
import type { RenderResult } from '@testing-library/svelte';
import type { UserEvent } from '@testing-library/user-event';
import type { ComponentProps, SvelteComponent } from 'svelte';

/**
 * Base type for component props
 */
export type BaseProps = Record<string, unknown>;

/**
 * Base type for component events
 */
export type BaseEvents = Record<string, CustomEvent<unknown>>;

/**
 * Type for a Svelte component with base props and events
 */
export type BaseSvelteComponent = SvelteComponent<BaseProps, BaseEvents>;

/**
 * Type for Testing Library's render function
 */
export type RenderableComponent<T extends BaseSvelteComponent> = new (options: { target: HTMLElement; props?: ComponentProps<T> }) => T;

/**
 * Enhanced type for Testing Library's render result
 */
export type TestRenderResult<T extends BaseSvelteComponent> = Omit<RenderResult<T>, 'component'> & {
    component: T;
    getByLabelText: (id: Matcher, options?: SelectorMatcherOptions) => HTMLElement;
    getAllByLabelText: (id: Matcher, options?: SelectorMatcherOptions) => HTMLElement[];
    queryByLabelText: (id: Matcher, options?: SelectorMatcherOptions) => HTMLElement | null;
    queryAllByLabelText: (id: Matcher, options?: SelectorMatcherOptions) => HTMLElement[];
    findAllByTestId: (id: Matcher, options?: MatcherOptions, waitForElementOptions?: waitForOptions) => Promise<HTMLElement[]>;
};

/**
 * Type for component props that allows undefined values
 */
export type PartialProps<T extends BaseSvelteComponent> = Partial<ComponentProps<T>>;

/**
 * Type for test state management
 */
export interface TestState<T extends Record<string, unknown>> {
    state: T;
    snapshot: () => Partial<T>;
    reset: () => void;
    waitForUpdate: () => Promise<void>;
}

/**
 * Type for keyboard test sequences
 */
export interface KeyboardSequence {
    key: string;
    target?: string | RegExp;
    expectation: () => Promise<void>;
}

/**
 * Enhanced test context with proper typing
 */
export interface TestContext<T extends BaseSvelteComponent> {
    user: UserEvent;
    state: TestState<Record<string, unknown>>;
    within: typeof import('@testing-library/svelte').within;
    findByRole: typeof import('@testing-library/svelte').screen.findByRole;
    findByText: typeof import('@testing-library/svelte').screen.findByText;
    testA11y: () => Promise<void>;
    testKeyboard: (sequence: KeyboardSequence[]) => Promise<void>;
    cleanup: () => void;
    container: HTMLElement;
    component: T;
    rerender: (props: PartialProps<T>) => Promise<void>;
    unmount: () => void;
}

/**
 * Type for test interactions
 */
export interface TestInteractions {
    setup?: () => Promise<void>;
    actions: ((user: UserEvent) => Promise<void>)[];
    assertions: (() => void)[];
} 