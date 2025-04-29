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
