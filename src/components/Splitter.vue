<template>
  <div class="turtle-panes__splitter-wrapper">
    <div
      class="turtle-panes__splitter-target"
      @mousedown="handleMouseDown"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { ref, inject, computed } from "vue";
import { attachPaneSplitterInteractionListeners } from "./helpers";
import type { Ref } from "vue";
import { ContextType } from "../types";

const props = defineProps<{
  paneId?: number | null;
  clientWidth?: number;
  scrollWidth?: number;
}>();

const contextRef: Ref<ContextType> | undefined = inject("context");
if (!contextRef) {
  throw new Error("Pane is not wrapped in Panes component");
}
const context = contextRef.value;
const isInteractingWithSplitter = computed(
  () => context.interactionState.activePaneId === props.paneId,
);
const isInteractingWithAnotherSplitter = computed(
  () =>
    context.interactionState.activePaneId && !isInteractingWithSplitter.value,
);
const initialClientX: Ref<number | null> = ref(null);

const handleMouseMove = (e: MouseEvent) => {
  if (!isInteractingWithSplitter.value) return;
  const mouseMovementInPx: number =
    e.clientX - (initialClientX.value as number);
  try {
    const newWidth =
      context.panes[props.paneId as number].width + mouseMovementInPx;
    context.updatePaneWidth(props.paneId as number, newWidth);
    context.setPixellsTravelledInPx(mouseMovementInPx);
    initialClientX.value = e.clientX;
  } catch (e) {
    console.error(e);
    handleMouseUp();
  }
};

const handleMouseUp = () => {
  context.resetInteractionState();
};

const handleMouseDown = (e: MouseEvent) => {
  if (isInteractingWithAnotherSplitter.value) return;
  context.setActivePane(props.paneId);
  initialClientX.value = e.clientX;

  attachPaneSplitterInteractionListeners({
    mouseMoveCallback: handleMouseMove,
    mouseUpCallback: handleMouseUp,
  });
};
</script>
<style lang="scss">
.turtle-panes__splitter {
  &-wrapper {
    width: 1px;
    height: 100%;
    z-index: 2;
    position: relative;
    border-left: dashed 1px #c2c2c2;
    pointer-events: all;
  }
  &-target {
    cursor: col-resize;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10px;
    height: 100%;
  }
}
</style>
