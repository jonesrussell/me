<script lang="ts">
	import { resolve } from '$app/paths';

	const capabilities = [
		{
			number: '01',
			title: 'Content platforms',
			description:
				'Publishing infrastructure, structured content, search, and workflows designed for long-term ownership.'
		},
		{
			number: '02',
			title: 'Application architecture',
			description:
				'Laravel and Drupal systems shaped into maintainable products, from first decisions through modernization.'
		},
		{
			number: '03',
			title: 'AI-native operations',
			description:
				'Practical agent workflows and structured tools that extend a team without surrendering control of its data.'
		}
	];

	const ecosystem = [
		{
			name: 'Waaseyaa',
			kind: 'Open-source framework',
			description:
				'An entity-first, AI-native PHP framework for content management and data-driven applications.',
			href: 'https://waaseyaa.org',
			label: 'Explore the framework'
		},
		{
			name: 'Anokii',
			kind: 'Flagship distribution',
			description:
				'A sovereign workspace for First Nations, built on Waaseyaa and designed around ownership by architecture.',
			href: 'https://github.com/waaseyaa/anokii',
			label: 'Follow its development'
		},
		{
			name: 'North Cloud',
			kind: 'Content infrastructure',
			description:
				'A distributed pipeline that crawls, classifies, and publishes structured news across focused products.',
			href: 'https://northcloud.biz',
			label: 'See the platform'
		}
	];

	const proof = [
		{ value: '62+', label: 'Waaseyaa packages' },
		{ value: '3', label: 'architectural layers of work' },
		{ value: 'Open', label: 'source by default' }
	];
</script>

<svelte:head>
	<title>Russell Jones | Founder & Software Architect</title>
	<meta
		name="description"
		content="Russell Jones builds sovereign, AI-native content and operations platforms with Laravel, Drupal, and modern PHP. Creator of Waaseyaa and Anokii."
	/>
	<meta property="og:title" content="Russell Jones | Founder & Software Architect" />
	<meta
		property="og:description"
		content="Building sovereign, AI-native content and operations platforms."
	/>
	<meta property="og:image" content="https://jonesrussell.github.io/me/og.png" />
	<meta property="og:image:width" content="1672" />
	<meta property="og:image:height" content="941" />
	<meta property="og:image:alt" content="Russell Jones — Founder & Software Architect" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Russell Jones | Founder & Software Architect" />
	<meta
		name="twitter:description"
		content="Digital infrastructure that stays in your hands."
	/>
	<meta name="twitter:image" content="https://jonesrussell.github.io/me/og.png" />
</svelte:head>

