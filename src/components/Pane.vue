<template>
  <div
    ref="wrapperHtmlRef"
    class="turtle-panes__pane"
    :class="{ 'is-resizing': isInteractingWithASplitter }"
    :style="computedStyles"
  >
    <slot></slot>
    <Splitter :paneId="id" />
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, ref, computed } from "vue";
import { Pane } from "../types";
import Splitter from "./Splitter.vue";

const contextRef: any = inject("context");
const context = contextRef.value;
const id = ref(null);
const wrapperHtmlRef = ref(null);
const isInteractingWithASplitter = computed(
  () => context.interactionState.activePaneId != null,
);

const props = defineProps<{
  minWidth?: Pane["minWidth"];
  initialWidth?: number;
  maxWidth?: Pane["maxWidth"];
  isVisible?: Pane["isVisible"];
}>();

onMounted(async () => {
  const clientRect = wrapperHtmlRef?.value
    ? (wrapperHtmlRef?.value as HTMLElement)?.getBoundingClientRect()
    : null;

  id.value = await context.addPane({
    width: clientRect?.width,
    minWidth: props?.minWidth,
    maxWidth: props?.maxWidth,
    isVisible: props?.isVisible,
    id: id.value,
  });
});

const computedStyles = computed(() => {
  if (!id.value) return {};
  const pane = context.panes[id.value];
  return {
    width: `${pane?.width}px`,
  };
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
