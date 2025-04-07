import { readable } from 'svelte/store';

// Use readable store since year should only be updated by the system
export const currentYear = readable(new Date().getFullYear(), (set) => {
	// Update year when it changes
	const interval = setInterval(
		() => {
			const year = new Date().getFullYear();
			set(year);
		},
		1000 * 60 * 60
	); // Check every hour

	// Cleanup on unmount
	return () => clearInterval(interval);
});
