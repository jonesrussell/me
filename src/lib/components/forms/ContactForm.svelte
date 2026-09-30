<script lang="ts">
	import { onMount, tick } from 'svelte';
	import {
		createIdempotencyKey,
		FormNetworkError,
		FormService,
		FormServiceError,
		FormValidationError,
		type FormData,
		type FormSchemaProperty,
		type PublishedFormSchema
	} from '$lib/services/form-service';
	import { config } from '$lib/config/env';

	type FormState = 'loading' | 'idle' | 'submitting' | 'success' | 'error';
	type Field = { key: string; definition: FormSchemaProperty; required: boolean };

	let formState = $state<FormState>('loading');
	let schemaResult = $state<PublishedFormSchema | null>(null);
	let errorMessage = $state('');
	let fieldErrors = $state<Record<string, string>>({});
	let values = $state<Record<string, string>>({});
	let pendingAttempt = $state<{ signature: string; key: string } | null>(null);

	const service = FormService.getInstance();
	const publicKey = config.formPublicKeys.contact;
	const fields = $derived.by<Field[]>(() => {
		if (!schemaResult) return [];
		const required = new Set(schemaResult.schema.required ?? []);
		return Object.entries(schemaResult.schema.properties)
			.filter(
				([key, definition]) =>
					key !== 'source' && (!definition.type || definition.type === 'string')
			)
			.map(([key, definition]) => ({ key, definition, required: required.has(key) }));
	});

	onMount(() => {
		void loadSchema();
	});

	async function loadSchema() {
		formState = 'loading';
		errorMessage = '';
		try {
			schemaResult = await service.getSchema(publicKey);
			if (!schemaResult.version)
				throw new Error('The contact form is unavailable. Please use email or try again.');
			const required = schemaResult.schema.required ?? [];
			const unsupportedRequired = required.filter((key) => {
				const definition = schemaResult?.schema.properties[key];
				return !definition || (key !== 'source' && definition.type && definition.type !== 'string');
			});
			if (unsupportedRequired.length > 0) {
				throw new Error('This form schema contains fields this client cannot render yet.');
			}
			if (!Object.keys(schemaResult.schema.properties).length)
				throw new Error('The contact form is unavailable. Please use email.');
			formState = 'idle';
		} catch (error) {
			schemaResult = null;
			formState = 'error';
			errorMessage = error instanceof Error ? error.message : 'The contact form is unavailable.';
		}
	}

	function labelFor(field: Field): string {
		return (
			field.definition.title ??
			field.key.replaceAll(/[-_]/g, ' ').replace(/^./, (value) => value.toUpperCase())
		);
	}

	function inputType(field: Field): string {
		return field.definition.format === 'email' ? 'email' : 'text';
	}

	function isTextarea(field: Field): boolean {
		return (
			!field.definition.format &&
			(field.key === 'message' || (field.definition.maxLength ?? 0) > 200)
		);
	}

	function setValue(key: string, value: string) {
		values[key] = value;
		if (fieldErrors[key]) {
			delete fieldErrors[key];
			fieldErrors = { ...fieldErrors };
		}
		if (formState === 'error') {
			formState = 'idle';
			errorMessage = '';
		}
	}

	function submissionData(): FormData {
		const data = Object.fromEntries(
			fields
				.map((field) => [field.key, values[field.key] ?? ''])
				.filter(([, value]) => value !== '')
		);
		if (schemaResult?.schema.properties.source) {
			data.source = schemaResult.schema.properties.source.const ?? 'jonesrussell.github.io/me';
		}
		return data;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!schemaResult || formState === 'submitting') return;

		formState = 'submitting';
		errorMessage = '';
		fieldErrors = {};

		const data = submissionData();
		const signature = JSON.stringify(data);
		if (pendingAttempt?.signature !== signature) {
			pendingAttempt = { signature, key: createIdempotencyKey() };
		}

		try {
			await service.submitForm(publicKey, data, pendingAttempt.key, schemaResult.version);
			pendingAttempt = null;
			formState = 'success';
		} catch (error) {
			if (error instanceof FormValidationError) {
				formState = 'error';
				errorMessage = 'Please check the highlighted fields and try again.';
				fieldErrors = Object.fromEntries(
					error.fieldErrors.filter((item) => item.field).map((item) => [item.field, item.message])
				);
				await tick();
				const firstInvalid = fields.find((field) => fieldErrors[field.key]);
				if (firstInvalid) document.getElementById(`cf-${firstInvalid.key}`)?.focus();
				return;
			}

			formState = 'error';
			if (error instanceof FormServiceError && error.status === 429 && error.retryAfterSeconds) {
				errorMessage = `${error.message} Try again in about ${error.retryAfterSeconds} seconds.`;
			} else if (
				error instanceof FormNetworkError &&
				typeof navigator !== 'undefined' &&
				!navigator.onLine
			) {
				errorMessage = 'You appear to be offline. Reconnect and try sending again.';
			} else {
				errorMessage =
					error instanceof Error ? error.message : 'Something went wrong. Please try again.';
			}
		}
	}
</script>

