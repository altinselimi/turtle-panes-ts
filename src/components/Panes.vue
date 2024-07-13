<template>
  <div class="turtle-panes__wrapper">
    <slot></slot>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.turtle-panes {
  &__wrapper {
    display: flex;
    flex: 1;
  }
}
</style>
