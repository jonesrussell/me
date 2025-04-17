import { render } from '@testing-library/svelte';
import { fireEvent } from '@testing-library/dom';
import type { Mock } from 'vitest';

export function renderComponent(component: any, props: Record<string, unknown> = {}) {
	const result = render(component, { props });
	return {
		...result,
		getByTestId: (id: string) => result.getByTestId(id),
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
	component: any,
	props: Record<string, unknown>,
	action: (result: ReturnType<typeof renderComponent>) => Promise<void>,
	expectedState: Record<string, unknown>
): Promise<void> {
	const result = renderComponent(component, props);
	await action(result);
	await waitForStateUpdate();

	Object.entries(expectedState).forEach(([key, value]) => {
		const componentInstance = result.component as any;
		expect(componentInstance[key]).toEqual(value);
	});
}

export async function testComponentEvent(
	component: any,
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
