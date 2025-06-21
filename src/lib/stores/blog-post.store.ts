import { writable } from 'svelte/store';
import { fetchPost } from '$lib/services/blog-service';
import type { BlogPost } from '$lib/types/blog';

interface BlogPostState {
  post: BlogPost | null;
  isLoading: boolean;
  error: string | null;
}

function createBlogPostStore() {
  const { subscribe, set, update } = writable<BlogPostState>({
    post: null,
    isLoading: false,
    error: null
  });

  return {
    subscribe,
    async loadPost(slug: string) {
      update(state => ({ ...state, isLoading: true, error: null }));

      try {
        const post = await fetchPost(fetch, slug);
        set({ post, isLoading: false, error: null });
      } catch (e) {
        const error = e instanceof Error ? e.message : 'Failed to load post';
        set({ post: null, isLoading: false, error });
      }
    },
    reset() {
      set({ post: null, isLoading: false, error: null });
    }
  };
}

export const blogPostStore = createBlogPostStore();
