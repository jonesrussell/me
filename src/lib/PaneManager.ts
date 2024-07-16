// src/lib/PaneManager.ts
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { PaneType } from './types';

interface PaneStore extends Writable<PaneType[]> {
  updatePane: (id: string, x: number, y: number, width: number, height: number) => void;
  removePane: (id: string) => void;
  createPane: (id: string, x: number, y: number, width: number, height: number) => void;
}

// Create the store with an empty array
const { subscribe, update }: PaneStore = writable<PaneType[]>([]) as PaneStore;

// Function to update a pane
const updatePane = (id: string, x: number, y: number, width: number, height: number) => update(panes => {
  const paneIndex = panes.findIndex(pane => pane.id === id);
  if (paneIndex !== -1) {
    panes[paneIndex].obj.update(value => {
      return { ...value, x, y, width, height };
    });
  }
  return panes;
});

// Function to remove a pane
const removePane = (id: string) => update(panes => {
  return panes.filter(pane => pane.id !== id);
});

// Function to create a pane
const createPane = (id: string, x: number, y: number, width: number, height: number) => update(panes => {
  return [...panes, { id, obj: writable({ x, y, width, height }) }];
});

export default {
  subscribe,
  updatePane,
  removePane,
  createPane
};
