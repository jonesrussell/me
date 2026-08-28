import { config } from '$lib/config/env';

export interface FormSchemaProperty {
	type?: string;
	title?: string;
	description?: string;
	format?: string;
	minLength?: number;
	maxLength?: number;
	enum?: string[];
	const?: string | number | boolean;
}

export interface FormSchema {
	$schema: string;
	title?: string;
	description?: string;
	type: 'object';
	properties: Record<string, FormSchemaProperty>;
	required?: string[];
	additionalProperties?: boolean;
}

export interface PublishedFormSchema {
	schema: FormSchema;
	version?: number;
}

export type FormData = Record<string, string | number | boolean>;

export interface FormSubmission {
	id: string;
	formId: string;
	schemaVersion: number;
	status: 'accepted' | 'processing' | 'completed' | 'failed';
	data: FormData;
	submittedAt: string;
}

export interface FormSubmissionResult {
	submission: FormSubmission;
	replayed: boolean;
}

interface GoFormXFieldError {
	pointer: string;
	code: string;
	message: string;
}

interface GoFormXErrorEnvelope {
	error?: {
		code?: string;
		message?: string;
		requestId?: string;
		fields?: GoFormXFieldError[];
	};
}

export interface ValidationError {
	field: string;
	pointer: string;
	message: string;
	code: string;
}

export class FormServiceError extends Error {
	constructor(
		message: string,
		readonly status: number,
		readonly code?: string,
		readonly requestId?: string,
		readonly retryAfterSeconds?: number
	) {
		super(message);
	}
}

export class FormValidationError extends FormServiceError {
	constructor(
		readonly fieldErrors: ValidationError[],
		requestId?: string
	) {
		super(
			'Please check the highlighted fields and try again.',
			422,
			'validation_failed',
			requestId
		);
	}
}

export class FormNetworkError extends Error {
	constructor() {
		super('Unable to reach GoFormX. Check your connection and try again.');
	}
}

type Fetcher = typeof fetch;

const JSON_ACCEPT = 'application/json';
const SCHEMA_ACCEPT = 'application/schema+json';
const SCHEMA_VERSION_HEADER = 'X-GoFormX-Schema-Version';
const IDEMPOTENCY_HEADER = 'Idempotency-Key';
const REPLAY_HEADER = 'Idempotency-Replayed';

function fieldFromPointer(pointer: string): string {
	const encodedField = pointer.match(/^\/data\/([^/]+)/)?.[1];
	return encodedField?.replaceAll('~1', '/').replaceAll('~0', '~') ?? '';
}

function parseRetryAfter(value: string | null): number | undefined {
	if (!value) return undefined;
	const seconds = Number(value);
	if (Number.isFinite(seconds)) return Math.max(0, seconds);
	const retryAt = Date.parse(value);
	return Number.isNaN(retryAt) ? undefined : Math.max(0, Math.ceil((retryAt - Date.now()) / 1000));
}

async function readError(response: Response): Promise<GoFormXErrorEnvelope> {
	return response.json().catch(() => ({}));
}

export function createIdempotencyKey(): string {
	if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID();
	return `contact-${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

export class FormService {
	private static instance: FormService;
	private readonly baseUrl: string;

	constructor(
		baseUrl = config.goformsApiUrl,
		private readonly fetcher: Fetcher = globalThis.fetch
	) {
		this.baseUrl = baseUrl.replace(/\/$/, '');
	}

	static getInstance(): FormService {
		FormService.instance ??= new FormService();
		return FormService.instance;
	}

	async getSchema(publicKey: string): Promise<PublishedFormSchema> {
		this.requirePublicKey(publicKey);

		try {
			const response = await this.fetcher(
				`${this.baseUrl}/v1/public/forms/${encodeURIComponent(publicKey)}/schema`,
				{ headers: { Accept: SCHEMA_ACCEPT } }
			);

			if (!response.ok)
				throw await this.responseError(response, 'The contact form is unavailable.');

			const versionValue = response.headers.get(SCHEMA_VERSION_HEADER);
			const version = versionValue ? Number(versionValue) : undefined;
			return {
				schema: (await response.json()) as FormSchema,
				version: Number.isInteger(version) && (version ?? 0) > 0 ? version : undefined
			};
		} catch (error) {
			if (error instanceof FormServiceError) throw error;
			throw new FormNetworkError();
		}
	}

	async submitForm(
		publicKey: string,
		data: FormData,
		idempotencyKey: string,
		schemaVersion?: number
	): Promise<FormSubmissionResult> {
		this.requirePublicKey(publicKey);
		const headers: Record<string, string> = {
			Accept: JSON_ACCEPT,
			'Content-Type': JSON_ACCEPT,
			[IDEMPOTENCY_HEADER]: idempotencyKey
		};
		if (schemaVersion) headers[SCHEMA_VERSION_HEADER] = String(schemaVersion);

		try {
			const response = await this.fetcher(
				`${this.baseUrl}/v1/public/forms/${encodeURIComponent(publicKey)}/submissions`,
				{ method: 'POST', headers, body: JSON.stringify({ data }) }
			);

			if (!response.ok) throw await this.responseError(response, 'The message could not be sent.');

			const envelope = (await response.json()) as { data: FormSubmission };
			return {
				submission: envelope.data,
				replayed: response.headers.get(REPLAY_HEADER)?.toLowerCase() === 'true'
			};
		} catch (error) {
			if (error instanceof FormServiceError) throw error;
			throw new FormNetworkError();
		}
	}

	private requirePublicKey(publicKey: string): void {
		if (!publicKey)
			throw new FormServiceError('The contact form is not configured.', 0, 'not_configured');
	}

	private async responseError(response: Response, fallback: string): Promise<FormServiceError> {
		const body = await readError(response);
		const error = body.error;
		if (response.status === 422 && error?.fields) {
			return new FormValidationError(
				error.fields.map(field => ({
					field: fieldFromPointer(field.pointer),
					pointer: field.pointer,
					message: field.message,
					code: field.code
				})),
				error.requestId
			);
		}

		const message =
			response.status === 429
				? 'Too many messages were sent. Please wait a moment and try again.'
				: error?.message || fallback;
		return new FormServiceError(
			message,
			response.status,
			error?.code,
			error?.requestId,
			parseRetryAfter(response.headers.get('Retry-After'))
		);
	}
}
