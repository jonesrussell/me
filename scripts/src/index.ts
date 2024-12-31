#!/usr/bin/env node

import { generateAIInstructions } from './ai-instructions';
import { validateCursorRules } from './validate-rules';
import { scanMarkdownDocs } from './scan-docs';
import { reviewCodebase } from './review-codebase';
import { showHelp } from './help';
import chalk from 'chalk';

async function main() {
	const command = process.argv[2];

	switch (command) {
		case 'attach':
			console.log(chalk.blue('🤖 AI File Attachment Instructions:'));
			await generateAIInstructions();
			break;

		case '--help':
		case '-h':
			await showHelp();
			break;

		case undefined:
			console.log(chalk.yellow('=== Session Initialization ===\n'));
			await validateCursorRules();
			await scanMarkdownDocs();
			await reviewCodebase();
			console.log(chalk.yellow('\n=== Initialization Complete ==='));
			break;

		default:
			console.log(chalk.red(`Unknown command: ${command}`));
			await showHelp();
			process.exit(1);
	}
}

main().catch(console.error);
