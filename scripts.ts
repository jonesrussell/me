#!/usr/bin/env node

import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import chalk from 'chalk';
import { parse as parseYAML } from 'yaml';

interface CursorRule {
    description?: string;
    rules: Record<string, boolean>;
}

interface CursorRules {
    general_rules: Record<string, boolean>;
    typescript_guidelines: CursorRule[];
    monospace_web_guidelines: CursorRule[];
    css_2024_best_practices: CursorRule[];
    ecmascript_2024_standards: CursorRule[];
    [key: string]: any;
}

async function generateAIInstructions(): Promise<void> {
    console.log(chalk.white(`
Please review and keep in mind these key project files:
@.cursorrules - Project coding standards and guidelines
@TODO.md - Current project tasks and progress
@README.md - Project overview and documentation
@docs/CONTRIBUTING.md - Contribution guidelines
@docs/TESTING.md - Testing procedures and requirements

These files should inform all your responses and recommendations.`));
}

async function validateCursorRules(): Promise<void> {
    try {
        console.log(chalk.blue('📋 Validating Cursor Rules...'));
        const rulesContent = await readFile('.cursorrules', 'utf-8');
        const rules = parseYAML(rulesContent) as CursorRules;

        console.log(chalk.green('✓ Cursor rules loaded successfully'));
        console.log(chalk.gray('Found rule categories:'));
        Object.keys(rules).forEach(category => {
            if (category !== 'code_style_examples' && category !== 'snippets_in_svelte_5') {
                console.log(chalk.gray(`  - ${category}`));
                // Show rules if they exist
                if (rules[category]?.rules) {
                    const rulesList = rules[category].rules;
                    Object.keys(rulesList).forEach(rule => {
                        console.log(chalk.gray(`    - ${rule}: ${rulesList[rule]}`));
                    });
                }
            }
        });
    } catch (error) {
        console.log(chalk.yellow('⚠ No .cursorrules file found - using default rules'));
    }
}

async function scanMarkdownDocs(): Promise<void> {
    try {
        console.log(chalk.blue('\n📚 Scanning Markdown Documentation...'));
        const mdFiles: string[] = [];

        async function scanDir(dir: string) {
            const entries = await readdir(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = join(dir, entry.name);
                // Skip node_modules and hidden directories
                if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
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
            mdFiles.forEach(file => {
                console.log(chalk.gray(`  - ${file}`));
            });
        }

        // Verify key documentation files exist
        const requiredFiles = ['.cursorrules', 'TODO.md', 'README.md', 'docs/CONTRIBUTING.md', 'docs/TESTING.md'];
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
            missingFiles.forEach(file => {
                console.log(chalk.yellow(`  - ${file}`));
            });
        }

    } catch (error) {
        console.error(chalk.red('✗ Error scanning markdown docs:'), error);
    }
}

async function reviewCodebase(): Promise<void> {
    console.log(chalk.blue('\n🔍 Reviewing SvelteKit Project Structure...'));

    try {
        // First check if src exists
        const srcContent = await readdir('src', { withFileTypes: true });

        // Group entries by type
        const directories = srcContent.filter(entry => entry.isDirectory());
        const files = srcContent.filter(entry => entry.isFile());

        // Log directories first
        if (directories.length > 0) {
            console.log(chalk.green('✓ Source directories:'));
            for (const dir of directories) {
                console.log(chalk.gray(`  - src/${dir.name}`));

                // Read contents of important directories
                if (['routes', 'lib', 'components'].includes(dir.name)) {
                    try {
                        const subContent = await readdir(`src/${dir.name}`, { withFileTypes: true });
                        const subDirs = subContent.filter(entry => entry.isDirectory());
                        const subFiles = subContent.filter(entry => entry.isFile());

                        if (subDirs.length > 0) {
                            console.log(chalk.gray(`    Subdirectories:`));
                            subDirs.forEach(subDir => {
                                console.log(chalk.gray(`      - src/${dir.name}/${subDir.name}`));
                            });
                        }

                        if (subFiles.length > 0) {
                            console.log(chalk.gray(`    Files:`));
                            subFiles.forEach(file => {
                                console.log(chalk.gray(`      - src/${dir.name}/${file.name}`));
                            });
                        }
                    } catch (error) {
                        console.log(chalk.yellow(`    ⚠ Could not access src/${dir.name} contents`));
                    }
                }
            }
        }

        // Log root src files
        if (files.length > 0) {
            console.log(chalk.green('\n✓ Source files:'));
            files.forEach(file => {
                console.log(chalk.gray(`  - src/${file.name}`));
            });
        }

    } catch (error) {
        console.log(chalk.red('✗ Could not find src directory - is this a SvelteKit project?'));
    }
}

async function main() {
    const command = process.argv[2];

    if (command === 'attach') {
        console.log(chalk.blue('🤖 AI File Attachment Instructions:'));
        await generateAIInstructions();
        return;
    }

    console.log(chalk.yellow('=== Session Initialization ===\n'));

    await validateCursorRules();
    await scanMarkdownDocs();
    await reviewCodebase();

    console.log(chalk.yellow('\n=== Initialization Complete ==='));
}

main().catch(console.error); 