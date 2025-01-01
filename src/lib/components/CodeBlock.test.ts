import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import CodeBlock from './CodeBlock.svelte';

describe('CodeBlock', () => {
	it('renders with default props', () => {
		const { container } = render(CodeBlock, {
			props: {
				children: () => 'const x = 1;'
			}
		});
		const codeBlock = container.querySelector('.code-block');
		expect(codeBlock).toBeInTheDocument();
		expect(codeBlock).toHaveStyle({ '--block-width': '60ch' });
		expect(container.textContent).toContain('const x = 1;');
		expect(container.textContent).toContain('1 lines');
	});

	it('renders with custom width', () => {
		const { container } = render(CodeBlock, {
			props: {
				width: 80,
				children: () => 'const x = 1;'
			}
		});
		const codeBlock = container.querySelector('.code-block');
		expect(codeBlock?.getAttribute('style')).toContain('--block-width: 80ch');
	});

	it('renders with filename and language', () => {
		const { container } = render(CodeBlock, {
			props: {
				filename: 'example.ts',
				language: 'typescript',
				children: () => 'const x: number = 1;'
			}
		});
		const fileHeader = container.querySelector('.file-header');
		expect(fileHeader).toBeInTheDocument();
		expect(container.textContent).toContain('example.ts');
		expect(container.textContent).toContain('typescript');
		expect(container.querySelector('code')).toHaveClass('typescript');
	});

	it('handles multiline code', () => {
		const code = `
			function example() {
				return true;
			}
		`;
		const { container } = render(CodeBlock, {
			props: {
				children: () => code
			}
		});
		expect(container.textContent).toContain('4 lines');
		expect(container.textContent).toContain('function example()');
	});
});
