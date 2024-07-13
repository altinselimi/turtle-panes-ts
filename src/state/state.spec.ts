import { describe, it, expect, beforeEach } from "vitest";
import usePaneStore from "./state";
import { Pane } from "../types";

describe("usePaneStore", () => {
  const defaultState: Pane[] = [
    { width: 100, minWidth: 50, maxWidth: 200, isVisible: true, id: 1 },
    { width: 200, minWidth: 100, maxWidth: 300, isVisible: false, id: 2 },
  ];

  const initializeDefaultState = () => {
    usePaneStore.setState({ panes: defaultState });
  };

  beforeEach(() => {
    initializeDefaultState();
  });
  it("should update the panes array when setPanes is called", () => {
    expect(usePaneStore.getState().panes).toEqual(defaultState);
  });

  it("should update the specified pane when updatePane is called", () => {
    const { updatePane } = usePaneStore.getState();
    const initialPanes = usePaneStore.getState().panes;
    console.log({ initialPanes });
    const updatedPane: Pane = {
      id: 1,
      width: 150,
      minWidth: 50,
      maxWidth: 200,
      isVisible: false,
    };

    usePaneStore.setState({ panes: initialPanes });
    updatePane(1, updatedPane);

    const updatedPaneFromStore = usePaneStore
      .getState()
      .panes.find((pane) => pane.id === 1);
    expect(updatedPaneFromStore?.isVisible).toBe(false);
    expect(updatedPaneFromStore?.width).toEqual(150);
  });

  it("should not update the panes array when updatePane is called with an invalid paneId", () => {
    const { updatePane } = usePaneStore.getState();
    const initialPanes = usePaneStore.getState().panes;
    const updatedPane: Pane = {
      id: 3,
      width: 150,
      minWidth: 50,
      maxWidth: 200,
      isVisible: false,
    };

    usePaneStore.setState({ panes: initialPanes });
    updatePane(3, updatedPane);

    expect(usePaneStore.getState().panes).toEqual(initialPanes);
  });

  it("should prevent the width of a pane from exceeding its maxWidth", () => {
    const { updatePane } = usePaneStore.getState();
    const initialPanes = usePaneStore.getState().panes;
    const updatedPane: Pane = {
      id: 1,
      width: 250,
      minWidth: 50,
      maxWidth: 200,
      isVisible: false,
    };

    usePaneStore.setState({ panes: initialPanes });
    updatePane(1, updatedPane);

    const updatedPaneFromStore = usePaneStore
      .getState()
      .panes.find((pane) => pane.id === 1);
    expect(updatedPaneFromStore?.width).toEqual(200);
  });

  it("should prevent the width of a pane from falling below its minWidth", () => {
    const { updatePane } = usePaneStore.getState();
    const initialPanes = usePaneStore.getState().panes;
    const updatedPane: Pane = {
      id: 1,
      width: 25,
      minWidth: 50,
      maxWidth: 200,
      isVisible: false,
    };

    usePaneStore.setState({ panes: initialPanes });
    updatePane(1, updatedPane);

    const updatedPaneFromStore = usePaneStore
      .getState()
      .panes.find((pane) => pane.id === 1);
    expect(updatedPaneFromStore?.width).toEqual(50);
  });
});
