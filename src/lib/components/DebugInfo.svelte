<script lang="ts">
	import { onMount } from 'svelte';

	let debugInfo = $state({
		tagName: '',
		classes: '',
		id: '',
		computedStyles: {} as CSSStyleDeclaration,
		attributes: {} as NamedNodeMap
	});

	let isVisible = $state(false);
	let isPanelVisible = $state(false);
	let isLocked = $state(false);
	let selectedElement: HTMLElement | null = $state(null);
	let highlightOverlay: HTMLElement | null = null;

	function updateHighlight(element: HTMLElement | null) {
		if (!highlightOverlay) {
			highlightOverlay = document.createElement('div');
			highlightOverlay.className = 'debug-highlight';
			document.body.appendChild(highlightOverlay);
		}

		if (element && isLocked) {
			const rect = element.getBoundingClientRect();
			highlightOverlay.style.display = 'block';
			highlightOverlay.style.top = `${rect.top + window.scrollY}px`;
			highlightOverlay.style.left = `${rect.left + window.scrollX}px`;
			highlightOverlay.style.width = `${rect.width}px`;
			highlightOverlay.style.height = `${rect.height}px`;
		} else {
			highlightOverlay.style.display = 'none';
		}
	}

	onMount(() => {
		const handleMouseOver = (e: MouseEvent) => {
			if (isLocked || !isPanelVisible) return;
			const target = e.target as HTMLElement;
			if (
				!target ||
				target.classList.contains('debug-panel') ||
				target.classList.contains('debug-highlight')
			)
				return;

			debugInfo = {
				tagName: target.tagName.toLowerCase(),
				classes: Array.from(target.classList).join(' '),
				id: target.id,
				computedStyles: window.getComputedStyle(target),
				attributes: target.attributes
			};
		};

		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				target.classList.contains('debug-panel') ||
				target.classList.contains('debug-highlight')
			)
				return;

			if (!isLocked) {
				isLocked = true;
				selectedElement = target;
				debugInfo = {
					tagName: target.tagName.toLowerCase(),
					classes: Array.from(target.classList).join(' '),
					id: target.id,
					computedStyles: window.getComputedStyle(target),
					attributes: target.attributes
				};
			} else {
				isLocked = false;
				selectedElement = null;
			}
			updateHighlight(selectedElement);
		};

		document.addEventListener('mouseover', handleMouseOver);
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('mouseover', handleMouseOver);
			document.removeEventListener('click', handleClick);
			if (highlightOverlay) {
				document.body.removeChild(highlightOverlay);
			}
		};
	});

	function toggleVisibility() {
		isVisible = !isVisible;
	}

	function togglePanel() {
		isPanelVisible = !isPanelVisible;
		if (!isPanelVisible) {
			isLocked = false;
			selectedElement = null;
			updateHighlight(null);
		}
	}

	function unlock() {
		isLocked = false;
		selectedElement = null;
		updateHighlight(null);
	}
</script>

{#if !isPanelVisible}
	<button class="debug-icon" onclick={togglePanel} title="Show Debug Panel">
		🔍
	</button>
{:else}
	<div class="debug-panel" class:visible={isVisible}>
		<div class="debug-header">
			<h3>
				Debug Info {#if isLocked}<span class="locked">🔒</span>{/if}
			</h3>
			<div class="header-controls">
				{#if isLocked}
					<button class="unlock-btn" onclick={unlock} title="Unlock element">
						🔓
					</button>
				{/if}
				<button onclick={toggleVisibility}>
					{isVisible ? '−' : '+'}
				</button>
				<button
					class="close-btn"
					onclick={togglePanel}
					title="Close Debug Panel"
				>
					×
				</button>
			</div>
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
{/if}

<style>
	.debug-icon {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		background: var(--bg-darker);
		border: 2px solid var(--accent-color);
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 9999;
		transition: all 0.2s ease;
		padding: 0;
		box-shadow: var(--shadow-lg);
	}

	.debug-icon:hover {
		border-color: var(--accent-color-hover);
		box-shadow: 0 0 0 4px var(--accent-color-transparent);
		transform: scale(1.1);
	}

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

	.header-controls {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.debug-header h3 {
		margin: 0;
		font-size: 1.2rem;
		font-weight: bold;
		color: var(--accent-color);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.locked {
		color: var(--text-color);
		font-size: 1rem;
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

	.unlock-btn {
		font-size: 1.2rem !important;
	}

	.close-btn {
		font-size: 2rem !important;
		line-height: 1;
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

	:global(.debug-highlight) {
		position: absolute;
		pointer-events: none;
		border: 2px solid var(--accent-color);
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--accent-color) 10%, transparent);
		z-index: 9998;
		transition: all 0.2s ease;
	}
</style>
