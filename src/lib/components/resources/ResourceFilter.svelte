<script lang="ts">
	const {
		categories,
		activeCategory,
		activeTags,
		searchQuery,
		resultCount,
		totalCount,
		onCategoryChange,
		onTagRemove,
		onSearchChange,
		onClearFilters
	} = $props<{
		categories: string[];
		activeCategory: string | null;
		activeTags: string[];
		searchQuery: string;
		resultCount: number;
		totalCount: number;
		onCategoryChange: (category: string | null) => void;
		onTagRemove: (tag: string) => void;
		onSearchChange: (query: string) => void;
		onClearFilters: () => void;
	}>();

	const isFiltered = $derived(
		activeCategory !== null || activeTags.length > 0 || searchQuery.length > 0
	);
</script>

<style>
	.filter-bar {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.category-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.category-button {
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition:
			border-color var(--transition-base),
			color var(--transition-base),
			background var(--transition-base);
	}

	.category-button:hover {
		border-color: var(--accent-color);
		color: var(--text-color);
	}

	.category-button[aria-pressed='true'] {
		color: var(--accent-color);
		background: color-mix(in srgb, var(--accent-color) 10%, var(--bg-darker));
		border-color: var(--accent-color);
	}

	.search-wrapper {
		display: flex;
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		transition: border-color var(--transition-base);
		align-items: center;
		gap: var(--space-2);
	}

	.search-wrapper:focus-within {
		border-color: var(--accent-color);
	}

	.search-prefix {
		font-size: var(--font-size-sm);
		color: var(--accent-color);
		user-select: none;
	}

	.search-input {
		flex: 1;
		padding: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color);
		background: transparent;
		border: none;
		outline: none;
	}

	.search-input::placeholder {
		color: var(--text-muted);
	}

	.active-filters {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
	}

	.filter-pill {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		padding: var(--space-1) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--accent-color);
		background: color-mix(in srgb, var(--accent-color) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--accent-color) 30%, transparent);
		border-radius: var(--radius-sm);
	}

	.pill-remove {
		padding: 0;
		font-size: var(--font-size-xs);
		line-height: 1;
		color: var(--text-muted);
		background: none;
		border: none;
		cursor: pointer;
	}

	.pill-remove:hover {
		color: var(--accent-color);
	}

	.result-count {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.clear-button {
		padding: var(--space-1) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		background: none;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		cursor: pointer;
	}

	.clear-button:hover {
		border-color: var(--accent-color);
		color: var(--accent-color);
	}
</style>

<div class="filter-bar">
	<div class="category-buttons" role="group" aria-label="Filter by category">
		<button
			class="category-button"
			aria-pressed={activeCategory === null}
			onclick={() => onCategoryChange(null)}
		>
			All
		</button>
		{#each categories as category (category)}
			<button
				class="category-button"
				aria-pressed={activeCategory === category}
				onclick={() => onCategoryChange(activeCategory === category ? null : category)}
			>
				{category}
			</button>
		{/each}
	</div>

	<div class="search-wrapper">
		<span class="search-prefix" aria-hidden="true">$</span>
		<input
			class="search-input"
			type="search"
			placeholder='grep -i "..."'
			value={searchQuery}
			oninput={(e) => onSearchChange(e.currentTarget.value)}
			aria-label="Search resources"
		/>
	</div>

	<div class="active-filters">
		{#each activeTags as tag (tag)}
			<span class="filter-pill">
				{tag}
				<button
					class="pill-remove"
					onclick={() => onTagRemove(tag)}
					aria-label="Remove {tag} filter"
				>
					&times;
				</button>
			</span>
		{/each}
		<span class="result-count">
			{#if resultCount < totalCount}
				{resultCount} of {totalCount} resources
			{:else}
				{totalCount} resources
			{/if}
		</span>
		{#if isFiltered}
			<button class="clear-button" onclick={onClearFilters}>clear</button>
		{/if}
	</div>
</div>
