import { readdir } from 'fs/promises';
import chalk from 'chalk';

export async function reviewCodebase(): Promise<void> {
	console.log(chalk.blue('\n🔍 Reviewing SvelteKit Project Structure...'));

	try {
		// First check if src exists
		const srcContent = await readdir('src', { withFileTypes: true });

		// Group entries by type
		const directories = srcContent.filter((entry) => entry.isDirectory());
		const files = srcContent.filter((entry) => entry.isFile());

		// Log directories first
		if (directories.length > 0) {
			console.log(chalk.green('✓ Source directories:'));
			for (const dir of directories) {
				console.log(chalk.gray(`  - src/${dir.name}`));

				// Read contents of important directories
				if (['routes', 'lib', 'components'].includes(dir.name)) {
					try {
						const subContent = await readdir(`src/${dir.name}`, {
							withFileTypes: true
						});
						const subDirs = subContent.filter((entry) => entry.isDirectory());
						const subFiles = subContent.filter((entry) => entry.isFile());

						if (subDirs.length > 0) {
							console.log(chalk.gray(`    Subdirectories:`));
							subDirs.forEach((subDir) => {
								console.log(
									chalk.gray(`      - src/${dir.name}/${subDir.name}`)
								);
							});
						}

						if (subFiles.length > 0) {
							console.log(chalk.gray(`    Files:`));
							subFiles.forEach((file) => {
								console.log(chalk.gray(`      - src/${dir.name}/${file.name}`));
							});
						}
					} catch {
						console.log(
							chalk.yellow(`    ⚠ Could not access src/${dir.name} contents`)
						);
					}
				}
			}
		}

		// Log root src files
		if (files.length > 0) {
			console.log(chalk.green('\n✓ Source files:'));
			files.forEach((file) => {
				console.log(chalk.gray(`  - src/${file.name}`));
			});
		}
	} catch {
		console.log(
			chalk.red('✗ Could not find src directory - is this a SvelteKit project?')
		);
	}
} 