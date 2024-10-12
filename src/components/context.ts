import { ContextType } from "../types";
import { ref } from "vue";
import type { Ref } from "vue";

export const context: ContextType = {
  panes: {},
  containerWidth: 0,
  interactionState: {
    activePaneId: null,
    pixelsTravelled: 0,
  },
  setPanes: function (newPanes) {
    this.panes = newPanes;
  },
  addPane: function (pane) {
    const context = this;
    return new Promise((resolve) => {
      const id: number = pane?.id || Object.keys(context.panes).length + 1;
      context.panes[id] = { ...pane, id };
      resolve(id);
    });
  },
  updatePane: function (paneId, newProps) {
    if (!this || !paneId) return;
    const context: { [key: string]: any } = this || {};
    context.panes[paneId] = { ...context.panes[paneId], ...newProps };
  },
  removePane: function (paneId) {
    if (!paneId) return;
    delete context.panes[paneId];
  },
  setActivePane: function (paneId) {
    this.interactionState.activePaneId = paneId;
  },
  setPixellsTravelledInPx: function (pixels) {
    this.interactionState.pixelsTravelled = pixels;
  },
  updatePaneWidth: function (paneId, widthDifference) {
    if (!paneId) return;
    const [targetPane, nextPane] = [this.panes[paneId], this.panes[paneId + 1]];
    const [targetPaneNewWidth, nextPaneNewWidth] = [
      targetPane.width + widthDifference,
      nextPane.width - widthDifference,
    ];
    const [isTargetPaneMinWidth, isNextPaneMinWidth] = [
      targetPaneNewWidth < targetPane.minWidth!,
      nextPaneNewWidth < nextPane.minWidth!,
    ];
    const [isTargetPaneMaxWidth, isNextPaneMaxWidth] = [
      targetPaneNewWidth > targetPane.maxWidth!,
      nextPaneNewWidth > nextPane.maxWidth!,
    ];
    if (
      isTargetPaneMinWidth ||
      isNextPaneMinWidth ||
      isTargetPaneMaxWidth ||
      isNextPaneMaxWidth
    ) {
      throw new Error("Available width exceeded");
    }
    targetPane.width = targetPaneNewWidth;
    nextPane.width = nextPaneNewWidth;
  },
  setContainerWidth: function (width) {
    this.containerWidth = width;
  },
};

export const contextRef = ref(context) as Ref<ContextType>;
