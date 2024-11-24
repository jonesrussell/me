<script lang="ts">
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

<svelte:head>
	<title>Newsletter | Russell Jones</title>
	<meta name="description" content="Sign up for my newsletter" />
</svelte:head>

<section>
	<h1>Newsletter</h1>

	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		<div>
			<label for="email" class="mb-2 block text-sm font-bold">Email:</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				required
				class="w-full border border-gray-600 px-3 py-2 text-sm leading-tight focus:outline-none"
			/>
		</div>
		<div>
			<label for="name" class="mb-2 block text-sm font-bold">Name:</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				required
				class="w-full border border-gray-600 px-3 py-2 text-sm leading-tight focus:outline-none"
			/>
		</div>
		<button
			type="submit"
			class="w-full bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
		>
			Sign Up
		</button>
	</form>
</section>
