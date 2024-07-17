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

  console.log('maxZIndex', maxZIndex);

  update(panes => {
    const paneIndex = panes.findIndex(pane => pane.id === id);
    if (paneIndex !== -1) {
      panes[paneIndex].obj.update(value => {
        return { ...value, x, y, zIndex: maxZIndex };
      });
    }
    return panes;
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

  console.log(`Updated z-index of pane ${id} to ${maxZIndex}`);

  update(panes => {
    const paneIndex = panes.findIndex(pane => pane.id === id);
    if (paneIndex !== -1) {
      console.log(`Found pane ${id} at index ${paneIndex}`); // Log the index of the pane

      panes[paneIndex].obj.update(value => {
        console.log(`Updating pane ${id} from`, value); // Log the old value
        const newValue = { ...value, zIndex: maxZIndex };
        console.log(`Updating pane ${id} to`, newValue); // Log the new value
        return newValue;
      });
    } else {
      console.log(`Pane ${id} not found`); // Log if the pane is not found
    }
    return panes;
  });
};

export default {
  subscribe,
  updatePane,
  removePane,
  createPane,
  updateZIndex,
};
