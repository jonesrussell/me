<script lang="ts">
	export let title: string = '';

	function closePane() {
		console.log('Close pane');
	}
</script>

<header class="header">
	<button on:click={closePane}>×</button>
	<h2>{title}</h2>
	<div class="spacer"></div>
</header>

<style>
	.header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.5rem;
		background: #000;
		color: #fff;
	}

	button {
		font-family: var(--font-mono);
		background: none;
		border: 1px solid #fff;
		color: #fff;
		width: 1.5rem;
		height: 1.5rem;
		cursor: pointer;
	}

	h2 {
		margin: 0;
		font-size: 1rem;
		font-weight: normal;
	}

	.spacer {
		flex: 1;
	}
</style>
