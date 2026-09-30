<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { base, resolve } from '$app/paths';
	const { url } = $props<{ url: URL }>();
	let isOpen = $state(false);
	let toggle: HTMLButtonElement;
	const links = [
		{ path: '/projects', label: 'Work' },
		{ path: '/services', label: 'Services' },
		{ path: '/blog', label: 'Writing' },
		{ path: '/about', label: 'About' },
		{ path: '/contact', label: 'Contact' }
	] as const;
	const currentPath = $derived(url.pathname.slice(base.length));
	afterNavigate(() => {
		isOpen = false;
	});
	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			isOpen = false;
			toggle?.focus();
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />
<header class="site-header">
	<div class="site-container header-content">
		<a class="wordmark" href={resolve('/')} aria-label="Russell Jones, home"
			>russell jones<span>.</span></a
		>
		<button
			{@attach (element) => {
				toggle = element;
			}}
			class="menu-toggle"
			type="button"
			aria-controls="site-navigation"
			aria-expanded={isOpen}
			onclick={() => {
				isOpen = !isOpen;
			}}>Menu <span aria-hidden="true">{isOpen ? '−' : '+'}</span></button
		>
		<nav id="site-navigation" class:open={isOpen} class="desktop-nav" aria-label="Main navigation">
			{#each links as link (link.path)}
				<a
					class:nav-contact={link.path === '/contact'}
					href={resolve(link.path)}
					aria-current={currentPath === link.path || currentPath.startsWith(`${link.path}/`)
						? 'page'
						: undefined}
					onclick={() => {
						isOpen = false;
					}}>{link.label}</a
				>
			{/each}
		</nav>
	</div>
</header>
