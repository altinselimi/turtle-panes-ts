<template>
  <div class="turtle-panes__wrapper" ref="panesWrapperRef">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, provide, onMounted, watchEffect } from "vue";
import { contextRef } from "./context";

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
