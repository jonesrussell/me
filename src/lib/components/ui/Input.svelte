<script lang="ts">
	const props = $props<{
		type?: string;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		value?: string;
		onInput?: (value: string) => void;
		name?: string;
		id?: string;
		'aria-invalid'?: boolean;
		'aria-describedby'?: string;
	}>();

	let inputValue = $derived(props.value ?? '');
</script>

<style>
	.input-container {
		width: 100%;
		position: relative;
	}

	.input {
		width: 100%;
		min-width: 0;
		padding: var(--space-4) var(--space-6);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--bg-darker);
		color: var(--text-color);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		line-height: var(--line-height-base);
		transition: all var(--transition-duration) var(--transition-timing);
		box-sizing: border-box;

		&:focus {
			outline: none;
			border-color: var(--accent-color);
			box-shadow: 0 0 0 var(--space-1) var(--accent-color-transparent);
		}

		&:disabled {
			opacity: 0.7;
			cursor: not-allowed;
		}

		&[aria-invalid='true'] {
			border-color: var(--error-color);
		}

		&[aria-invalid='true']:focus {
			border-color: var(--error-color);
			box-shadow: 0 0 0 var(--space-1) var(--error-color);
		}
	}
</style>

<div class="input-container">
	<input
		type={props.type ?? 'text'}
		placeholder={props.placeholder ?? ''}
		disabled={props.disabled ?? false}
		required={props.required ?? false}
		bind:value={inputValue}
		oninput={() => props.onInput?.(inputValue)}
		name={props.name ?? ''}
		id={props.id ?? ''}
		class="input"
		role="textbox"
		aria-label={props.placeholder || 'Text input'}
		aria-invalid={props['aria-invalid'] ?? false}
		aria-describedby={props['aria-describedby']}
	/>
</div>
