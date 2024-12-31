import chalk from 'chalk';

export async function generateAIInstructions(): Promise<void> {
	console.log(
		chalk.white(`
Please review and keep in mind these key project files:
@.cursorrules - Project coding standards and guidelines
@TODO.md - Current project tasks and progress
@README.md - Project overview and documentation
@docs/CONTRIBUTING.md - Contribution guidelines
@docs/TESTING.md - Testing procedures and requirements

These files should inform all your responses and recommendations.`)
	);
} 