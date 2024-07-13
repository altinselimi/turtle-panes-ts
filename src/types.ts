import Pane from "./components/Pane.vue";

export type Pane = {
    width: number;
    minWidth: number;
    maxWidth: number;
    isVisible: boolean;
    id: number;
};

export interface PaneStoreState {
    panes: Pane[];
}

export interface PaneStoreActions {
    setPanes: (newPanes: Pane[]) => void;
    updatePane: (paneId: Pane['id'], newProps: Partial<Pane>) => void;
};

export interface PaneStore extends PaneStoreState, PaneStoreActions {}