<div class="landing">
	<section class="hero" aria-labelledby="hero-title">
		<div class="hero-grid">
			<div class="hero-copy">
				<p class="eyebrow">Founder · Software architect · Open-source builder</p>
				<h1 id="hero-title">Digital infrastructure that stays in your hands.</h1>
				<p class="hero-lede">
					I build sovereign, AI-native content and operations platforms with Laravel, Drupal,
					and modern PHP. I’m the creator of Waaseyaa and Anokii.
				</p>
				<div class="hero-actions">
					<a class="button button-primary" href="https://waaseyaa.org">Explore Waaseyaa</a>
					<a class="button button-secondary" href={resolve('/contact')}>Work with me</a>
				</div>
			</div>

			<div class="system-map" aria-label="Russell Jones ecosystem">
				<div class="map-orbit map-orbit-one"></div>
				<div class="map-orbit map-orbit-two"></div>
				<div class="map-core">
					<span>Russell Jones</span>
					<strong>Systems with agency</strong>
				</div>
				<a class="map-node node-framework" href="https://waaseyaa.org">
					<span>Framework</span>
					<strong>Waaseyaa</strong>
				</a>
				<a class="map-node node-product" href="https://github.com/waaseyaa/anokii">
					<span>Distribution</span>
					<strong>Anokii</strong>
				</a>
				<a class="map-node node-platform" href="https://northcloud.biz">
					<span>Infrastructure</span>
					<strong>North Cloud</strong>
				</a>
			</div>
		</div>

		<div class="proof-strip" aria-label="Selected facts">
			{#each proof as item (item.label)}
				<div class="proof-item">
					<strong>{item.value}</strong>
					<span>{item.label}</span>
				</div>
			{/each}
		</div>
	</section>

	<section class="section thesis" aria-labelledby="thesis-title">
		<div class="section-intro">
			<p class="eyebrow">A different kind of software practice</p>
			<h2 id="thesis-title">Build for ownership, not dependency.</h2>
		</div>
		<div class="thesis-copy">
			<p>
				The systems that hold a community’s knowledge or run an organization’s work should be
				understandable, portable, and governed by the people who rely on them.
			</p>
			<p>
				That principle connects my client work in Laravel and Drupal with the open-source
				ecosystem I’m building around Waaseyaa.
			</p>
		</div>
	</section>

	<section class="section" aria-labelledby="capabilities-title">
		<div class="section-heading">
			<div>
				<p class="eyebrow">What I build</p>
				<h2 id="capabilities-title">Strategy through implementation.</h2>
			</div>
			<a class="text-link" href={resolve('/projects')}>View all work <span>↗</span></a>
		</div>
		<div class="capability-grid">
			{#each capabilities as capability (capability.title)}
				<article class="capability-card">
					<span class="card-number">{capability.number}</span>
					<h3>{capability.title}</h3>
					<p>{capability.description}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="section ecosystem" aria-labelledby="ecosystem-title">
		<div class="section-heading">
			<div>
				<p class="eyebrow">The ecosystem</p>
				<h2 id="ecosystem-title">Products that reinforce one another.</h2>
			</div>
			<p class="section-note">Framework · Distribution · Infrastructure</p>
		</div>
		<div class="ecosystem-list">
			{#each ecosystem as project, index (project.name)}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external project URL -->
				<a class="project-row" href={project.href}>
					<span class="project-index">0{index + 1}</span>
					<div class="project-name">
						<span>{project.kind}</span>
						<h3>{project.name}</h3>
					</div>
					<p>{project.description}</p>
					<span class="project-cta">{project.label} ↗</span>
				</a>
			{/each}
		</div>
	</section>

	<section class="section studio" aria-labelledby="studio-title">
		<div>
			<p class="eyebrow">The next chapter</p>
			<h2 id="studio-title">A product and systems studio for consequential work.</h2>
		</div>
		<div class="studio-copy">
			<p>
				I’m forming a studio to help publishers, communities, and mission-driven organizations
				build dependable software without giving away control of their technology or data.
			</p>
			<div class="studio-actions">
				<a class="button button-primary" href={resolve('/contact')}>Start a conversation</a>
				<a class="text-link" href={resolve('/blog')}>Read my thinking <span>↗</span></a>
			</div>
		</div>
	</section>
</div>

<style>
	/* stylelint-disable -- this editorial landing page uses a self-contained fluid layout */
	:global(main) { overflow: hidden; }

	.landing {
		--page-ink: var(--text-color);
		--page-muted: var(--text-muted);
		--page-line: var(--border-color);
		--page-accent: var(--accent-color);
		--page-copper: var(--secondary-accent);

		width: 100%;
		background: radial-gradient(circle at 72% 7%, color-mix(in srgb, var(--page-accent) 14%, transparent), transparent 28rem), var(--bg-color);
	}

	.hero, .section { width: min(100% - 2rem, 80rem); margin-inline: auto; }
	.hero { padding: clamp(1.5rem, 2.5vw, 2.5rem) 0 0; }
	.hero-grid { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(19rem, 0.92fr); gap: clamp(3rem, 8vw, 8rem); align-items: center; min-height: 37rem; }
	.hero-copy { position: relative; z-index: 2; }

	.eyebrow { margin: 0 0 1.35rem; font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; line-height: 1.4; text-transform: uppercase; color: var(--page-accent); }
	h1, h2, h3 { font-family: Georgia, 'Times New Roman', serif; letter-spacing: -0.045em; }
	h1 { max-width: 12ch; font-size: clamp(3.5rem, 7.6vw, 7rem); font-weight: 400; line-height: 0.94; }
	.hero-lede { max-width: 42rem; margin: 2rem 0 0; font-family: ui-sans-serif, system-ui, sans-serif; font-size: clamp(1.05rem, 1.7vw, 1.3rem); line-height: 1.7; color: var(--page-muted); }
	.hero-actions, .studio-actions { display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap; margin-top: 2.25rem; }

	.button { display: inline-flex; align-items: center; justify-content: center; min-height: 3.25rem; padding: 0.8rem 1.35rem; font-family: var(--font-mono); font-size: 0.82rem; font-weight: 700; letter-spacing: 0.02em; border: 1px solid var(--page-accent); border-radius: 999px; transition: transform 180ms ease, background 180ms ease, color 180ms ease; }
	.button:hover { transform: translateY(-2px); }
	.button-primary { color: var(--bg-color); background: var(--page-accent); }
	.button-secondary { color: var(--page-ink); background: transparent; }
	.button-secondary:hover { color: var(--bg-color); background: var(--page-accent); }

	.system-map { position: relative; min-height: 31rem; isolation: isolate; }
	.system-map::before { position: absolute; inset: 8% 4%; background-image: radial-gradient(var(--page-line) 1px, transparent 1px); background-size: 22px 22px; mask-image: radial-gradient(circle, black 15%, transparent 68%); opacity: 0.55; content: ''; }
	.map-orbit { position: absolute; border: 1px solid color-mix(in srgb, var(--page-accent) 42%, transparent); border-radius: 50%; }
	.map-orbit-one { inset: 20% 11%; }
	.map-orbit-two { inset: 5% 25%; transform: rotate(50deg); }
	.map-core, .map-node { display: flex; position: absolute; padding: 1rem; background: color-mix(in srgb, var(--bg-color) 93%, transparent); border: 1px solid var(--page-line); box-shadow: 0 1rem 3rem rgb(0 0 0 / 0.12); flex-direction: column; justify-content: center; }
	.map-core span, .map-node span { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--page-muted); }
	.map-core strong, .map-node strong { margin-top: 0.35rem; font-family: Georgia, 'Times New Roman', serif; font-size: 1.05rem; font-weight: 400; color: var(--page-ink); }
	.map-core { z-index: 2; top: 37%; left: 32%; width: 11rem; height: 11rem; align-items: center; text-align: center; border-color: var(--page-accent); border-radius: 50%; }
	.map-node { width: 10.5rem; min-height: 5.5rem; border-radius: 0.7rem; transition: transform 180ms ease, border-color 180ms ease; }
	.map-node:hover { transform: translateY(-3px); border-color: var(--page-copper); }
	.node-framework { top: 5%; left: 2%; }
	.node-product { top: 13%; right: 0; }
	.node-platform { right: 6%; bottom: 2%; }

	.proof-strip { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: clamp(3rem, 6vw, 5rem); border-block: 1px solid var(--page-line); }
	.proof-item { display: flex; align-items: baseline; gap: 0.8rem; padding: 1.4rem clamp(1rem, 3vw, 2rem); }
	.proof-item + .proof-item { border-left: 1px solid var(--page-line); }
	.proof-item strong { font-family: Georgia, 'Times New Roman', serif; font-size: 1.8rem; font-weight: 400; color: var(--page-copper); }
	.proof-item span { font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; color: var(--page-muted); }

	.section { padding: clamp(5.5rem, 10vw, 9rem) 0; border-bottom: 1px solid var(--page-line); }
	.thesis, .studio { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: clamp(3rem, 10vw, 9rem); align-items: start; }
	h2 { max-width: 15ch; font-size: clamp(2.5rem, 5vw, 4.7rem); font-weight: 400; line-height: 1; }
	.thesis-copy, .studio-copy { font-family: ui-sans-serif, system-ui, sans-serif; font-size: clamp(1.08rem, 1.8vw, 1.35rem); line-height: 1.75; color: var(--page-muted); }
	.thesis-copy p, .studio-copy p { margin: 0; }
	.thesis-copy p + p { margin-top: 1.5rem; }

	.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: clamp(3rem, 6vw, 5rem); }
	.section-note { margin: 0; font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--page-muted); }
	.text-link { display: inline-flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--page-ink); }
	.text-link span { color: var(--page-accent); transition: transform 180ms ease; }
	.text-link:hover span { transform: translate(2px, -2px); }

	.capability-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--page-line); }
	.capability-card { padding: 2rem clamp(1rem, 3vw, 2.25rem) 1rem; }
	.capability-card + .capability-card { border-left: 1px solid var(--page-line); }
	.card-number { font-family: var(--font-mono); font-size: 0.72rem; color: var(--page-copper); }
	.capability-card h3 { margin-top: 3.5rem; font-size: clamp(1.6rem, 2.5vw, 2.25rem); font-weight: 400; }
	.capability-card p { margin: 1.25rem 0 0; font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.7; color: var(--page-muted); }

	.ecosystem { width: 100%; padding-inline: max(1rem, calc((100% - 80rem) / 2)); background: var(--bg-darker); }
	.ecosystem-list { border-top: 1px solid var(--page-line); }
	.project-row { display: grid; grid-template-columns: 3rem minmax(10rem, 0.8fr) minmax(18rem, 1.4fr) auto; gap: 2rem; align-items: center; padding: 2.25rem 0; color: var(--page-ink); border-bottom: 1px solid var(--page-line); transition: padding 180ms ease, color 180ms ease; }
	.project-row:hover { padding-inline: 1rem; color: var(--page-accent); }
	.project-index { font-family: var(--font-mono); font-size: 0.7rem; color: var(--page-copper); }
	.project-name span { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--page-muted); }
	.project-name h3 { margin-top: 0.3rem; font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 400; }
	.project-row p { margin: 0; font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.6; color: var(--page-muted); }
	.project-cta { font-family: var(--font-mono); font-size: 0.72rem; white-space: nowrap; }

	.studio { width: 100%; padding-inline: max(1rem, calc((100% - 80rem) / 2)); background: linear-gradient(115deg, color-mix(in srgb, var(--page-accent) 14%, transparent), transparent 42%), var(--bg-color); }
	.studio .button { flex-shrink: 0; }

	@media (width <= 56rem) {
		.hero-grid, .thesis, .studio { grid-template-columns: 1fr; }
		.hero-grid { gap: 1rem; }
		.system-map { min-height: 25rem; width: min(100%, 32rem); margin-inline: auto; }
		.capability-grid { grid-template-columns: 1fr; }
		.capability-card { padding-block: 2rem; }
		.capability-card + .capability-card { border-top: 1px solid var(--page-line); border-left: 0; }
		.capability-card h3 { margin-top: 1.5rem; }
		.project-row { grid-template-columns: 2rem minmax(8rem, 0.6fr) 1fr; }
		.project-cta { display: none; }
	}

	@media (width <= 40rem) {
		.hero { padding-top: 1.5rem; }
		h1 { font-size: clamp(3.15rem, 16vw, 5rem); }
		.system-map { min-height: 22rem; transform: scale(0.9); transform-origin: center; }
		.map-core { left: calc(50% - 5.5rem); }
		.node-framework { left: -1rem; }
		.node-product { right: -1rem; }
		.node-platform { right: 0; }
		.proof-strip { grid-template-columns: 1fr; }
		.proof-item + .proof-item { border-top: 1px solid var(--page-line); border-left: 0; }
		.section-heading { align-items: start; flex-direction: column; }
		.project-row { grid-template-columns: 2rem 1fr; gap: 1rem; }
		.project-row p { grid-column: 2; }
	}

	@media (prefers-reduced-motion: reduce) {
		.button, .map-node, .project-row, .text-link span { transition: none; }
	}
	/* stylelint-enable */
</style>
