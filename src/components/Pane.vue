<template>
  <div ref="wrapperHtmlRef" class="turtle-panes__pane">
    <slot></slot>
    <Splitter :paneId="id" />
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { Pane } from "../types";
import Splitter from "./Splitter.vue";

const contextRef: any = inject("context");
const context = contextRef.value;
const id = ref(null);
const wrapperHtmlRef = ref(null);

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
</script>
<style lang="scss">
.turtle-panes {
  &__pane {
    display: flex;
  }
}
</style>
