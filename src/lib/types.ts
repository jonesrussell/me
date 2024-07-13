// src/lib/types.ts
import WinSignupNews from '../routes/sections/WinSignupNews.svelte';
import WinBlog from '../routes/sections/WinBlog.svelte';

export type Window = {
	component: typeof WinSignupNews | typeof WinBlog;
  
	x: number;
	y: number;
};
