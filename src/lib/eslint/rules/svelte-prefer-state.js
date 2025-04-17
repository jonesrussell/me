/** @type {import('eslint').Rule.RuleModule} */
export default {
	meta: {
		type: 'problem',
		docs: {
			description: 'Enforce using $state instead of let for reactive variables',
			category: 'Best Practices',
			recommended: true
		},
		fixable: 'code',
		schema: []
	},
	create(context) {
		/**
		 * @param {import('eslint').AST.Token} token
		 * @returns {boolean}
		 */
		const isTemplateToken = (token) => {
			const tokenType = String(token.type);
			return tokenType === 'HTML' || tokenType === 'HTMLText';
		};

		/**
		 * @param {import('estree').VariableDeclaration} node
		 * @returns {boolean}
		 */
		const isReassigned = (node) => {
			const text = context.sourceCode.getText();
			const decl = node.declarations[0];
			if (!decl || decl.id.type !== 'Identifier') return false;

			/** @type {import('estree').Identifier} */
			const id = decl.id;

			// Count assignments to this variable
			const assignments = text.match(new RegExp(`${id.name}\\s*=`)) || [];
			return assignments.length > 1;
		};

		return {
			VariableDeclaration(node) {
				if (node.kind === 'let') {
					// Check if the variable is used in the template
					const isUsedInTemplate = node.declarations.some((decl) => {
						if (decl.id.type !== 'Identifier') return false;

						// Get the source code and check if the variable is used in the template
						const templateContent =
							context.sourceCode.ast.tokens
								?.filter(isTemplateToken)
								.map((token) => token.value)
								.join('') || '';

						return templateContent.includes(decl.id.name);
					});

					if (isUsedInTemplate) {
						const decl = node.declarations[0];
						if (decl.id.type !== 'Identifier') return;

						const init = decl.init;
						// Skip if it's already using $state
						if (
							init?.type === 'CallExpression' &&
							init.callee.type === 'Identifier' &&
							init.callee.name === '$state'
						) {
							return;
						}

						context.report({
							node,
							message: 'Use $state instead of let for reactive variables in Svelte 5',
							fix(fixer) {
								const initText = init ? context.sourceCode.getText(init) : 'undefined';
								const willBeReassigned = isReassigned(node);

								// Type guard to ensure we have an Identifier
								if (decl.id.type !== 'Identifier') {
									return null;
								}

								return fixer.replaceText(
									node,
									`${willBeReassigned ? 'let' : 'const'} ${decl.id.name} = $state(${initText});`
								);
							}
						});
					}
				}
			}
		};
	}
};
