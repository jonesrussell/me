/** @type {import('eslint').Rule.RuleModule} */
export default {
	meta: {
		type: 'problem',
		docs: {
			description: 'Enforce using @render children() in Svelte 5 components',
			category: 'Best Practices',
			recommended: true
		},
		fixable: 'code',
		schema: []
	},
	create(context) {
		return {
			/** @param {import('estree').Node & { expression?: { type?: string; name?: string }; parent?: { type?: string } }} node */
			SvelteMustacheTag(node) {
				if (
					node.expression?.type === 'Identifier' &&
					node.expression.name === 'children' &&
					!node.parent?.type?.includes('SvelteRenderTag')
				) {
					context.report({
						node,
						message: 'Use {@render children()} instead of {children}',
						fix(fixer) {
							return fixer.replaceText(node, '{@render children()}');
						}
					});
				}
			}
		};
	}
};
