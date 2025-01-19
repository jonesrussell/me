<footer class="footer">
	<div class="container">
		<p>
			&copy; {new Date().getFullYear()} Russell Jones |
			<a
				href="https://github.com/jonesrussell/me"
				target="_blank"
				rel="noopener noreferrer"
			>
				Source Code
			</a>
			| Licensed under
			<a
				href="https://github.com/jonesrussell/me/blob/main/LICENSE"
				target="_blank"
				rel="noopener noreferrer"
			>
				MIT
			</a>
		</p>
	</div>
</footer>

<style>
	.footer {
		padding: var(--ch2) 0;
		font-size: 0.875rem;
		text-align: center;
		border-top: calc(1 * var(--ch) / 16) solid var(--border-color);
	}

	.container {
		width: 100%;
		max-width: min(var(--measure), 100%);
		margin: 0 auto;
		padding: 0 var(--content-padding);
		box-sizing: border-box;
	}
</style>
