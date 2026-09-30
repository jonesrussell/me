<script lang="ts">
	import ContactForm from '$lib/components/forms/ContactForm.svelte';
	import Meta from '$lib/components/site/Meta.svelte';
	import PageHero from '$lib/components/site/PageHero.svelte';
	import { config } from '$lib/config/env';
</script>

<Meta
	title="Contact"
	description="Tell Russell Jones about your project, existing system or software challenge. Email jonesrussell42@gmail.com or start an enquiry."
	path="/contact"
/>
<PageHero
	label="Start a conversation"
	title="What are you"
	accent="working on?"
	intro="Bring an idea, a question or a challenge. A little context is enough to start."
	light
/>
<div class="contact site-container section-space">
	<div class="contact-grid">
		<section class="contact-info">
			<p class="eyebrow">Get in touch</p>
			<h2>Let’s talk about it.</h2>
			<p>
				I’m interested in useful software, thoughtful collaborations and problems worth working
				through.
			</p>
			<h3>Email</h3>
			<a class="text-link" href="mailto:jonesrussell42@gmail.com"
				>jonesrussell42@gmail.com <span aria-hidden="true">↗</span></a
			>
			<h3>LinkedIn</h3>
			<a class="text-link" href="https://linkedin.com/in/jonesrussell42"
				>jonesrussell42 <span aria-hidden="true">↗</span></a
			>
		</section>
		{#if config.formPublicKeys.contact}<section class="contact-form-col">
				<h2>Send an enquiry</h2>
				<ContactForm />
				<p class="small-note">Please avoid sending passwords or sensitive information.</p>
				<noscript
					><p>
						Email <a href="mailto:jonesrussell42@gmail.com">jonesrussell42@gmail.com</a> to send your enquiry.
					</p></noscript
				>
			</section>{/if}
	</div>
	<section class="contact-context">
		<h2 class="eyebrow">A little context goes a long way.</h2>
		<p>
			Tell me about the problem, what you have today, any constraints and your rough timeline. You
			do not need a polished brief.
		</p>
	</section>
</div>
