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

const props = defineProps<{
  paneId?: number | null;
}>();

const contextRef: any = inject("context");
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
  console.log("handleMouseMove:", e);
  const mouseMovementInPx: number =
    e.clientX - (initialClientX.value as number);
  context.updatePaneWidth(props.paneId as number, mouseMovementInPx);
  console.log({ [`pane-${props.paneId}_mouseMovement`]: mouseMovementInPx });
  initialClientX.value = e.clientX;
};

const handleMouseUp = () => {
  console.log("mouseUp happened");
  context.setActivePane(null);
};

const handleMouseDown = (e: MouseEvent) => {
  if (isInteractingWithAnotherSplitter.value) return;
  console.log("handleMouseDown:", e);
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
