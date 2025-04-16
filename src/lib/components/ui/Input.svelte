<script lang="ts">
	const {
		type = 'text',
		placeholder = '',
		disabled = false,
		value = $bindable('')
	} = $props<{
		type?: string;
		placeholder?: string;
		disabled?: boolean;
		value?: string;
	}>();

	let inputValue = $state(value);
</script>

<style>
	.input-container {
		width: 100%;
	}

	.input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid var(--border-color);
		border-radius: 0.25rem;
		background-color: var(--background-color);
		color: var(--text-color);
		font-family: var(--monospace-font);
		font-size: 0.875rem;
		line-height: 1.5;
		transition: border-color 0.2s ease-in-out;

		&:focus {
			outline: none;
			border-color: var(--primary-color);
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>

<div class="input-container">
	<input {type} {placeholder} {disabled} bind:value={inputValue} class="input" />
</div>
