import type { Snippet } from 'svelte';

export type { Video, YouTubeChannel } from './video';
export type { Project } from './project';
export type { Resource } from './resource';

export interface BoxProps {
	title?: string;
	children: Snippet;
}
