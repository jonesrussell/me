<script>
	import '../app.css';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import blogIcon from '$lib/images/blog-icon.png';
	import github from '$lib/images/github.svg';
	import logo from '$lib/images/rej-logo.png';
</script>

<nav class="nav-bar">
	<ul class="nav-list">
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a href="{base}/" class="nav-link">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="nav-icon"
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
			<a href="{base}/about" class="nav-link">
				<img src={logo} alt="Logo" title="Home" class="nav-icon" />
				<span>About</span>
			</a>
		</li>
		<li aria-current={$page.url.pathname === '/blog' ? 'page' : undefined}>
			<a href="{base}/blog" class="nav-link">
				<img src={blogIcon} alt="Blog icon" title="Blog" class="nav-icon" />
				<span>Blog</span>
			</a>
		</li>
		<li>
			<a
				href="https://github.com/jonesrussell"
				target="_blank"
				rel="noopener"
				class="nav-link"
			>
				<img src={github} alt="GitHub" class="nav-icon" />
				<span>GitHub</span>
			</a>
		</li>
	</ul>
</nav>

<style>
	.nav-bar {
		max-width: 20ch;
		padding: var(--ch4);
	}

	.nav-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--ch4);
	}

	.nav-link {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--ch);
		text-decoration: none;
	}

	.nav-icon {
		height: 10ch;
		width: 10ch;
	}

	[aria-current='page'] .nav-link {
		color: var(--link-color);
	}
</style>
