import type { ISeriesCodeFile } from '$lib/types/series';

const RAW_BASE = 'https://raw.githubusercontent.com';

function detectLanguage(path: string): string {
	if (path.endsWith('.php')) return 'php';
	if (path.endsWith('.json')) return 'json';
	if (path.endsWith('.xml')) return 'xml';
	return 'text';
}

export async function fetchCodeFile(
	fetchFn: typeof fetch,
	repoSlug: string,
	filePath: string,
	branch = 'main'
): Promise<ISeriesCodeFile> {
	const url = `${RAW_BASE}/${repoSlug}/${branch}/${filePath}`;

	try {
		const response = await fetchFn(url);
		if (!response.ok) {
			return {
				path: filePath,
				content: `// Failed to load ${filePath} (HTTP ${response.status})`,
				language: 'text'
			};
		}
		const content = await response.text();
		return {
			path: filePath,
			content,
			language: detectLanguage(filePath)
		};
	} catch {
		return {
			path: filePath,
			content: `// Failed to load ${filePath}`,
			language: 'text'
		};
	}
}

export async function fetchSeriesCode(
	fetchFn: typeof fetch,
	repoSlug: string,
	companionFiles: string[],
	testFiles: string[],
	branch = 'main'
): Promise<{ sourceFiles: ISeriesCodeFile[]; testFiles: ISeriesCodeFile[] }> {
	const [sourceFiles, testResults] = await Promise.all([
		Promise.all(companionFiles.map((f) => fetchCodeFile(fetchFn, repoSlug, f, branch))),
		Promise.all(testFiles.map((f) => fetchCodeFile(fetchFn, repoSlug, f, branch)))
	]);

	return { sourceFiles, testFiles: testResults };
}
