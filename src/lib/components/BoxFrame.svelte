<script lang="ts">
	// Helper snippets for common box parts
	let { width = 40, color = 'var(--box-border)' } = $props<{
		width?: number;
		color?: string;
	}>();

	// Export snippets for external use
	export function top({ width }: { width: number }) {
		return `╭${'─'.repeat(width - 2)}╮`;
	}

	export function bottom({ width }: { width: number }) {
		return `╰${'─'.repeat(width - 2)}╯`;
	}

	export function divider({ width }: { width: number }) {
		return `├${'─'.repeat(width - 2)}┤`;
	}

	export function sides({ width }: { width: number }) {
		return `│${' '.repeat(width - 2)}│`;
	}
</script>
