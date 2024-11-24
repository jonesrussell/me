// src/stores.ts
import { writable } from 'svelte/store';

export interface SessionData {
	openAboutInPane?: boolean;
	// other session properties here
}

const initialSession: SessionData = {
	openAboutInPane: false
	// other session properties here
};

export const session = writable<SessionData>(initialSession);

export const darkMode = writable(false);
