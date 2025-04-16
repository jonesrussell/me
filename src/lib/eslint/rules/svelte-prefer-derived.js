/** @type {import('eslint').Rule.RuleModule} */
export default {
	meta: {
		type: 'problem',
		docs: {
			description: 'Enforce using $derived instead of $: for derived values',
			category: 'Best Practices',
			recommended: true
		},
		fixable: 'code',
		schema: []
	},
	create(context) {
		return {
			LabeledStatement(node) {
				if (node.label.name === '$') {
					context.report({
						node,
						message: 'Use $derived instead of $: for derived values in Svelte 5',
						fix(fixer) {
							const expression =
								node.body.type === 'ExpressionStatement' ? node.body.expression : node.body;

							// Get the variable name if it's a variable declaration
							const varName =
								node.body.type === 'VariableDeclaration'
									? /** @type {import('estree').Identifier} */ (node.body.declarations[0]?.id)?.name
									: 'derived';

							return fixer.replaceText(
								node,
								`const ${varName} = $derived(${context.getSourceCode().getText(expression)});`
							);
						}
					});
				}
			}
		};
	}
};
