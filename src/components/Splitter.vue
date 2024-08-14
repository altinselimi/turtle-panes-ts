<template>
  <div class="turtle-panes__splitter-wrapper">
    <div
      class="turtle-panes__splitter-target"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseLeave"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { ref, inject } from "vue";

const splitter = ref(null);
const contextRef: any = inject("context");
const context = contextRef.value;
const isInteractingWithSplitter = context.interactionState.activePaneId === ;

const handleMouseDown = (e: EventTarget) => {
  console.log("handleMouseDown:", e);
};
const handleMouseMove = (e: EventTarget) => {
  if(!context.)
  console.log("handleMouseMove:", e);
};
const handleMouseUp = (e: EventTarget) => {
  console.log("handleMouseUp:", e);
};
const handleMouseLeave = (e: EventTarget) => {
  console.log("handleMouseLeave:", e);
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
  }
  &-target {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10px;
    height: 100%;
  }
}
</style>
