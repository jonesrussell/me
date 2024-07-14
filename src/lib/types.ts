import type WinSignupNews from '../routes/sections/WinSignupNews.svelte';
import type WinBlog from '../routes/sections/WinBlog.svelte';

export type Window = {
	component: typeof WinSignupNews | typeof WinBlog;
	x: number;
	y: number;
};