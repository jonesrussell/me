/**
 * Test Utilities for Svelte 5 Components
 *
 * This module provides testing utilities specifically designed for Svelte 5 components.
 * It includes functions for event simulation, state management, and common testing patterns.
 *
 * Key Features:
 * - DOM event simulation utilities
 * - State management and testing helpers
 * - Mock data generation
 */

import { fireEvent } from '@testing-library/dom';
import type { Video } from '$lib/types/video';

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
 * Mock video data for testing
 * Provides consistent test data for components that work with video content
 */
export const mockVideos: Video[] = [
	{
		embedId: 'video1',
		title: 'First Test Video',
		description: 'Description for first video',
		date: '2024-04-16',
		tags: ['testing', 'svelte'],
		url: 'https://youtube.com/watch?v=video1'
	},
	{
		embedId: 'video2',
		title: 'Second Test Video',
		description: 'Description for second video',
		date: '2024-04-15',
		tags: ['vitest', 'typescript'],
		url: 'https://youtube.com/watch?v=video2'
	}
];
