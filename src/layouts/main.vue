<template>
  <div class="layout main-layout">

    <nav class="top-panel">
      <slot name="top-panel" className="layout__element"></slot>
    </nav>

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
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.top-panel {}

.left-panel-container {
  display: flex;
  flex-direction: column;
  transition: all .3s;
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
}

.left-panel {
  flex: 1;
  display: none;
}

.middle-panel {
  flex: 1;
}

.pre-main-content {
  height: 72px;
}

@media (min-width: 640px) {
  .main-container {
    flex-direction: row;
  }

  .left-panel-container {
    width: 240px;
  }

  .left-panel-toggler {
    display: none;
  }

  .left-panel {
    display: block;
  }
}

@media (min-width: 960px) {
  .left-panel-container {
    width: 360px;
  }
}
</style>
