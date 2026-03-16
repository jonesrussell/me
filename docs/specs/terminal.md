# Terminal Subsystem Specification

## File Map

| File | Purpose |
|------|---------|
| `src/lib/stores/terminal.svelte.ts` | Terminal state + animation logic (250+ LOC) |
| `src/lib/components/terminal/Terminal.svelte` | Split-pane terminal display component |

## Interface Signatures

### terminal.svelte.ts

```typescript
// Command definition
interface Command {
  prompt: string;      // e.g., "$ whoami"
  output: string[];    // Lines of output
  side: 'left' | 'right';  // Which pane to display in
}

// State object (rune-based)
export const terminalState: {
  commands: Command[];
  currentCommandIndex: number;
  currentCharIndex: number;
  isTyping: boolean;
  isComplete: boolean;
};

// API object with methods
export const terminal: {
  start(): void;       // Begin typing animation
  stop(): void;        // Pause animation
  reset(): void;       // Clear state, restart
  loadCommands(): void; // Initialize command list
};
```

## Data Flow

### Animation sequence
1. `terminal.loadCommands()` populates `terminalState.commands` with predefined commands
2. `terminal.start()` begins the typing animation loop
3. Each character typed at 50ms intervals (configurable)
4. Characters appear in the prompt first, then output lines render
5. After all commands complete, `terminalState.isComplete = true`

### Split-pane display
- Commands tagged with `side: 'left'` or `side: 'right'`
- `Terminal.svelte` renders two panes side-by-side
- Commands appear in their designated pane as animation progresses

### Predefined commands
- `$ whoami` — displays name/role info
- `$ man russell` — manual page style bio
- `$ cat skills.json` — JSON-formatted skills list

## Edge Cases

- Component unmount during animation: `terminal.stop()` must clean up intervals
- Rapid start/stop: guard against multiple concurrent animation loops
- Mobile viewport: split pane collapses to single column
- SSR: terminal state initializes empty, animation starts on client only
