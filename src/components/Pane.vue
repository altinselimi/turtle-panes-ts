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
import { inject, onMounted, ref, computed, watchEffect } from "vue";
import { Pane, ContextType } from "../types";
import type { Ref } from "vue";
import Splitter from "./Splitter.vue";
import { endInteraction } from "./helpers";

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
const isInteractingWithPreviousSplitter = computed(
  () =>
    isInteractingWithASplitter.value &&
    id.value &&
    context.interactionState.activePaneId === id.value - 1,
);

const props = defineProps<{
  minWidth?: Pane["minWidth"];
  initialWidth?: number;
  maxWidth?: Pane["maxWidth"];
  isVisible?: Pane["isVisible"];
}>();

onMounted(async () => {
  const clientRect = paneWrapperRef?.value
    ? (paneWrapperRef?.value as HTMLElement)?.getBoundingClientRect()
    : null;
  if (!clientRect) return;

  id.value = await context.addPane({
    width: clientRect?.width,
    minWidth: props?.minWidth,
    maxWidth: props?.maxWidth,
    isVisible: props?.isVisible,
    id: id.value || undefined,
  });
});

const computedStyles = computed(() => {
  if (!id.value) return {};
  const stylesAreReady = context.containerWidth !== 0;

  if (!stylesAreReady) return {};
  const pane = context.panes[id.value];
  return {
    width: `${pane?.width}px`,
  };
});

false &&
  watchEffect(
    () => {
      const pixelsTravelled = context.interactionState.pixelsTravelled;
      if (
        !isInteractingWithPreviousSplitter.value ||
        !id.value ||
        pixelsTravelled === 0
      )
        return;

      const [scrollWidth, clientWidth] = [
        paneContentRef.value?.scrollWidth || 0,
        paneContentRef.value?.clientWidth || 0,
      ];
      const hasHorizontalOverflow = scrollWidth > clientWidth;

      if (hasHorizontalOverflow) {
        endInteraction();
        const differenceWithLastValidWidth =
          context.panes[id.value].width - clientWidth;
        console.log({
          clientWidth,
          scrollWidth,
          alreadyPresentWidth: context.panes[id.value].width,
          differenceWithLastValidWidth,
        });
        if (differenceWithLastValidWidth < 0) return;
        context.updatePaneWidth(
          id.value - 1,
          differenceWithLastValidWidth * -1,
        );
      }
    },
    {
      flush: "pre",
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
