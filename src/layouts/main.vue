<template>
  <div class="layout main-layout">

    <nav class="top-panel">
      <div class="layout__container">
        <slot name="top-panel" className="layout__element"></slot>
      </div>
    </nav>

    <div class="layout__container">
      <div class="main-container">

        <aside class="left-panel-container">
          <header class="layout__element left-panel-header">
            <slot name="left-panel-header"></slot>
            <span
              class="left-panel-toggler display-mobile"
              @click="toggleLeftPanelVisibility"
            ></span>
          </header>

          <aside
              class="layout__element left-panel"
              :class="leftPanelClassObject"
          >
            <slot name="left-panel"></slot>
          </aside>
        </aside>

        <main class="middle-panel">

          <div class="layout__element pre-main-content">
            <slot name="pre-main-content"></slot>
          </div>

          <div class="layout__element main-content">
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
}

.main-container {
  display: flex;
  width: $lg-max;

  @media (max-width: $sm-max) {
    flex-direction: column;
  }
}

.top-panel {
  background: $light-grey;
}

.left-panel-container {
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

.left-panel-header {
  position: relative;
}

.left-panel-toggler {
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

.left-panel {
  flex: 1;
  display: none;

  @media (min-width: $sm-max) {
    display: block;
  }
}

.middle-panel {
  flex: 1;
  width: 100%;
}

.pre-main-content {
  height: 72px;
}
</style>
