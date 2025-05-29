<script lang="ts">
	import Input from '../ui/Input.svelte';

	const {
		label,
		name,
		type = 'text',
		required = false,
		error,
		placeholder,
		disabled,
		value,
		onInput,
		helperText,
		rows
	} = $props<{
		label: string;
		name: string;
		type?: string;
		required?: boolean;
		error?: string;
		placeholder?: string;
		disabled?: boolean;
		value?: string;
		onInput?: (value: string) => void;
		helperText?: string;
		rows?: number;
	}>();

	const fieldId = `field-${name || Math.random().toString(36).substring(2, 9)}`;
	const isInvalid = $derived((error ?? '').length > 0);
	const isTextarea = $derived(type === 'textarea');
	let fieldValue = $derived(value ?? '');
</script>

<style>
	.form-field {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		width: 100%;
		min-width: 0;
	}

	.label {
		display: flex;
		width: 100%;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color);
		align-items: center;
		gap: var(--space-2);
	}

	.required {
		color: var(--error-color);
	}

	.input-wrapper {
		position: relative;
		width: 100%;
		min-width: 0;
	}

	.error {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--error-color);
	}

	.helper {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.textarea {
		width: 100%;
		padding: var(--space-4) var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		min-width: 0;
		resize: vertical;
		min-height: 12rem;
		box-sizing: border-box;

		&:focus {
			outline: none;
			border-color: var(--accent-color);
			box-shadow: 0 0 0 var(--space-1) var(--accent-color-transparent);
		}

		&[aria-invalid='true'] {
			border-color: var(--error-color);
		}

		&[aria-invalid='true']:focus {
			border-color: var(--error-color);
			box-shadow: 0 0 0 var(--space-1) var(--error-color);
		}
	}

	:global(.input) {
		width: 100%;
		min-width: 0;
		box-sizing: border-box;
	}

	:global(.input[aria-invalid='true']) {
		border-color: var(--error-color);
	}

	:global(.input[aria-invalid='true']:focus) {
		border-color: var(--error-color);
		box-shadow: 0 0 0 0.0625rem var(--error-color);
	}

	@media (forced-colors: active) {
		.textarea {
			color: CanvasText;
			background: Canvas;
			border: 0.0625rem solid CanvasText;
		}

		.textarea:focus {
			border-color: Highlight;
			box-shadow: none;
		}

		.textarea[aria-invalid='true'] {
			border-color: Mark;
		}

		.textarea[aria-invalid='true']:focus {
			border-color: Mark;
			box-shadow: none;
		}

		.required {
			color: Mark;
		}

		.error {
			color: Mark;
		}

		.helper {
			color: GrayText;
		}
	}
</style>

<div class="form-field">
	{#if label}
		<label for={fieldId} class="label">
			{label}
			{#if required}
				<span class="required" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<div class="input-wrapper">
		{#if isTextarea}
			<textarea
				name={name ?? ''}
				id={fieldId}
				class="textarea"
				placeholder={placeholder ?? ''}
				disabled={disabled ?? false}
				required={required ?? false}
				rows={rows ?? 3}
				bind:value={fieldValue}
				oninput={() => onInput?.(fieldValue)}
				aria-invalid={isInvalid}
				aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
			></textarea>
		{:else}
			<Input
				type={type ?? 'text'}
				placeholder={placeholder ?? ''}
				disabled={disabled ?? false}
				required={required ?? false}
				value={fieldValue}
				{onInput}
				name={name ?? ''}
				id={fieldId}
				aria-invalid={isInvalid}
				aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
			/>
		{/if}
	</div>

	{#if error}
		<div id={`${fieldId}-error`} class="error" role="alert">
			{error}
		</div>
	{:else if helperText}
		<div id={`${fieldId}-helper`} class="helper">
			{helperText}
		</div>
	{/if}
</div>
