<template>
  <div class="layout main-layout">

    <nav class="main-layout__top-panel">
      <div class="layout__container">
        <slot name="top-panel" className="layout__element"></slot>
      </div>
    </nav>

    <div class="layout__container">
      <div class="main-layout__main-container">

        <aside class="main-layout__left-panel-container">
          <header class="main-layout__left-panel-header">
            <slot name="left-panel-header" ></slot>
            <span
              class="main-layout__left-panel-toggler display-mobile"
              @click="toggleLeftPanelVisibility"
            ></span>
          </header>

          <aside
              class="layout__element main-layout__left-panel"
              :class="leftPanelClassObject"
          >
            <slot name="left-panel"></slot>
          </aside>
        </aside>

        <main class="main-layout__middle-panel">

          <div class="layout__element main-layout__main-content">
            <slot name="main-content"></slot>
          </div>

        </main>

      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: 'MainLayout',

  data() {
    return {
      isLeftPanelVisible: false
    }
  },

  computed: {
    leftPanelClassObject() {
      return {
        'display-desktop': true,
        'display-mobile': this.isLeftPanelVisible
      }
    }
  },

  methods: {
    toggleLeftPanelVisibility() {
      this.isLeftPanelVisible = !this.isLeftPanelVisible
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/helpers/variables";
@import "../styles/helpers/responsive";

.main-layout {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__main-container {
    display: flex;

    @media (max-width: $sm-max) {
      flex-direction: column;
    }

    @media (min-width: $lg-max) {
      width: $lg-max;
    }
  }

  &__top-panel {
    background: $lighter-grey;
  }

  &__left-panel-container {
    display: flex;
    flex-direction: column;
    transition: all .3s;

    @media (min-width: $sm-max) {
      width: 240px;
    }

    @media (min-width: $lg-max) {
      width: 360px;
    }
  }

  &__left-panel-header {
    position: relative;
  }

  &__left-panel-toggler {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;

    @media (min-width: $sm-max) {
      display: none;
    }
  }

  &__left-panel {
    flex: 1;
    display: none;

    @media (min-width: $sm-max) {
      display: block;
    }
  }

  &__middle-panel {
    flex: 1;
    width: 100%;
  }
}
</style>
