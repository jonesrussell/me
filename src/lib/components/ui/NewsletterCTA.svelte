<script lang="ts">
	import ErrorBoundary from './ErrorBoundary.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Box from '$lib/components/layout/Box.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		submit: { email: string };
	}>();

	let email = '';
	let isSubmitting = false;
	let error: string | null = null;

	async function handleSubmit() {
		if (!email) return;
		isSubmitting = true;
		error = null;

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			dispatch('submit', { email });
			email = '';
		} catch (e) {
			error = e instanceof Error ? e.message : 'An error occurred';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<style>
	.newsletter-cta {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
	}

	.form-group {
		display: flex;
		gap: var(--space-2);
	}

	@media (max-width: 768px) {
		.form-group {
			flex-direction: column;
		}
	}
</style>

<Box width={40}>
	<div class="newsletter-cta">
		<h2>Subscribe to our newsletter</h2>
		<p>Get the latest updates and news delivered to your inbox.</p>
		<ErrorBoundary>
			<form class="form-group" on:submit|preventDefault={handleSubmit}>
				<Input
					type="email"
					placeholder="Enter your email"
					bind:value={email}
					disabled={isSubmitting}
				/>
				<Button type="submit" disabled={!email || isSubmitting}>
					{isSubmitting ? 'Subscribing...' : 'Subscribe'}
				</Button>
			</form>
		</ErrorBoundary>
	</div>
</Box>
