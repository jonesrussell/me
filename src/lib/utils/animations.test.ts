import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { MockInstance } from 'vitest';
import { hoverScale } from './animations';
import { JSDOM } from 'jsdom';

describe('hoverScale', () => {
	let node: HTMLElement;
	let addEventListenerSpy: MockInstance;
	let removeEventListenerSpy: MockInstance;
	let dom: JSDOM;

	beforeEach(() => {
		// Create a JSDOM environment
		dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
		global.document = dom.window.document;
		global.HTMLElement = dom.window.HTMLElement;
		global.MouseEvent = dom.window.MouseEvent;

		// Create a mock element
		node = document.createElement('div');
		addEventListenerSpy = vi.spyOn(node, 'addEventListener');
		removeEventListenerSpy = vi.spyOn(node, 'removeEventListener');
	});

	afterEach(() => {
		// Clean up
		vi.clearAllMocks();
	});

	it('should add mouseenter and mouseleave event listeners', () => {
		hoverScale(node);

		expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
		expect(addEventListenerSpy).toHaveBeenCalledWith('mouseenter', expect.any(Function));
		expect(addEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
	});

	it('should apply transform on mouseenter', () => {
		const { destroy } = hoverScale(node);
		const mouseEnterEvent = new MouseEvent('mouseenter');

		node.dispatchEvent(mouseEnterEvent);

		expect(node.style.transform).toBe('translateY(-0.125ch)');
		expect(node.style.transition).toBe('transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)');

		destroy();
	});

	it('should remove transform on mouseleave', () => {
		const { destroy } = hoverScale(node);
		const mouseEnterEvent = new MouseEvent('mouseenter');
		const mouseLeaveEvent = new MouseEvent('mouseleave');

		node.dispatchEvent(mouseEnterEvent);
		node.dispatchEvent(mouseLeaveEvent);

		expect(node.style.transform).toBe('');

		destroy();
	});

	it('should clean up event listeners on destroy', () => {
		const { destroy } = hoverScale(node);

		destroy();

		expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
		expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseenter', expect.any(Function));
		expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
	});
});
