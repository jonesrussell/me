<script lang="ts">
	import { blogErrors } from '$lib/services/blog-service';
	import type { BlogError } from '$lib/types/blog';
	import Box from '$lib/components/ui/Box.svelte';

	const formatErrorType = (type: BlogError['type']): string => {
		switch (type) {
			case 'FETCH_ERROR':
				return 'Network Error';
			case 'PARSE_ERROR':
				return 'Data Error';
			case 'VALIDATION_ERROR':
				return 'Validation Error';
			case 'CACHE_ERROR':
				return 'Cache Error';
			default:
				return 'Unknown Error';
		}
	};

	const formatTimestamp = (timestamp: number): string => {
		return new Date(timestamp).toLocaleString();
	};
</script>

<style>
	@layer components {
		.error {
			display: grid;
			gap: var(--space-4);
			padding: var(--space-4);
			background: var(--bg-darker);
			border-radius: var(--radius-md);
			border-left: 4px solid var(--error-color);
		}

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.type {
			font-family: var(--font-mono);
			font-size: var(--font-size-sm);
			color: var(--error-color);
		}

		.timestamp {
			font-size: var(--font-size-sm);
			color: var(--text-muted);
		}

		.message {
			margin: 0;
			font-size: var(--font-size-base);
			color: var(--text-color);
		}

		.details {
			margin: 0;
			font-family: var(--font-mono);
			font-size: var(--font-size-sm);
			color: var(--text-muted);
			white-space: pre-wrap;
		}
	}
</style>

{#if $blogErrors.length > 0}
	<Box width={80}>
		{#each $blogErrors as error (error.timestamp)}
			<div class="error" role="alert">
				<div class="header">
					<span class="type">{formatErrorType(error.type)}</span>
					<span class="timestamp">{formatTimestamp(error.timestamp)}</span>
				</div>
				<p class="message">{error.message}</p>
				{#if error.details}
					<pre class="details">{JSON.stringify(error.details, null, 2)}</pre>
				{/if}
			</div>
		{/each}
	</Box>
{/if}
