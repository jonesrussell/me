import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import svelteRenderChildren from '../rules/svelte-render-children.js';
import svelteNoSlots from '../rules/svelte-no-slots.js';
import sveltePreferState from '../rules/svelte-prefer-state.js';
import sveltePreferDerived from '../rules/svelte-prefer-derived.js';

export default {
	...svelte,
	parser: svelteParser,
	rules: {
		...svelte.rules,
		'render-children': svelteRenderChildren,
		'no-slots': svelteNoSlots,
		'prefer-state': sveltePreferState,
		'prefer-derived': sveltePreferDerived
	}
};
