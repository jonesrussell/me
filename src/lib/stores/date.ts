import { writable } from 'svelte/store';

export const currentYear = writable(new Date().getFullYear());
