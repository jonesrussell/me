<script lang="ts">
	import Input from './Input.svelte';

	const props = $props<{
		label?: string;
		name?: string;
		type?: string;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		value?: string;
		onInput?: (value: string) => void;
		error?: string;
		helperText?: string;
		rows?: number;
	}>();

	const fieldId = `field-${props.name || Math.random().toString(36).substring(2, 9)}`;
	const isInvalid = $derived((props.error ?? '').length > 0);
	const isTextarea = $derived(props.type === 'textarea');
	let fieldValue = $derived(props.value ?? '');
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
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color);
		display: flex;
		align-items: center;
		gap: var(--space-2);
		width: 100%;
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
		color: var(--error-color);
		font-size: var(--font-size-sm);
		font-family: var(--font-mono);
	}

	.helper {
		color: var(--text-muted);
		font-size: var(--font-size-sm);
		font-family: var(--font-mono);
	}

	.textarea {
		width: 100%;
		min-width: 0;
		padding: var(--space-4) var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		resize: vertical;
		min-height: 12ch;
		line-height: var(--line-height-relaxed);
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
		box-shadow: 0 0 0 1px var(--error-color);
	}

	@media (forced-colors: active) {
		.textarea {
			border: 1px solid CanvasText;
			background: Canvas;
			color: CanvasText;
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
	{#if props.label}
		<label for={fieldId} class="label">
			{props.label}
			{#if props.required}
				<span class="required" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<div class="input-wrapper">
		{#if isTextarea}
			<textarea
				name={props.name ?? ''}
				id={fieldId}
				class="textarea"
				placeholder={props.placeholder ?? ''}
				disabled={props.disabled ?? false}
				required={props.required ?? false}
				rows={props.rows ?? 3}
				bind:value={fieldValue}
				oninput={() => props.onInput?.(fieldValue)}
				aria-invalid={isInvalid}
				aria-describedby={props.error
					? `${fieldId}-error`
					: props.helperText
						? `${fieldId}-helper`
						: undefined}
			></textarea>
		{:else}
			<Input
				type={props.type ?? 'text'}
				placeholder={props.placeholder ?? ''}
				disabled={props.disabled ?? false}
				required={props.required ?? false}
				value={fieldValue}
				onInput={props.onInput}
				name={props.name ?? ''}
				id={fieldId}
				aria-invalid={isInvalid}
				aria-describedby={props.error
					? `${fieldId}-error`
					: props.helperText
						? `${fieldId}-helper`
						: undefined}
			/>
		{/if}
	</div>

	{#if props.error}
		<div id={`${fieldId}-error`} class="error" role="alert">
			{props.error}
		</div>
	{:else if props.helperText}
		<div id={`${fieldId}-helper`} class="helper">
			{props.helperText}
		</div>
	{/if}
</div>
