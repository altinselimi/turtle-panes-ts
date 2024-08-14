<template>
  <div class="turtle-panes__wrapper">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, provide } from "vue";
import { Pane as PaneType } from "../types";

const context: any = ref({
  panes: {} as {
    [id: number]: PaneType;
  },
  interactionState: {
    activePaneId: null,
  } as {
    activePaneId: number | null;
  },
  setPanes: function (newPanes: PaneType[]) {
    this.panes = newPanes;
  },
  addPane: function (pane: PaneType) {
    const context = this;
    return new Promise((resolve) => {
      const id = pane?.id || Object.keys(context.panes).length + 1;
      context.panes[id] = { ...pane, id };
      console.log(context.panes);
      resolve(id);
    });
  },
  updatePane: function (paneId: PaneType["id"], newProps: Partial<PaneType>) {
    if (!this) return;
    const context: { [key: string]: any } = this || {};
    context.panes = context.panes.map((pane: PaneType) => {
      if (pane.id !== paneId) return pane;
      if (newProps.width != null) {
        const adjustedWidth = Math.max(
          pane.minWidth,
          Math.min(pane.maxWidth, newProps.width),
        );
        newProps.width = adjustedWidth;
      }
      return { ...pane, ...newProps };
    });
  },
  removePane: function (paneId: PaneType["id"]) {
    const context: { [key: string]: any } = this || {};
    context.panes = context.panes.filter(
      (pane: PaneType) => pane.id !== paneId,
    );
  },
});

provide("context", context);
</script>
<style lang="scss">
.turtle-panes {
  &__wrapper {
    display: flex;
    flex: 1;
  }
}
</style>
