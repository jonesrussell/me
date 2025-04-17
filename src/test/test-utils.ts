import { render } from '@testing-library/svelte';
import type { RenderResult } from '@testing-library/svelte';
import { fireEvent } from '@testing-library/dom';
import type { Mock } from 'vitest';
import type { SvelteComponent } from 'svelte';
import type { Matcher, MatcherOptions } from '@testing-library/dom';
import { afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/svelte';
import type { Video } from '$lib/types';

interface ComponentInstance {
	[key: string]: unknown;
}

type TestComponent = SvelteComponent<Record<string, unknown>>;

// Create a document head for style injection
const setupDocument = () => {
	const head = document.createElement('head');
	document.body.appendChild(head);
	return head;
};

// Clean up after each test
afterEach(() => {
	cleanup();
	document.head.innerHTML = '';
});

// Set up before each test
beforeEach(() => {
	setupDocument();
});

export function renderComponent(
	component: typeof SvelteComponent,
	props: Record<string, unknown> = {}
): Omit<RenderResult<TestComponent>, 'getByTestId'> & {
	getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement;
	fireEvent: typeof fireEvent;
} {
	const result = render(component, { props });
	return {
		...result,
		getByTestId: (id: Matcher, options?: MatcherOptions) => result.getByTestId(id, options),
		fireEvent
	};
}

export function createChildrenFunction(content: string) {
	return () => content;
}

export async function simulateInput(element: HTMLElement, value: string): Promise<void> {
	element.focus();
	await fireEvent.input(element, { target: { value } });
	await fireEvent.blur(element);
}

export async function simulateKeyPress(
	element: HTMLElement,
	key: string,
	options: KeyboardEventInit = {}
): Promise<void> {
	await fireEvent.keyDown(element, { key, ...options });
	await fireEvent.keyUp(element, { key, ...options });
}

export function waitForStateUpdate(): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, 0));
}

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

export async function testStateChange(
	component: typeof SvelteComponent,
	props: Record<string, unknown>,
	action: (result: ReturnType<typeof renderComponent>) => Promise<void>,
	expectedState: Record<string, unknown>
): Promise<void> {
	const result = renderComponent(component, props);
	await action(result);
	await waitForStateUpdate();

	Object.entries(expectedState).forEach(([key, value]) => {
		const componentInstance = result.component as ComponentInstance;
		expect(componentInstance[key]).toEqual(value);
	});
}

export async function testComponentEvent(
	component: typeof SvelteComponent,
	props: Record<string, unknown>,
	eventName: string,
	eventData: unknown = {},
	expectedHandlerCall: Mock
): Promise<void> {
	const result = renderComponent(component, {
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

export const cleanupDocument = () => {
	document.head.innerHTML = '';
};
