import Pane from "./components/Pane.vue";

export type Pane = {
  width: number;
  minWidth?: number;
  maxWidth?: number;
  isVisible?: boolean;
  isHiddenAfterMinWidthExceeded?: boolean;
  id?: number;
  lastWidthWithoutOverflow?: number;
  hasHorizontalOverflow?: boolean;
};

export interface PaneStoreState {
  panes: Pane[];
}

export interface PaneStoreActions {
  setPanes: (newPanes: Pane[]) => void;
  updatePane: (paneId: Pane["id"], newProps: Partial<Pane>) => void;
}

export interface PaneStore extends PaneStoreState, PaneStoreActions {}

export interface ContextType {
  panes: {
    [id: number]: Pane;
  };
  containerWidth: number;
  interactionState: {
    activePaneId?: number | null;
    pixelsTravelled?: number;
  };
  setPanes: (newPanes: Pane[]) => void;
  addPane: (pane: Pane) => Promise<number>;
  updatePane: (paneId: Pane["id"], newProps: Partial<Pane>) => void;
  removePane: (paneId: Pane["id"]) => void;
  setActivePane: (paneId: Pane["id"]) => void;
  setPixellsTravelledInPx: (pixelsTravelled: number) => void;
  updatePaneWidth: (paneId: Pane["id"], widthDifference: number) => void;
  setContainerWidth: (width: number) => void;
}
