/** @type {import('eslint').Rule.RuleModule} */
export default {
	meta: {
		type: 'problem',
		docs: {
			description: 'Prevent using slot elements in Svelte 5',
			category: 'Best Practices',
			recommended: true
		},
		fixable: 'code',
		schema: []
	},
	create(context) {
		return {
			SvelteElement(node) {
				if (node.name === 'slot') {
					context.report({
						node,
						message: 'Using <slot> is deprecated in Svelte 5. Use {@render ...} instead.',
						fix(fixer) {
							const nameAttr = node.attributes.find(
								/** @type {(attr: { name: string; value?: Array<{ data: string }> }) => boolean} */
								(attr) => attr.name === 'name'
							);
							const name = nameAttr?.value?.[0]?.data;
							const renderText = name
								? `{@render children({ name: "${name}" })}`
								: `{@render children()}`;
							return fixer.replaceText(node, renderText);
						}
					});
				}
			}
		};
	}
};
