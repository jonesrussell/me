<script lang="ts">
	const {
		type = 'text',
		value = '',
		placeholder = '',
		disabled = false,
		required = false,
		name = '',
		id = '',
		onInput,
		'aria-invalid': ariaInvalid = false,
		'aria-describedby': ariaDescribedby
	} = $props<{
		type?: string;
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		name?: string;
		id?: string;
		onInput?: (value: string) => void;
		'aria-invalid'?: boolean;
		'aria-describedby'?: string;
	}>();

	let inputValue = $derived(value);
</script>

<style>
	.input-container {
		position: relative;
		width: 100%;
	}

	.input {
		width: 100%;
		padding: var(--space-4) var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		line-height: var(--line-height-base);
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		min-width: 0;
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

	@media (forced-colors: active) {
		.input {
			color: CanvasText;
			background: Canvas;
			border: 0.0625rem solid CanvasText;
		}

		.input:focus {
			border-color: Highlight;
			box-shadow: none;
		}

		.input:disabled {
			opacity: 1;
			border-color: GrayText;
		}

		.input[aria-invalid='true'] {
			border-color: Mark;
		}

		.input[aria-invalid='true']:focus {
			border-color: Mark;
			box-shadow: none;
		}
	}
</style>

<div class="input-container">
	<input
		{type}
		{placeholder}
		{disabled}
		{required}
		bind:value={inputValue}
		oninput={() => onInput?.(inputValue)}
		{name}
		{id}
		class="input"
		role="textbox"
		aria-label={placeholder || 'Text input'}
		aria-invalid={ariaInvalid}
		aria-describedby={ariaDescribedby}
	/>
</div>
