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
		container-type: inline-size;
		padding: var(--space-8) 0;
		border-top: 1px solid var(--border-color);
		font-size: var(--font-size-sm);
		text-align: center;
		background: var(--bg-darker);
	}

	.container {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		padding-inline: var(--space-4);
	}

	@container (width < 40ch) {
		.container {
			padding-inline: var(--space-4);
		}

		p {
			display: flex;
			flex-direction: column;
			gap: var(--space-2);
		}
	}

	@container (width >= 40ch) {
		.container {
			padding-inline: var(--space-8);
		}
	}

	a {
		text-decoration: none;
		color: var(--text-color);
		transition: color var(--transition-duration) var(--transition-timing);
	}

	a:hover {
		color: var(--accent-color);
	}

	@media (prefers-reduced-motion: reduce) {
		a {
			transition: none;
		}
	}
</style>
