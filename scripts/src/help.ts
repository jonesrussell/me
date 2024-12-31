import chalk from 'chalk';

export async function showHelp(): Promise<void> {
	console.log(chalk.blue('📚 Available Commands:\n'));
	console.log(
		chalk.white(`
npm run init-session
    Initializes a development session:
    - Validates cursor rules
    - Scans markdown documentation
    - Reviews codebase structure
    - Shows project health check

npm run ai-attach
    Outputs AI file attachment instructions:
    - Lists key project files
    - Provides context for AI review
    - Makes documentation updates easier

Options:
    --help, -h    Show this help message
`)
	);
} 