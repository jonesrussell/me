/**
 * Error handling utilities for consistent error management across the application
 */

export interface ErrorContext {
	component?: string;
	action?: string;
	userId?: string;
	timestamp: number;
	userAgent?: string;
	url?: string;
}

export interface AppError extends Error {
	context?: ErrorContext;
	severity?: 'low' | 'medium' | 'high' | 'critical';
	recoverable?: boolean;
}

/**
 * Create a standardized error with context
 */
export function createError(
	message: string,
	originalError?: unknown,
	context?: Partial<ErrorContext>
): AppError {
	const error = new Error(message) as AppError;

	// Preserve original error stack if available
	if (originalError instanceof Error) {
		error.stack = originalError.stack;
	}

	// Add context
	error.context = {
		timestamp: Date.now(),
		...context
	};

	// Determine severity based on error type
	error.severity = determineSeverity(originalError);
	error.recoverable = isRecoverable(originalError);

	return error;
}

/**
 * Determine error severity based on error type
 */
function determineSeverity(error?: unknown): 'low' | 'medium' | 'high' | 'critical' {
	if (!error) return 'medium';

	// Network errors are usually recoverable
	if (error instanceof TypeError && error.message.includes('fetch')) {
		return 'medium';
	}

	// DOM errors are usually low severity
	if (error instanceof DOMException) {
		return 'low';
	}

	// Syntax errors are critical
	if (error instanceof SyntaxError) {
		return 'critical';
	}

	// Default to medium
	return 'medium';
}

/**
 * Determine if an error is recoverable
 */
function isRecoverable(error?: unknown): boolean {
	if (!error) return true;

	// Network errors are usually recoverable
	if (error instanceof TypeError && error.message.includes('fetch')) {
		return true;
	}

	// DOM errors are usually recoverable
	if (error instanceof DOMException) {
		return true;
	}

	// Syntax errors are not recoverable
	if (error instanceof SyntaxError) {
		return false;
	}

	// Default to recoverable
	return true;
}

/**
 * Log error with consistent formatting
 */
function logError(error: AppError, additionalContext?: Record<string, unknown>): void {
	const logData = {
		message: error.message,
		stack: error.stack,
		context: error.context,
		severity: error.severity,
		recoverable: error.recoverable,
		...additionalContext
	};

	// Use console.error for all errors in development
	if (import.meta.env.DEV) {
		console.error('Application Error:', logData);
	} else {
		// In production, only log high/critical errors
		if (error.severity === 'high' || error.severity === 'critical') {
			console.error('Critical Error:', logData);
		} else {
			console.warn('Application Warning:', logData);
		}
	}

	// TODO: Send to error reporting service in production
	// if (import.meta.env.PROD) {
	//   sendToErrorService(logData);
	// }
}

/**
 * Handle async operations with error boundaries
 */
export async function withErrorHandling<T>(
	operation: () => Promise<T>,
	context?: Partial<ErrorContext>
): Promise<T | null> {
	try {
		return await operation();
	} catch (error) {
		const appError = createError(
			error instanceof Error ? error.message : 'Unknown error occurred',
			error,
			context
		);

		logError(appError);
		return null;
	}
}

/**
 * Handle synchronous operations with error boundaries
 */
function withErrorHandlingSync<T>(
	operation: () => T,
	context?: Partial<ErrorContext>
): T | null {
	try {
		return operation();
	} catch (error) {
		const appError = createError(
			error instanceof Error ? error.message : 'Unknown error occurred',
			error,
			context
		);

		logError(appError);
		return null;
	}
}

/**
 * Retry operation with exponential backoff
 */
async function withRetry<T>(
	operation: () => Promise<T>,
	maxRetries: number = 3,
	baseDelay: number = 1000,
	context?: Partial<ErrorContext>
): Promise<T | null> {
	let lastError: unknown;

	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		try {
			return await operation();
		} catch (error) {
			lastError = error;

			if (attempt === maxRetries) {
				break;
			}

			// Exponential backoff
			const delay = baseDelay * Math.pow(2, attempt);
			await new Promise(resolve => setTimeout(resolve, delay));
		}
	}

	// Log final error
	const appError = createError(
		lastError instanceof Error ? lastError.message : 'Operation failed after retries',
		lastError,
		{ ...context, action: 'retry' }
	);

	logError(appError);
	return null;
}

/**
 * Debounce error logging to prevent spam
 */
const errorLogCache = new Map<string, number>();
const ERROR_LOG_DEBOUNCE = 5000; // 5 seconds

export function logErrorDebounced(error: AppError, additionalContext?: Record<string, unknown>): void {
	const errorKey = `${error.message}-${error.context?.component || 'unknown'}`;
	const now = Date.now();
	const lastLogged = errorLogCache.get(errorKey);

	if (!lastLogged || now - lastLogged > ERROR_LOG_DEBOUNCE) {
		logError(error, additionalContext);
		errorLogCache.set(errorKey, now);
	}
}
