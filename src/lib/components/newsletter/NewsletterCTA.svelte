<!-- NewsletterCTA.svelte -->
<script lang="ts">
	import ErrorBoundary from '../ErrorBoundary.svelte';
	import NewsletterHeader from './NewsletterHeader.svelte';
	import NewsletterForm from './NewsletterForm.svelte';
	import SchemaError from './SchemaError.svelte';
	import { useNewsletterForm } from '$lib/components/composables/useNewsletterForm.svelte';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const form = useNewsletterForm();
</script>

<style>
	@keyframes pulse {
		0% {
			opacity: 0.05;
			transform: scale(0.8);
		}

		50% {
			opacity: 0.1;
			transform: scale(1.4);
		}

		100% {
			opacity: 0.05;
			transform: scale(0.8);
		}
	}

	/* Responsive design */
	@media (--container-sm) {
		.newsletter {
			padding: var(--space-8);
		}
	}

	@media (--container-lg) {
		.newsletter {
			padding: var(--space-12);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.newsletter::before,
		.newsletter::after {
			animation: none;
		}
	}

	.newsletter {
		display: flex;
		position: relative;
		width: 100%;
		padding: var(--space-16);
		background: var(--color-mix-light);
		flex-direction: column;
		gap: var(--space-4);
		align-items: center;
		overflow: hidden;
	}

	.newsletter-content {
		display: flex;
		position: relative;
		width: 100%;
		margin: 0 auto;
		z-index: 1;
		flex-direction: column;
		gap: var(--space-4);
		max-width: 60rem;
	}

	.newsletter-content-contained {
		max-width: var(--measure);
		margin-inline: auto;
		padding-inline: var(--space-4);
	}

	.newsletter-inner {
		max-width: var(--container-sm);
		margin-inline: auto;
		width: 100%;
	}

	/* Background animations */
	.newsletter::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, var(--accent-color) 0%, transparent 70%);
		opacity: 0.08;
		z-index: 0;
		animation: pulse 4s ease-in-out infinite;
	}

	.newsletter::after {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, var(--accent-color) 0%, transparent 70%);
		opacity: 0.05;
		z-index: 0;
		animation: pulse 4s ease-in-out infinite;
		animation-delay: 2s;
	}
</style>

<ErrorBoundary fallback="Newsletter temporarily unavailable" component="NewsletterCTA">
	<div class={className}>
		<div class="newsletter">
			<div class="newsletter-content newsletter-content-contained">
				<div class="newsletter-inner">
					<NewsletterHeader
						title="Stay Updated"
						description="Subscribe to my newsletter for updates on web development, tech insights, and open source projects."
					/>
				</div>

				{#if form.schemaError.value}
					<SchemaError onRetry={form.handleRetry} />
				{/if}

				<div class="newsletter-inner">
					<NewsletterForm
						email={form.email.value}
						submitStatus={form.submitStatus.value}
						errorMessage={form.errorMessage.value}
						isSubmitDisabled={form.isSubmitDisabled.value}
						onSubmit={form.handleSubmit}
						onEmailInput={form.handleEmailInput}
					/>
				</div>
			</div>
		</div>
	</div>
</ErrorBoundary>
