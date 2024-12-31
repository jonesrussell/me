import { readFile } from 'fs/promises';
import chalk from 'chalk';
import { parse as parseYAML } from 'yaml';
import type { CursorRules, CursorRule } from './types';

export async function validateCursorRules(): Promise<void> {
	try {
		console.log(chalk.blue('📋 Validating Cursor Rules...'));
		const rulesContent = await readFile('.cursorrules', 'utf-8');
		const rules = parseYAML(rulesContent) as CursorRules;

		console.log(chalk.green('✓ Cursor rules loaded successfully'));
		console.log(chalk.gray('Found rule categories:'));
		Object.keys(rules).forEach((category) => {
			if (
				category !== 'code_style_examples' &&
				category !== 'snippets_in_svelte_5'
			) {
				console.log(chalk.gray(`  - ${category}`));
				// Show rules if they exist
				const categoryData = rules[category] as CursorRule;
				if (categoryData?.rules) {
					const rulesList = categoryData.rules;
					Object.keys(rulesList).forEach((rule) => {
						console.log(chalk.gray(`    - ${rule}: ${rulesList[rule]}`));
					});
				}
			}
		});
	} catch {
		console.log(
			chalk.yellow('⚠ No .cursorrules file found - using default rules')
		);
	}
}
