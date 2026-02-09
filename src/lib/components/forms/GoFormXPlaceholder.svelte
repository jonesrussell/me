<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		variant?: 'inline' | 'section';
		class?: string;
	}

	let {
		title = '',
		description = '',
		variant = 'section',
		class: className = ''
	}: Props = $props();

	const CORE_HEADING = 'GoFormX (Coming Soon)';
	const CORE_SUBLINE = 'A unified form engine for all my sites.';
	const TAGLINE = 'forms, but programmable';
	const GOFORMX_URL = 'https://goformx.com/';

	const wrapperClass = $derived(
		['placeholder', variant === 'inline' && 'inline', variant === 'section' && 'section', className]
			.filter(Boolean)
			.join(' ')
			.trim()
	);
</script>

<div class={wrapperClass} data-goformx-placeholder>
	{#if title}
		<h2 class="placeholder-title">{title}</h2>
	{/if}
	{#if description}
		<p class="placeholder-description">{description}</p>
	{/if}

	<div class="placeholder-core">
		<p class="core-heading">{CORE_HEADING}</p>
		<p class="core-subline">{CORE_SUBLINE}</p>
		<p class="tagline">{TAGLINE}</p>
		<a
			href={GOFORMX_URL}
			target="_blank"
			rel="noopener noreferrer"
			class="placeholder-link"
		>
			Launching soon →
		</a>
	</div>
</div>

<style>
	.placeholder {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
		padding: var(--space-6);
		background: var(--color-mix-faint);
		border: 1px solid var(--accent-color);
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
		text-align: center;
	}

	.placeholder.section {
		padding: var(--space-8);
		gap: var(--space-6);
	}

	.placeholder.inline {
		padding: var(--space-4);
		gap: var(--space-3);
	}

	.placeholder-title {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
		line-height: var(--line-height-tight);
	}

	.placeholder-description {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		line-height: var(--line-height-base);
	}

	.placeholder-core {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		align-items: center;
	}

	.core-heading {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--accent-color);
		line-height: var(--line-height-tight);
	}

	.core-subline {
		margin: 0;
		font-size: var(--font-size-base);
		color: var(--text-muted);
		line-height: var(--line-height-base);
	}

	.tagline {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		font-style: italic;
		line-height: var(--line-height-base);
	}

	.placeholder-link {
		display: inline-block;
		margin-block-start: var(--space-2);
		padding: var(--space-2) var(--space-4);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--accent-color);
		text-decoration: none;
		border: 1px solid var(--accent-color);
		border-radius: var(--radius-sm);
		transition: color var(--transition-base), background-color var(--transition-base),
			border-color var(--transition-base);
	}

	.placeholder-link:hover {
		color: var(--text-color);
		background-color: var(--accent-color);
		border-color: var(--accent-color);
	}

	@media (prefers-reduced-motion: reduce) {
		.placeholder-link {
			transition: none;
		}
	}
</style>
