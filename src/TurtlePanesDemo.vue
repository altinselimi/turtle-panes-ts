<template>
  <TurtlePanes>
    <TurtlePane>
      <FirstPaneContent />
    </TurtlePane>
    <TurtlePane>
      <SecondPaneContent />
    </TurtlePane>
    <TurtlePane>
      <ThirdPaneContent />
    </TurtlePane>
  </TurtlePanes>
</template>
<script setup lang="ts">
import { TurtlePanes, TurtlePane } from "./components";
import FirstPaneContent from "./content/FirstPaneContent.vue";
import SecondPaneContent from "./content/SecondPaneContent.vue";
import ThirdPaneContent from "./content/ThirdPaneContent.vue";
</script>
