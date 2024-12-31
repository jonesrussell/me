export interface CursorRule {
	description?: string;
	rules: Record<string, boolean>;
}

export interface CursorRules {
	general_rules: Record<string, boolean>;
	typescript_guidelines: CursorRule[];
	monospace_web_guidelines: CursorRule[];
	css_2024_best_practices: CursorRule[];
	ecmascript_2024_standards: CursorRule[];
	code_style_examples?: Record<string, unknown>;
	snippets_in_svelte_5?: Record<string, unknown>;
	[key: string]: unknown;
} 