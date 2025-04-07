<!--
@component
GoProjectSetup - Interactive Go Project Setup Guide

Shows step-by-step terminal commands for setting up a Go project,
with explanations and real terminal output.
-->
<script lang="ts">
	import { terminal } from '$lib/stores/terminal';
	import Grid from './Grid.svelte';
	import Terminal from './Terminal.svelte';

	const setupSteps = [
		{
			title: 'Initialize Project',
			commands: [
				{
					cmd: 'mkdir my-go-project',
					output: ''
				},
				{
					cmd: 'cd my-go-project',
					output: ''
				},
				{
					cmd: 'go mod init github.com/username/my-go-project',
					output:
						'go: creating new go.mod: module github.com/username/my-go-project'
				}
			]
		},
		{
			title: 'Create Main Package',
			commands: [
				{
					cmd: 'mkdir cmd/server',
					output: ''
				},
				{
					cmd: 'touch cmd/server/main.go',
					output: ''
				},
				{
					cmd: 'cat > cmd/server/main.go << EOL\npackage main\n\nimport (\n\t"fmt"\n\t"log"\n\t"net/http"\n)\n\nfunc main() {\n\thttp.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprintf(w, "Hello, World!")\n\t})\n\n\tlog.Fatal(http.ListenAndServe(":8080", nil))\n}\nEOL',
					output: ''
				}
			]
		},
		{
			title: 'Add Dependencies',
			commands: [
				{
					cmd: 'go get -u github.com/gorilla/mux',
					output: 'go: added github.com/gorilla/mux v1.8.1'
				},
				{
					cmd: 'go mod tidy',
					output:
						'go: downloading github.com/gorilla/mux v1.8.1\ngo: added github.com/gorilla/mux v1.8.1'
				}
			]
		},
		{
			title: 'Run the Server',
			commands: [
				{
					cmd: 'go run cmd/server/main.go',
					output: 'Server running on http://localhost:8080'
				}
			]
		}
	];

	let currentStep = $state(0);

	function nextStep() {
		if (currentStep < setupSteps.length - 1) {
			currentStep++;
			terminal.reset();
			terminal.loadCommands(setupSteps[currentStep].commands);
		}
	}

	function prevStep() {
		if (currentStep > 0) {
			currentStep--;
			terminal.reset();
			terminal.loadCommands(setupSteps[currentStep].commands);
		}
	}

	$effect(() => {
		terminal.loadCommands(setupSteps[currentStep].commands);
	});
</script>

<div class="setup-guide">
	<header>
		<h2>Go Project Setup</h2>
		<p class="step-title">{setupSteps[currentStep].title}</p>
	</header>

	<Grid cols={1} gap={2}>
		<div class="terminal-container">
			<Terminal title="~/go-project-setup" />
		</div>

		<div class="controls">
			<button class="prev" onclick={prevStep} disabled={currentStep === 0}>
				Previous Step
			</button>
			<span class="step-counter"
				>Step {currentStep + 1} of {setupSteps.length}</span
			>
			<button
				class="next"
				onclick={nextStep}
				disabled={currentStep === setupSteps.length - 1}
			>
				Next Step
			</button>
		</div>
	</Grid>
</div>

<style>
	.setup-guide {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
	}

	header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	h2 {
		margin: 0;
		font-size: var(--font-size-xl);
		line-height: var(--line-height-base);
	}

	.step-title {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
	}

	.terminal-container {
		width: 100%;
	}

	.controls {
		display: flex;
		gap: var(--space-4);
		justify-content: space-between;
		align-items: center;
		padding: var(--space-4);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--color-mix-light);
	}

	.step-counter {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
	}

	button {
		display: flex;
		gap: var(--space-2);
		align-items: center;
		padding: var(--space-2) var(--space-4);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--bg-darker);
		color: var(--text-color);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		transition: all var(--transition-duration) var(--transition-timing);
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	button:not(:disabled):hover {
		background: var(--color-mix-medium);
		transform: translateY(-0.125ch);
	}

	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
	}
</style>
