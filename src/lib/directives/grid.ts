export function grid(node: HTMLElement, units: number = 1) {
	const update = (units: number) => {
		node.style.marginBottom = `${units}ch`;
	};

	update(units);

	return {
		update,
		destroy() {
			node.style.marginBottom = '';
		}
	};
}
