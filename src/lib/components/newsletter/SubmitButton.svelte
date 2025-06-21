<script lang="ts">
	import type { SubmitStatus } from '$lib/types/newsletter';

	interface Props {
		submitStatus: SubmitStatus;
		disabled: boolean;
		ariaDescribedby?: string;
	}

	let { submitStatus, disabled, ariaDescribedby }: Props = $props();
</script>

<style>
	button {
		padding: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		color: var(--bg-darker);
		background: var(--accent-color);
		border: var(--border-width) solid var(--accent-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		cursor: pointer;
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}

	button:hover:not(:disabled) {
		background: var(--accent-color-hover);
		transform: translateY(-0.25rem);
		border-color: var(--accent-color-hover);
	}

	.button-content {
		display: flex;
		gap: var(--space-4);
		align-items: center;
		justify-content: center;
	}

	.button-icon {
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
	}

	.loading {
		display: flex;
		gap: var(--space-2);
		align-items: center;
		justify-content: center;
	}

	.dots {
		display: flex;
		gap: var(--space-1);
	}

	.dot {
		opacity: 0.3;
		animation: dot-pulse 1.4s infinite;
	}

	.dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes dot-pulse {
		0% {
			opacity: 0.3;
			transform: scale(1);
		}

		50% {
			opacity: 1;
			transform: scale(1.2);
		}

		100% {
			opacity: 0.3;
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}

		.dot {
			animation: none;
		}
	}
</style>

<button type="submit" {disabled} aria-describedby={ariaDescribedby}>
	{#if submitStatus === 'loading'}
		<div class="loading">
			<span>Subscribing</span>
			<div class="dots">
				<span class="dot">.</span>
				<span class="dot">.</span>
				<span class="dot">.</span>
			</div>
		</div>
	{:else}
		<div class="button-content">
			<span>Subscribe</span>
			<span class="button-icon">→</span>
		</div>
	{/if}
</button>
