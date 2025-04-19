import { elasticOut, expoOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

interface SlideInParams {
	delay?: number;
	duration?: number;
	index?: number;
}

export function slideIn(
	node: HTMLElement,
	{ delay = 0, duration = 700, index = 0 }: SlideInParams = {}
): TransitionConfig {
	// Set initial state
	node.style.opacity = '0';
	node.style.transform = `translateX(${index % 2 === 0 ? '-100%' : '100%'})`;

	return {
		duration,
		delay,
		css: t => {
			const eased = elasticOut(t);
			return `
				opacity: ${t};
				transform: translateX(${(1 - eased) * (index % 2 === 0 ? -100 : 100)}%);
			`;
		}
	};
}

export function fadeIn(
	node: HTMLElement,
	{ delay = 0, duration = 500 }: SlideInParams = {}
): TransitionConfig {
	return {
		duration,
		delay,
		css: t => {
			const eased = expoOut(t);
			return `
				opacity: ${eased};
			`;
		}
	};
}

export function hoverScale(node: HTMLElement): { destroy: () => void } {
	const handleMouseEnter = () => {
		node.style.transform = 'translateY(-0.125ch)';
		node.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
	};

	const handleMouseLeave = () => {
		node.style.transform = '';
	};

	node.addEventListener('mouseenter', handleMouseEnter);
	node.addEventListener('mouseleave', handleMouseLeave);

	return {
		destroy() {
			node.removeEventListener('mouseenter', handleMouseEnter);
			node.removeEventListener('mouseleave', handleMouseLeave);
		}
	};
}
