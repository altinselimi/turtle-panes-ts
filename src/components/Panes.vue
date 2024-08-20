<template>
  <div class="turtle-panes__wrapper" ref="panesWrapperRef">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, provide, onMounted, watchEffect } from "vue";
import { Pane, Pane as PaneType } from "../types";

interface ContextType {
  panes: {
    [id: number]: PaneType;
  };
  containerWidth: number;
  interactionState: {
    activePaneId: number | null;
  };
  setPanes: (newPanes: PaneType[]) => void;
  addPane: (pane: PaneType) => Promise<number>;
  updatePane: (paneId: PaneType["id"], newProps: Partial<PaneType>) => void;
  removePane: (paneId: PaneType["id"]) => void;
  setActivePane: (paneId: PaneType["id"]) => void;
  updatePaneWidth: (paneId: PaneType["id"], widthDifference: number) => void;
  setContainerWidth: (width: number) => void;
}

const context: ContextType = {
  panes: {},
  containerWidth: 0,
  interactionState: {
    activePaneId: null,
  },
  setPanes: function (newPanes) {
    this.panes = newPanes;
  },
  addPane: function (pane) {
    const context = this;
    return new Promise((resolve) => {
      const id: number = pane?.id || Object.keys(context.panes).length + 1;
      context.panes[id] = { ...pane, id };
      console.log(context.panes);
      resolve(id);
    });
  },
  updatePane: function (paneId, newProps) {
    if (!this) return;
    const context: { [key: string]: any } = this || {};
    context.panes[paneId] = { ...context.panes[paneId], ...newProps };
  },
  removePane: function (paneId) {
    const context: { [key: string]: any } = this || {};
    context.panes = context.panes.filter(
      (pane: PaneType) => pane.id !== paneId,
    );
  },
  setActivePane: function (paneId) {
    this.interactionState.activePaneId = paneId;
  },
  updatePaneWidth: function (paneId, widthDifference) {
    const [targetPane, nextPane] = [this.panes[paneId], this.panes[paneId + 1]];
    const [targetPaneNewWidth, nextPaneNewWidth] = [
      targetPane.width + widthDifference,
      nextPane.width - widthDifference,
    ];
    const [nextPaneMinWidth, targetPaneMaxWidth] = [
      nextPane.minWidth || 0,
      targetPane.maxWidth || this.containerWidth,
    ];
    if (
      targetPaneNewWidth > targetPaneMaxWidth ||
      nextPaneNewWidth < nextPaneMinWidth
    )
      return;
    targetPane.width = targetPaneNewWidth;
    nextPane.width = nextPaneNewWidth;
  },
  setContainerWidth: function (width) {
    this.containerWidth = width;
  },
};

const contextRef = ref(context);

provide("context", contextRef);

const panesWrapperRef = ref(null as HTMLElement | null);
watchEffect(() => {
  const isInteracting = contextRef.value.interactionState.activePaneId != null;
  if (!isInteracting) return;
});

onMounted(() => {
  const wrapperElement = panesWrapperRef.value;
  const { width = 0 } = wrapperElement?.getBoundingClientRect() || {};
  contextRef.value.setContainerWidth(width);
});
</script>
<style lang="scss">
.turtle-panes {
  &__wrapper {
    display: flex;
    flex: 1;
  }
}
</style>
