/**
 * Test Utilities for Svelte 5 Components
 *
 * This module provides a comprehensive set of testing utilities specifically designed for Svelte 5 components.
 * It includes functions for component rendering, state management, event simulation, and common testing patterns.
 *
 * Key Features:
 * - Type-safe component rendering with Svelte 5 support
 * - DOM event simulation utilities
 * - State management and testing helpers
 * - Mock data generation
 * - Component lifecycle management
 */

import { render } from '@testing-library/svelte';
import type { RenderResult } from '@testing-library/svelte';
import { fireEvent } from '@testing-library/dom';
import type { Mock } from 'vitest';
import type { SvelteComponent } from 'svelte';
import { expect, afterEach } from 'vitest';
import type { Video } from '$lib/types';
import { JSDOM } from 'jsdom';

/**
 * Interface representing a Svelte component instance with dynamic properties
 * Used for type-safe access to component instance properties during testing
 */
interface ComponentInstance {
	[key: string]: unknown;
}

/**
 * Sets up the DOM environment for testing
 * This is necessary for components that rely on browser APIs
 */
const setupDOM = () => {
	const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
	global.document = dom.window.document;
	global.window = dom.window as unknown as Window & typeof globalThis;
};

/**
 * Cleans up the DOM environment after tests
 */
const cleanupDOM = () => {
	// @ts-expect-error - We know these are optional in the test environment
	global.document = undefined;
	// @ts-expect-error - We know these are optional in the test environment
	global.window = undefined;
};

/**
 * Type definition for Svelte 5 components
 * Represents the structure of a Svelte 5 component with its props, events, and slots
 */
type Svelte5Component<T extends SvelteComponent> = {
	$$prop_def: Record<string, unknown>;
	$$events_def: Record<string, CustomEvent<unknown>>;
	$$slot_def: string;
} & (new (options: { target: HTMLElement; props: Record<string, unknown> }) => T);

/**
 * Renders a Svelte component with the provided props
 * This is a wrapper around @testing-library/svelte's render function with Svelte 5 support
 *
 * @param Component - The Svelte component to render
 * @param props - Optional props to pass to the component
 * @returns A RenderResult containing the rendered component and testing utilities
 */
export function renderComponent<T extends SvelteComponent>(
	Component: Svelte5Component<T>,
	props: Record<string, unknown> = {}
): RenderResult<T> {
	setupDOM();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result = render(Component as any, { props }) as RenderResult<T>;
	afterEach(() => {
		cleanupDOM();
	});
	return result;
}

/**
 * Creates a function that returns static content
 * Useful for testing components that accept slot content
 *
 * @param content - The static content to return
 * @returns A function that returns the provided content
 */
export function createChildrenFunction(content: string) {
	return () => content;
}

/**
 * Simulates user input on an element
 * This function handles the complete input lifecycle including focus, input, and blur events
 *
 * @param element - The HTML element to simulate input on
 * @param value - The value to input
 */
export async function simulateInput(element: HTMLElement, value: string): Promise<void> {
	element.focus();
	await fireEvent.input(element, { target: { value } });
	await fireEvent.blur(element);
}

/**
 * Simulates a key press event on an element
 * Handles both keyDown and keyUp events with optional keyboard event options
 *
 * @param element - The HTML element to simulate the key press on
 * @param key - The key to simulate pressing
 * @param options - Optional keyboard event options
 */
export async function simulateKeyPress(
	element: HTMLElement,
	key: string,
	options: KeyboardEventInit = {}
): Promise<void> {
	await fireEvent.keyDown(element, { key, ...options });
	await fireEvent.keyUp(element, { key, ...options });
}

/**
 * Waits for a state update to complete
 * This is necessary when testing components that use Svelte's reactivity system
 *
 * @returns A promise that resolves after the state update
 */
export function waitForStateUpdate(): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Creates a mock store with subscription capabilities
 * Useful for testing components that depend on Svelte stores
 *
 * @param initialValue - The initial value for the store
 * @returns An object with subscribe, set, and get methods
 */
export function createMockStore<T>(initialValue: T) {
	let value = initialValue;
	const subscribers = new Set<(value: T) => void>();

	return {
		subscribe: (callback: (value: T) => void) => {
			subscribers.add(callback);
			callback(value);
			return () => subscribers.delete(callback);
		},
		set: (newValue: T) => {
			value = newValue;
			subscribers.forEach(callback => callback(value));
		},
		get: () => value
	};
}

/**
 * Tests state changes in a component
 * Renders a component, performs an action, and verifies the expected state
 *
 * @param Component - The component to test
 * @param props - Props to pass to the component
 * @param action - The action to perform that should trigger state changes
 * @param expectedState - The expected state after the action
 */
export async function testStateChange<T extends SvelteComponent>(
	Component: Svelte5Component<T>,
	props: Record<string, unknown>,
	action: (result: ReturnType<typeof renderComponent<T>>) => Promise<void>,
	expectedState: Record<string, unknown>
): Promise<void> {
	const result = renderComponent<T>(Component, props);
	await action(result);
	await waitForStateUpdate();

	Object.entries(expectedState).forEach(([key, value]) => {
		const componentInstance = result.component as ComponentInstance;
		expect(componentInstance[key]).toEqual(value);
	});
}

/**
 * Tests component events
 * Verifies that event handlers are called with the correct data
 *
 * @param Component - The component to test
 * @param props - Props to pass to the component
 * @param eventName - The name of the event to test
 * @param eventData - The data to pass with the event
 * @param expectedHandlerCall - The mock function that should be called
 */
export async function testComponentEvent<T extends SvelteComponent>(
	Component: Svelte5Component<T>,
	props: Record<string, unknown>,
	eventName: string,
	eventData: unknown = {},
	expectedHandlerCall: Mock
): Promise<void> {
	const result = renderComponent<T>(Component, {
		...props,
		[eventName]: expectedHandlerCall
	});

	await fireEvent(
		result.container.firstChild as HTMLElement,
		new CustomEvent(eventName, {
			detail: eventData
		})
	);

	expect(expectedHandlerCall).toHaveBeenCalledWith(eventData);
}

/**
 * Mock video data for testing
 * Provides consistent test data for components that work with video content
 */
export const mockVideos: Video[] = [
	{
		embedId: 'video1',
		title: 'First Test Video',
		description: 'Description for first video',
		date: '2024-04-16',
		topics: ['testing', 'svelte'],
		url: 'https://youtube.com/watch?v=video1'
	},
	{
		embedId: 'video2',
		title: 'Second Test Video',
		description: 'Description for second video',
		date: '2024-04-15',
		topics: ['vitest', 'typescript'],
		url: 'https://youtube.com/watch?v=video2'
	}
];

/**
 * Cleans up the document head after tests
 * Removes any styles or other elements added during testing
 */
export const cleanupDocument = () => {
	document.head.innerHTML = '';
};
