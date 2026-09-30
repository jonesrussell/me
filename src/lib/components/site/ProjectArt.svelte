<script lang="ts">
	const { variant = 0 } = $props<{ variant?: number }>();
	const lines = Array.from({ length: 9 }, (_, i) => i);
</script>

<svg class="project-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
	<path class="art-guide" d="M70 90v235M200 25v350M330 90v235"></path>
	{#each [0, 1, 2] as layer (layer)}
		<g transform={`translate(0 ${layer * 85})`}>
			<path class="art-edge" d="M50 100 200 30 350 100 200 170Z"></path>
			{#each lines as line (line)}
				<path
					class="art-grid"
					d={`M${65 + line * 15} ${107 + line * 7} L${215 + line * 15} ${37 + line * 7}`}
				></path>
				<path
					class="art-grid"
					d={`M${65 + line * 15} ${93 - line * 7} L${215 + line * 15} ${163 - line * 7}`}
				></path>
			{/each}
		</g>
	{/each}
	{#each lines as line (line)}
		<path
			class="art-wave"
			d={`M70 ${193 + line * 5} C130 ${125 + line * 6 + variant * 8} 160 ${275 - line * 5} 225 ${178 + line * 5} S300 ${190 + line * 3} 330 ${190 + line * 5}`}
		></path>
	{/each}
	<path class="art-edge" d="M50 100v170M350 100v170M200 170v170" opacity="0.5"></path>
</svg>
