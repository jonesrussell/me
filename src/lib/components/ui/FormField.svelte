<script lang="ts">
	import Input from './Input.svelte';

	const {
		label = '',
		name = '',
		type = 'text',
		placeholder = '',
		disabled = false,
		required = false,
		value = '',
		onInput = (value: string) => {},
		error = '',
		helperText = '',
		rows = 3
	} = $props<{
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

	const fieldId = `field-${name || Math.random().toString(36).substring(2, 9)}`;
	const isInvalid = $derived(error.length > 0);
	const isTextarea = $derived(type === 'textarea');
	let inputValue = $state(value);

	$effect(() => {
		onInput(inputValue);
	});
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
				{name}
				id={fieldId}
				class="textarea"
				{placeholder}
				{disabled}
				{required}
				{rows}
				bind:value={inputValue}
				aria-invalid={isInvalid}
				aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
			></textarea>
		{:else}
			<Input
				{type}
				{placeholder}
				{disabled}
				{required}
				value={inputValue}
				onInput={(value) => (inputValue = value)}
				{name}
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
