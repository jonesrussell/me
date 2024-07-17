import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { PaneType } from './types';

interface PaneStore extends Writable<PaneType[]> {
  updatePane: (id: string, x: number, y: number, zIndex: number) => void;
  removePane: (id: string) => void;
  createPane: (id: string, x: number, y: number, zIndex: number) => void;
}

// Create the store with an empty array
const { subscribe, update }: PaneStore = writable<PaneType[]>([]) as PaneStore;

let maxZIndex = 5; // Keep track of the highest z-index

// Function to update a pane
const updatePane = (id: string, x: number, y: number) => {
  maxZIndex += 1; // increment maxZIndex

  update(panes => {
    return panes.map(pane => {
      if (pane.id === id) {
        pane.obj.update(value => {
          return { ...value, x, y, zIndex: maxZIndex };
        });
      }
      return pane;
    });
  });
};

// Function to remove a pane
const removePane = (id: string) => update(panes => {
  return panes.filter(pane => pane.id !== id);
});

// Function to create a pane
const createPane = (id: string, x: number, y: number, zIndex: number) => {
  maxZIndex = Math.max(maxZIndex, zIndex); // Update the maxZIndex
  update(panes => {
    return [...panes, { id, obj: writable({ x, y, zIndex }) }];
  });
};

// Function to update the z-index of a pane
const updateZIndex = (id: string) => {
  maxZIndex += 1; // increment maxZIndex

  update(panes => {
    return panes.map(pane => {
      if (pane.id === id) {
        pane.obj.update(value => {
          return { ...value, zIndex: maxZIndex };
        });
      }
      return pane;
    });
  });
};

export default {
  subscribe,
  updatePane,
  removePane,
  createPane,
  updateZIndex,
};
