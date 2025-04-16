<script lang="ts">
	const {
		type = 'button',
		disabled = false,
		children
	} = $props<{
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		children?: () => unknown;
	}>();
</script>

<style>
	.button {
		display: inline-flex;
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		transition: all var(--transition-duration) var(--transition-timing);
		gap: var(--space-2);
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.button:hover:not(:disabled) {
		background: var(--bg-darkest);
		border-color: var(--accent-color);
	}

	.button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.button {
			transition: none;
		}
	}
</style>

<button {type} class="button" {disabled}>
	{@render children?.()}
</button>
