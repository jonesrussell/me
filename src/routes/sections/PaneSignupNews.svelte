<script lang="ts">
	import Pane from '../../components/Pane/Pane.svelte';

	export let x: number;
	export let y: number;
	export let id: string;
	export let zIndex: number;

	let email = '';
	let name = '';

	function handleSubmit() {
		console.log('Email:', email);
		console.log('Name:', name);
	}

	export let onBringToFront = () => {};
</script>

<Pane title="Newsletter" {id} {x} {y} {zIndex} {onBringToFront}>
	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		<div>
			<label for="email" class="mb-2 block text-sm font-bold text-gray-700">Email:</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				required
				class="focus:shadow-outline-blue w-full border border-gray-600 px-3 py-2 text-sm leading-tight text-gray-700 shadow-none focus:outline-none"
			/>
		</div>
		<div>
			<label for="name" class="mb-2 block text-sm font-bold text-gray-700">Name:</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				required
				class="focus:shadow-outline-blue w-full border border-gray-600 px-3 py-2 text-sm leading-tight text-gray-700 shadow-none focus:outline-none"
			/>
		</div>
		<button
			type="submit"
			class="focus:shadow-outline-blue full w-full bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
		>
			Sign Up
		</button>
	</form>
</Pane>
