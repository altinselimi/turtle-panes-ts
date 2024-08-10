<template>
  <LibraryHeader />
  <div class="demo-showcase__wrapper">
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
  </div>
</template>

<script setup>
import LibraryHeader from "./components/LibraryHeader.vue";
import { TurtlePanes, TurtlePane } from "./components/";
import FirstPaneContent from "./FirstPaneContent.vue";
import SecondPaneContent from "./SecondPaneContent.vue";
import ThirdPaneContent from "./ThirdPaneContent.vue";
const a =   'ehh' ;
</script>

<style lang="scss">
.turtle__hero {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
.turtle-logo {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      margin: 0px;
    }
  }
  &__quote {
    display: flex;
    flex-direction: column;
  }
}
.demo-showcase {
  &__wrapper {
    max-width: 1200px;
    display: flex;
    width: 100%;
    align-self: center;
    border: dashed 0.5px #757575;
  }
}
</style>
