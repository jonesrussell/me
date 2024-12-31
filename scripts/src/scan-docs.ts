import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import chalk from 'chalk';

export async function scanMarkdownDocs(): Promise<void> {
	try {
		console.log(chalk.blue('\n📚 Scanning Markdown Documentation...'));
		const mdFiles: string[] = [];

		async function scanDir(dir: string) {
			const entries = await readdir(dir, { withFileTypes: true });
			for (const entry of entries) {
				const fullPath = join(dir, entry.name);
				// Skip node_modules and hidden directories
				if (
					entry.isDirectory() &&
					!entry.name.startsWith('.') &&
					entry.name !== 'node_modules'
				) {
					await scanDir(fullPath);
				} else if (entry.name.endsWith('.md')) {
					mdFiles.push(fullPath);
				}
			}
		}

		await scanDir('.');
		if (mdFiles.length === 0) {
			console.log(chalk.yellow('⚠ No markdown documentation files found'));
		} else {
			console.log(chalk.green(`✓ Found ${mdFiles.length} markdown files`));
			mdFiles.forEach((file) => {
				console.log(chalk.gray(`  - ${file}`));
			});
		}

		// Verify key documentation files exist
		const requiredFiles = [
			'.cursorrules',
			'TODO.md',
			'README.md',
			'docs/CONTRIBUTING.md',
			'docs/TESTING.md'
		];
		const missingFiles: string[] = [];

		for (const file of requiredFiles) {
			try {
				await readFile(file, 'utf-8');
			} catch {
				missingFiles.push(file);
			}
		}

		if (missingFiles.length > 0) {
			console.log(chalk.yellow('\n⚠ Missing key documentation files:'));
			missingFiles.forEach((file) => {
				console.log(chalk.yellow(`  - ${file}`));
			});
		}
	} catch (err) {
		console.error(chalk.red('✗ Error scanning markdown docs:'), err);
	}
}
