<script lang="ts">
  import PaneHeader from './PaneHeader.svelte';
  import PaneFooter from './PaneFooter.svelte';

  export let title = '';
</script>

<div class="pane">
  <PaneHeader {title} />
  <div class="pane-content">
      <slot />
  </div>
  <PaneFooter />
</div>

<style>
  .pane {
      display: flex;
      flex-direction: column;
      height: 100%;
  }

  .pane-content {
      flex-grow: 1;
      overflow: auto;
      overflow-y: scroll;
  }
</style>
