<script lang="ts">
	import { top, bottom, divider } from '$lib/utils/boxDrawing';
	import { alignToGrid, chToGridUnits } from '$lib/utils/grid';

	const LINE_HEIGHT = 1.2;
	type BoxVariant = 'default' | 'primary' | 'secondary';

	let {
		title,
		width = 80,
		color = 'var(--box-border)',
		variant = 'default',
		children,
		padding = 2
	} = $props<{
		title?: string;
		width?: number;
		color?: string;
		variant?: BoxVariant;
		children?: () => any;
		padding?: number;
	}>();

	let alignedWidth = $derived(alignToGrid(width));
	let paddingInCh = $derived(chToGridUnits(padding));

	function padContent(text: string): string {
		const paddingWidth = Math.max(0, alignedWidth - text.length - 2);
		return `│${text}${' '.repeat(paddingWidth)}│`;
	}
</script>

<div 
	class="box"
	style="
		--box-width: {alignedWidth}ch; 
		--box-padding: {paddingInCh};
		--box-color: {color};
		--box-line-height: {LINE_HEIGHT};
	"
	data-variant={variant}
>
	<div class="box-frame">
		<div class="border-line">{top({ width: alignedWidth })}</div>

		{#if title}
			<div class="border-line">{padContent(title)}</div>
			<div class="border-line">{divider({ width: alignedWidth })}</div>
		{/if}

		<div class="content">
			<div class="content-inner">
				{@render children?.()}
			</div>
		</div>

		<div class="border-line">{bottom({ width: alignedWidth })}</div>
	</div>
</div>

<style>
	.box {
		width: var(--box-width);
		font-family: var(--font-mono);
		line-height: var(--box-line-height);
		margin: 0 auto;
		container-type: inline-size;
	}

	.box-frame {
		display: flex;
		flex-direction: column;
		white-space: pre;
		color: var(--box-color);
		
		& .border-line {
			white-space: pre;
			line-height: var(--box-line-height);
			height: calc(1em * var(--box-line-height));
			display: flex;
			align-items: center;
		}
	}

	.content {
		padding-inline: var(--box-padding);
		min-height: calc(1em * var(--box-line-height));
		position: relative;
		
		&::before,
		&::after {
				content: '│';
				position: absolute;
				inset-block: 0;
				line-height: var(--box-line-height);
				display: flex;
				align-items: stretch;
				white-space: pre;
				color: var(--box-color);
			}
		
		&::before { inset-inline-start: 0; }
		&::after { inset-inline-end: 0; }
	}

	:where(.content > *) {
		margin: 0;
		padding: 0;
		line-height: var(--box-line-height);
	}

	@container (max-width: 40ch) {
		.content {
			padding-inline: var(--grid-base);
		}
	}
</style>
