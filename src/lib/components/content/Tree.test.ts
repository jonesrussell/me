import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Tree from './Tree.svelte';

describe('Tree', () => {
	it('renders a single file', () => {
		const data = { name: 'example.txt' };
		const { container } = render(Tree, { props: { data } });

		const file = container.querySelector('.file');
		expect(file).toBeInTheDocument();
		expect(file?.textContent?.trim()).toBe('example.txt');
	});

	it('renders a folder with files', () => {
		const data = {
			name: 'src',
			children: [{ name: 'index.ts' }, { name: 'types.ts' }]
		};

		const { container } = render(Tree, { props: { data } });

		const folder = container.querySelector('.folder');
		expect(folder).toBeInTheDocument();
		expect(folder?.textContent?.trim()).toBe('src/');

		const files = container.querySelectorAll('.file');
		expect(files).toHaveLength(2);
		expect(files[0]?.textContent?.trim()).toBe('├─ index.ts');
		expect(files[1]?.textContent?.trim()).toBe('└─ types.ts');
	});

	it('renders nested folders', () => {
		const data = {
			name: 'project',
			children: [
				{
					name: 'src',
					children: [
						{ name: 'index.ts' },
						{
							name: 'components',
							children: [{ name: 'Button.svelte' }]
						}
					]
				}
			]
		};

		const { container } = render(Tree, { props: { data } });

		const folders = container.querySelectorAll('.folder');
		expect(folders).toHaveLength(3);
		expect(folders[0]?.textContent?.trim()).toBe('project/');
		expect(folders[1]?.textContent?.trim()).toBe('└─ src/');
		expect(folders[2]?.textContent?.trim()).toBe('│  └─ components/');

		const files = container.querySelectorAll('.file');
		expect(files).toHaveLength(2);
		expect(files[0]?.textContent?.trim()).toBe('│  ├─ index.ts');
		expect(files[1]?.textContent?.trim()).toBe('│  │  └─ Button.svelte');
	});

	it('handles empty folder', () => {
		const data = {
			name: 'empty',
			children: []
		};

		const { container } = render(Tree, { props: { data } });

		const folder = container.querySelector('.folder');
		expect(folder).toBeInTheDocument();
		expect(folder?.textContent?.trim()).toBe('empty/');

		const files = container.querySelectorAll('.file');
		expect(files).toHaveLength(0);
	});

	it('has correct styling', () => {
		const data = { name: 'test.txt' };
		const { container } = render(Tree, { props: { data } });

		const treeNode = container.querySelector('.tree-node');
		expect(treeNode).toHaveStyle({
			'font-family': 'var(--font-mono)',
			'white-space': 'pre'
		});

		const file = container.querySelector('.file');
		expect(file).toHaveStyle({
			color: 'var(--text-color)'
		});
	});
});
