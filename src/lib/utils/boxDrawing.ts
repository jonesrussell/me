export function top({ width }: { width: number }): string {
    return `╭${'─'.repeat(width - 2)}╮`;
}

export function bottom({ width }: { width: number }): string {
    return `╰${'─'.repeat(width - 2)}╯`;
}

export function divider({ width }: { width: number }): string {
    return `├${'─'.repeat(width - 2)}┤`;
}

export function sides({ width }: { width: number }): string {
    return `│${' '.repeat(width - 2)}│`;
} 