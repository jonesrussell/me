<script lang="ts">
	import { onMount } from 'svelte';

	let debugInfo = $state({
		tagName: '',
		classes: '',
		id: '',
		computedStyles: {} as CSSStyleDeclaration,
		attributes: {} as NamedNodeMap
	});

	let isVisible = $state(true);

	onMount(() => {
		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target || target.classList.contains('debug-panel')) return;

			debugInfo = {
				tagName: target.tagName.toLowerCase(),
				classes: Array.from(target.classList).join(' '),
				id: target.id,
				computedStyles: window.getComputedStyle(target),
				attributes: target.attributes
			};
		};

		document.addEventListener('mouseover', handleMouseOver);
		return () => document.removeEventListener('mouseover', handleMouseOver);
	});

	function toggleVisibility() {
		isVisible = !isVisible;
	}
</script>

<div class="debug-panel" class:visible={isVisible}>
	<div class="debug-header">
		<h3>Debug Info</h3>
		<button onclick={toggleVisibility}>
			{isVisible ? '−' : '+'}
		</button>
	</div>

	{#if isVisible}
		<div class="debug-content">
			<div class="section">
				<h4>Element</h4>
				<p>Tag: <code>{debugInfo.tagName || '−'}</code></p>
				<p>Classes: <code>{debugInfo.classes || '−'}</code></p>
				<p>ID: <code>{debugInfo.id || '−'}</code></p>
			</div>

			<div class="section">
				<h4>Computed Styles</h4>
				{#if debugInfo.computedStyles}
					<div class="scroll-container">
						{#each ['width', 'height', 'padding', 'margin', 'color', 'background-color', 'font-size', 'display', 'position'] as prop}
							<p>
								{prop}:
								<code>{debugInfo.computedStyles[prop as any] || '−'}</code>
							</p>
						{/each}
					</div>
				{/if}
			</div>

			<div class="section">
				<h4>Attributes</h4>
				{#if debugInfo.attributes}
					<div class="scroll-container">
						{#each Array.from(debugInfo.attributes) as attr}
							<p>{attr.name}: <code>{attr.value || '−'}</code></p>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.debug-panel {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		background: var(--bg-darker);
		border: 2px solid var(--accent-color);
		border-radius: var(--radius-md);
		width: 600px;
		font-size: 1rem;
		font-family: var(--font-mono);
		box-shadow: var(--shadow-lg);
		z-index: 9999;
		opacity: 0.98;
		transition: all 0.2s ease;
	}

	.debug-panel:hover {
		border-color: var(--accent-color-hover);
		box-shadow: 0 0 0 4px var(--accent-color-transparent);
	}

	.debug-panel:not(.visible) {
		transform: translateY(calc(100% - 3rem));
	}

	.debug-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: var(--accent-color-transparent);
		border-bottom: 2px solid var(--accent-color);
		border-radius: var(--radius-md) var(--radius-md) 0 0;
	}

	.debug-header h3 {
		margin: 0;
		font-size: 1.2rem;
		font-weight: bold;
		color: var(--accent-color);
	}

	.debug-header button {
		background: none;
		border: none;
		color: var(--accent-color);
		cursor: pointer;
		font-size: 1.5rem;
		padding: 0 0.5rem;
		transition: color 0.2s ease;
	}

	.debug-header button:hover {
		color: var(--accent-color-hover);
	}

	.debug-content {
		padding: 1rem;
		max-height: 600px;
		overflow-y: auto;
	}

	.section {
		margin-bottom: 1.5rem;
		padding: 1rem;
		background: var(--bg-alt);
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-color);
	}

	.section:last-child {
		margin-bottom: 0;
	}

	.section h4 {
		margin: 0 0 1rem 0;
		font-size: 1rem;
		color: var(--accent-color);
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 0.5rem;
	}

	.scroll-container {
		max-height: 200px;
		overflow-y: auto;
		padding-right: 0.5rem;
	}

	p {
		margin: 0.5rem 0;
		line-height: 1.5;
		display: flex;
		justify-content: space-between;
		gap: 1.5rem;
	}

	code {
		color: var(--accent-color);
		background: var(--bg-darker);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
		word-break: break-all;
		border: 1px solid var(--border-color);
	}
</style>
