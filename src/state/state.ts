import { create } from "zustand";
import { Pane, PaneStoreState, PaneStore } from "../types";

const usePaneStore = create<PaneStore>((set) => ({
  panes: [],
  setPanes: (newPanes: Pane[]) => set({ panes: newPanes }),

  updatePane: (paneId: Pane["id"], newProps: Partial<Pane>) => {
    set((state: PaneStoreState) => {
      const currentPane = state.panes.find((pane: Pane) => pane.id === paneId);
      if (currentPane && newProps.width !== undefined) {
        const adjustedWidth = Math.max(
          currentPane.minWidth,
          Math.min(currentPane.maxWidth, newProps.width),
        );
        newProps.width = adjustedWidth;
      }

      return {
        panes: state.panes.map((pane: Pane) => {
          if (pane.id === paneId) {
            return { ...pane, ...newProps };
          }
          return pane;
        }),
      };
    });
  },
}));

export default usePaneStore;
