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

		return {
			VariableDeclaration(node) {
				if (node.kind === 'let') {
					// Check if the variable is used in the template
					const isUsedInTemplate = node.declarations.some((decl) => {
						if (decl.id.type !== 'Identifier') return false;

						// Get the source code and check if the variable is used in the template
						const sourceCode = context.getSourceCode();
						const templateContent =
							sourceCode.ast.tokens
								?.filter(isTemplateToken)
								.map((token) => token.value)
								.join('') || '';

						return templateContent.includes(decl.id.name);
					});

					if (isUsedInTemplate) {
						context.report({
							node,
							message: 'Use $state instead of let for reactive variables in Svelte 5',
							fix(fixer) {
								const decl = node.declarations[0];
								if (decl.id.type !== 'Identifier') return null;

								const init = decl.init;
								const initText = init ? context.getSourceCode().getText(init) : 'undefined';

								return fixer.replaceText(node, `const ${decl.id.name} = $state(${initText});`);
							}
						});
					}
				}
			}
		};
	}
};