<style>
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.optional {
		font-size: var(--font-size-xs, 0.75rem);
		font-weight: var(--font-weight-normal);
		color: var(--text-muted);
	}

	.submit-error,
	.form-status p {
		margin: 0;
	}

	.form-status {
		display: flex;
		padding: var(--space-5);
		font-family: var(--font-mono);
		color: var(--text-muted);
		background: var(--color-mix-faint);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		flex-direction: column;
		gap: var(--space-3);
	}

	.form-status-error {
		border-color: var(--color-error);
	}

	.form-retry {
		align-self: flex-start;
		padding: var(--space-2) var(--space-3);
		font-family: var(--font-mono);
		color: var(--accent-color);
		background: transparent;
		border: 1px solid var(--accent-color);
		border-radius: var(--radius-sm);
		cursor: pointer;
	}

	:global(.form-input[aria-invalid='true']),
	:global(.form-textarea[aria-invalid='true']),
	:global(.form-select[aria-invalid='true']) {
		border-color: var(--color-error);
		box-shadow: 0 0 0 var(--space-1) color-mix(in srgb, var(--color-error) 20%, transparent);
	}

	.success-message {
		padding: var(--space-6);
		font-family: var(--font-mono);
		background: var(--color-mix-faint);
		border: 1px solid var(--accent-color);
		border-radius: var(--radius-md);
	}

	.success-heading {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		color: var(--accent-color);
	}

	.success-body {
		margin: 0;
		font-size: var(--font-size-base);
		color: var(--text-muted);
	}
</style>

{#if formState === 'success'}
	<div class="success-message" role="status">
		<p class="success-heading">Your enquiry has been received.</p>
		<p class="success-body">Thanks for sharing what you’re working on.</p>
	</div>
{:else if formState === 'loading'}
	<div class="form-status" role="status">Loading the contact form…</div>
{:else if !schemaResult}
	<div class="form-status form-status-error" role="alert">
		<p>{errorMessage}</p>
		<button type="button" class="form-retry" onclick={loadSchema}>Try again</button>
		<p>You can also email <a href="mailto:jonesrussell42@gmail.com">jonesrussell42@gmail.com</a>.</p>
	</div>
{:else}
	<form class="contact-form" onsubmit={handleSubmit}>
		{#each fields as field (field.key)}
			<div class="form-group">
				<label class="form-label" for={`cf-${field.key}`}>
					{labelFor(field)}
					{#if !field.required}<span class="optional">(optional)</span>{/if}
				</label>

				{#if field.definition.enum}
					<select
						id={`cf-${field.key}`}
						class="form-select"
						value={values[field.key] ?? ''}
						required={field.required}
						aria-invalid={fieldErrors[field.key] ? true : undefined}
						aria-describedby={fieldErrors[field.key] ? `cf-${field.key}-error` : undefined}
						disabled={formState === 'submitting'}
						onchange={(event) => setValue(field.key, event.currentTarget.value)}
					>
						<option value="">Select one</option>
						{#each field.definition.enum as option (option)}
							<option value={option}>{option}</option>
						{/each}
					</select>
				{:else if isTextarea(field)}
					<textarea
						id={`cf-${field.key}`}
						class="form-textarea"
						value={values[field.key] ?? ''}
						placeholder={field.definition.description ?? `Your ${labelFor(field).toLowerCase()}...`}
						rows="5"
						required={field.required}
						minlength={field.definition.minLength}
						maxlength={field.definition.maxLength}
						aria-invalid={fieldErrors[field.key] ? true : undefined}
						aria-describedby={fieldErrors[field.key] ? `cf-${field.key}-error` : undefined}
						disabled={formState === 'submitting'}
						oninput={(event) => setValue(field.key, event.currentTarget.value)}
					></textarea>
				{:else}
					<input
						id={`cf-${field.key}`}
						class="form-input"
						autocomplete={field.definition.format === 'email'
							? 'email'
							: field.key === 'name'
								? 'name'
								: undefined}
						type={inputType(field)}
						value={values[field.key] ?? ''}
						placeholder={field.definition.description ?? labelFor(field)}
						required={field.required}
						minlength={field.definition.minLength}
						maxlength={field.definition.maxLength}
						aria-invalid={fieldErrors[field.key] ? true : undefined}
						aria-describedby={fieldErrors[field.key] ? `cf-${field.key}-error` : undefined}
						disabled={formState === 'submitting'}
						oninput={(event) => setValue(field.key, event.currentTarget.value)}
					/>
				{/if}

				{#if fieldErrors[field.key]}
					<span id={`cf-${field.key}-error`} class="form-error">{fieldErrors[field.key]}</span>
				{/if}
			</div>
		{/each}

		{#if formState === 'error'}
			<p class="form-error submit-error" role="alert">{errorMessage}</p>
		{/if}

		<button type="submit" class="form-submit" disabled={formState === 'submitting'}>
			{formState === 'submitting' ? 'Sending…' : 'Send enquiry'}
		</button>
	</form>
{/if}

<noscript>
	<p class="form-status">
		JavaScript is required for the secure form. Email <a href="mailto:jonesrussell42@gmail.com"
			>jonesrussell42@gmail.com</a
		> instead.
	</p>
</noscript>
