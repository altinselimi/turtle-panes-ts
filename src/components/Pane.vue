<template>
  <div
    ref="paneWrapperRef"
    class="turtle-panes__pane"
    :class="{
      'is-resizing': isInteractingWithASplitter,
    }"
  >
    <div
      class="turtle-panes__pane-content"
      :class="{ 'has-hidden-overflow': context.containerWidth !== 0 }"
      :style="computedStyles"
      ref="paneContentRef"
    >
      <slot></slot>
    </div>
    <Splitter :paneId="id" />
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, ref, computed, watch, withDefaults } from "vue";
import { Pane, ContextType } from "../types";
import type { CSSProperties } from "vue";

import type { Ref } from "vue";
import Splitter from "./Splitter.vue";

const props = withDefaults(
  defineProps<{
    minWidth?: Pane["minWidth"];
    initialWidth?: number;
    maxWidth?: Pane["maxWidth"];
    isHiddenAfterMinWidthExceeded?: Pane["isHiddenAfterMinWidthExceeded"];
    isVisible?: Pane["isVisible"];
  }>(),
  {
    minWidth: 100,
    initialWidth: undefined,
    maxWidth: undefined,
    isHiddenAfterMinWidthExceeded: true,
    isVisible: true,
  },
);

const contextRef: Ref<ContextType> | undefined = inject("context");
if (!contextRef) {
  throw new Error("Pane is not wrapped in Panes component");
}

const context = contextRef.value;
const id: Ref<number | null> = ref(null);
const paneWrapperRef = ref(null);
const paneContentRef: Ref<HTMLElement | null> = ref(null);
const isInteractingWithASplitter = computed(
  () => context.interactionState.activePaneId != null,
);
const isDependentOnCurrentActiveSplitter = computed(
  () =>
    id.value &&
    [id.value, id.value - 1].includes(
      context.interactionState.activePaneId || -1,
    ),
);
const splitterTravelledPx = computed(
  () => context.interactionState.pixelsTravelled,
);

onMounted(async () => {
  const clientRect = paneWrapperRef?.value
    ? (paneWrapperRef?.value as HTMLElement)?.getBoundingClientRect()
    : null;
  if (!clientRect) return;

  id.value = await context.addPane({
    width: clientRect?.width,
    minWidth: props?.minWidth,
    maxWidth: props?.maxWidth,
    isVisible: props?.isVisible || true,
    isHiddenAfterMinWidthExceeded: props?.isHiddenAfterMinWidthExceeded || true,
    id: id.value || undefined,
  });
});

const computedStyles = computed<CSSProperties>(() => {
  if (!id.value) return {};
  const stylesAreReady = context.containerWidth !== 0;

  if (!stylesAreReady) return {};
  const pane = context.panes[id.value];
  return {
    width: `${pane?.width}px`,
    visibility: pane?.isVisible ? "visible" : "hidden",
  };
});

watch(
  [id, isDependentOnCurrentActiveSplitter, splitterTravelledPx],
  ([
    idValue,
    isDependentOnCurrentActiveSplitterValue,
    splitterTravelledPxValue,
  ]) => {
    if (!idValue || !isDependentOnCurrentActiveSplitterValue) return;
    const [widthOfContent, widthProvidedByPane] = [
      paneContentRef.value?.scrollWidth || 0,
      paneContentRef.value?.clientWidth || 0,
    ];
    context.updatePane(idValue, {
      widthProvidedByPane: widthProvidedByPane,
      widthOfContent: widthOfContent,
    });
    const isOverflowing = widthOfContent > widthProvidedByPane;
    if (isOverflowing) {
      const activePaneId: number = context.interactionState
        .activePaneId as number;
      const isCurrentPaneActive = activePaneId === idValue;
      if (isCurrentPaneActive) {
        const newWidth = widthOfContent;
        context.updatePaneWidth(idValue, newWidth);
      } else {
        const activePaneWidth = context.panes[activePaneId].width;
        const overflownPaneNeededPixels =
          widthOfContent - context.panes[idValue].width;
        const newWidth = activePaneWidth - overflownPaneNeededPixels;
        context.updatePaneWidth(activePaneId, newWidth);
      }
      // updatePaneWidth
      context.resetInteractionState();
    }
  },
);
</script>
<style lang="scss">
.turtle-panes {
  &__pane {
    display: flex;
    justify-content: space-between;
    &.is-resizing {
      pointer-events: none;
    }
  }
  &__pane-content {
    &.has-hidden-overflow {
      overflow: hidden;
      overflow-x: scroll;
    }
  }
}
</style>
