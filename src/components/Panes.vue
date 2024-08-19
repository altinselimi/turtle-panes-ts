<template>
  <div class="turtle-panes__wrapper">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, provide } from "vue";
import type { Ref } from "vue";
import { Pane as PaneType } from "../types";

interface ContextType {
  panes: {
    [id: number]: PaneType;
  };
  interactionState: {
    activePaneId: number | null;
  };
  setPanes: (newPanes: PaneType[]) => void;
  addPane: (pane: PaneType) => Promise<number>;
  updatePane: (paneId: PaneType["id"], newProps: Partial<PaneType>) => void;
  removePane: (paneId: PaneType["id"]) => void;
  setActivePane: (paneId: PaneType["id"]) => void;
}

const context: ContextType = {
  panes: {},
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
  removePane: function (paneId: PaneType["id"]) {
    const context: { [key: string]: any } = this || {};
    context.panes = context.panes.filter(
      (pane: PaneType) => pane.id !== paneId,
    );
  },
  setActivePane: function (paneId: PaneType["id"]) {
    this.interactionState.activePaneId = paneId;
  },
};

const contextRef = ref(context);

provide("context", contextRef);
</script>
<style lang="scss">
.turtle-panes {
  &__wrapper {
    display: flex;
    flex: 1;
  }
}
</style>
