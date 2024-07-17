<script>
	import '../app.css';
	import { page } from '$app/stores';
	import logo from '$lib/images/rej-logo.png';
	import blogIcon from '$lib/images/blog-icon.png';
	import github from '$lib/images/github.svg';
	import { base } from '$app/paths';
</script>

<nav class="flex max-w-[10rem] flex-col items-center p-4">
	<ul class="list-none space-y-4">
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a href="{base}/" class="flex flex-col items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-10 w-10"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1h3a1 1 0 100-2h-3a1 1 0 011-1z"
					/>
				</svg>
				<span>Home</span>
			</a>
		</li>
		<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
			<a href="{base}/about" class="flex flex-col items-center">
				<img src={logo} alt="Logo" title="Home" class="h-10 w-10" />
				<span>About</span>
			</a>
		</li>
		<li aria-current={$page.url.pathname === '/blog' ? 'page' : undefined}>
			<a href="{base}/blog" class="flex flex-col items-center">
				<img src={blogIcon} alt="Blog icon" title="Blog" class="h-10 w-10" />
				<span>Blog</span>
			</a>
		</li>
		<li>
			<a
				href="https://github.com/jonesrussell"
				target="_blank"
				rel="noopener"
				class="flex flex-col items-center"
			>
				<img src={github} alt="GitHub" class="h-10 w-10" />
				<span>GitHub</span>
			</a>
		</li>
	</ul>
</nav>
