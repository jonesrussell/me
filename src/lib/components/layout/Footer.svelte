<script lang="ts">
	import { resolve } from '$app/paths';
	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="site-container footer-content">
		<div>
			<a class="wordmark" href={resolve('/')}>russell jones<span>.</span></a>
			<p>© {year} Russell Jones</p>
		</div>
		<nav aria-label="Footer navigation">
			<a href="mailto:russell@web.ca">Email</a>
			<a href="https://github.com/jonesrussell">GitHub</a>
			<a href="https://linkedin.com/in/jonesrussell42">LinkedIn</a>
			<a href={resolve('/resources')}>Resources</a>
			<a href="https://github.com/jonesrussell/me">Site source</a>
		</nav>
	</div>
</footer>
