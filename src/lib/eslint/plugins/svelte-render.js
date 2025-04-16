import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import svelteRenderChildren from '../rules/svelte-render-children.js';

export default {
	...svelte,
	parser: svelteParser,
	rules: {
		...svelte.rules,
		'render-children': svelteRenderChildren
	}
};
