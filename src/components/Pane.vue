<template>
  <div
    ref="paneWrapperRef"
    class="turtle-panes__pane"
    :class="{ 'is-resizing': isInteractingWithASplitter }"
    :style="computedStyles"
  >
    <div class="turtle-panes__pane-content" ref="paneContentRef">
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
  const pane = context.panes[id.value];
  return {
    width: `${pane?.width}px`,
  };
});

watchEffect(() => {
  if (!isInteractingWithPreviousSplitter.value || !id.value) return;
  const [scrollWidth, clientWidth] = [
    paneContentRef.value?.scrollWidth || 0,
    paneContentRef.value?.clientWidth || 0,
  ];
  const hasHorizontalOverflow = scrollWidth > clientWidth;
  console.log(`pane-${id.value} hasOverflow:`, hasHorizontalOverflow);
  context.updatePane(id.value, {
    hasHorizontalOverflow,
  });
});
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
}
</style>
