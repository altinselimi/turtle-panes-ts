<template>
  <div class="turtle__hero">
    <div class="turtle-logo__wrapper">
      <div style="font-size: 120px">🐢</div>
      <h1>TurtlePanes</h1>
      <div class="turtle-logo__quote">
        <p style="margin-top: 10px; margin-bottom: 0px">
          Hide like a turtle. Sting like a bee.
        </p>
        <span style="margin-left: auto; opacity: 0.5">- Koopa Troopas</span>
      </div>
    </div>
  </div>
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
import { TurtlePanes, TurtlePane } from "./components/";
import FirstPaneContent from "./content/FirstPaneContent.vue";
import SecondPaneContent from "./content/SecondPaneContent.vue";
import ThirdPaneContent from "./content/ThirdPaneContent.vue";
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
