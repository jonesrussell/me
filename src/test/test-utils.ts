import { render } from '@testing-library/svelte';
import type { RenderResult } from '@testing-library/svelte';
import { fireEvent } from '@testing-library/dom';
import type { Mock } from 'vitest';
import type { SvelteComponent } from 'svelte';
import type { Matcher, MatcherOptions } from '@testing-library/dom';

interface ComponentInstance {
	[key: string]: unknown;
}

type TestComponent = SvelteComponent<Record<string, unknown>>;

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
