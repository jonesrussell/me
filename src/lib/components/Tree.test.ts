import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import Tree from './Tree.svelte';

describe('Tree Component', () => {
    describe('Rendering', () => {
        test('renders single file node', () => {
            const { container } = render(Tree, {
                props: {
                    data: { name: 'file.txt' }
                }
            });

            const node = container.querySelector('.file');
            expect(node).toHaveTextContent('file.txt');
        });

        test('renders folder with children', () => {
            const { container } = render(Tree, {
                props: {
                    data: {
                        name: 'src',
                        children: [
                            { name: 'index.ts' },
                            { name: 'utils', children: [{ name: 'helper.ts' }] }
                        ]
                    }
                }
            });

            const folders = container.querySelectorAll('.folder');
            const files = container.querySelectorAll('.file');

            expect(folders).toHaveLength(2);
            expect(files).toHaveLength(2);
            expect(folders[0]).toHaveTextContent('src/');
            expect(folders[1]).toHaveTextContent('utils/');
            expect(files[0]).toHaveTextContent('index.ts');
            expect(files[1]).toHaveTextContent('helper.ts');
        });
    });

    describe('Indentation', () => {
        test('correctly indents nested items', () => {
            const { container } = render(Tree, {
                props: {
                    data: {
                        name: 'root',
                        children: [
                            { name: 'file1.txt' },
                            {
                                name: 'folder',
                                children: [{ name: 'file2.txt' }]
                            }
                        ]
                    }
                }
            });

            const nodes = container.querySelectorAll('.tree-node');
            expect(nodes).toHaveLength(4); // root + 3 nodes

            const file2 = container.querySelector('.file:last-child');
            expect(file2?.textContent).toContain('└─ file2.txt');
        });

        test('uses correct prefix for last items', () => {
            const { container } = render(Tree, {
                props: {
                    data: {
                        name: 'root',
                        children: [
                            { name: 'first.txt' },
                            { name: 'last.txt' }
                        ]
                    }
                }
            });

            const files = container.querySelectorAll('.file');
            expect(files[1]?.textContent).toContain('└─ last.txt');
        });
    });

    describe('State Management', () => {
        test('updates when data changes', async () => {
            const { container, rerender } = render(Tree, {
                props: {
                    data: { name: 'old.txt' }
                }
            });

            // Initial state
            let file = container.querySelector('.file');
            expect(file).toHaveTextContent('old.txt');

            // Update data
            await rerender({
                data: { name: 'new.txt' }
            });

            file = container.querySelector('.file');
            expect(file).toHaveTextContent('new.txt');
        });

        test('updates nested structure reactively', async () => {
            const { container, rerender } = render(Tree, {
                props: {
                    data: {
                        name: 'root',
                        children: [{ name: 'initial.txt' }]
                    }
                }
            });

            // Initial state
            let file = container.querySelector('.file');
            expect(file).toHaveTextContent('initial.txt');

            // Update with new structure
            await rerender({
                data: {
                    name: 'root',
                    children: [
                        { name: 'updated.txt' },
                        { name: 'new.txt' }
                    ]
                }
            });

            const files = container.querySelectorAll('.file');
            expect(files).toHaveLength(2);
            expect(files[0]).toHaveTextContent('updated.txt');
            expect(files[1]).toHaveTextContent('new.txt');
        });
    });
}); 