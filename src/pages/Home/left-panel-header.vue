<template>
  <h3 class="left-panel-header">Başlıklar</h3>
</template>


<script>
export default {
  name: 'LeftPanelHeader'
}
</script>


<style scoped lang="scss">
@import "../../styles/helpers/variables";
@import "../../styles/helpers/responsive";

.left-panel-header {
  padding: .5em;
  background: $secondary-bg;
  color: $secondary-fg;

  @media (max-width: $sm-max) {
    padding: 1em;
  }
}
</style>
