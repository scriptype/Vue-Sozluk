<template>
  <div class="layout main-layout">

    <nav class="layout__element top-panel">
      <slot name="top-panel"></slot>
    </nav>

    <div class="main-container">

      <aside class="left-panel-container">
        <header class="layout__element left-panel-header">
          <slot name="left-panel-header"></slot>
          <label
            class="left-panel-toggler"
            for="left-panel-toggle">
          </label>
        </header>

        <input
          type="checkbox"
          id="left-panel-toggle"
          class="left-panel-toggle" />

        <aside class="layout__element left-panel">
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
  name: 'Home'
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

.top-panel {
  height: 96px;
}

.left-panel-container {
  display: flex;
  flex-direction: column;
  transition: all .3s;
}

.left-panel-header {
  position: relative;
  background: yellow;
}

.left-panel-toggler {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.left-panel-toggle {
  display: none;

  &:checked + .left-panel {
    width: 100%;
    height: auto;
    overflow: auto;
    opacity: 1;
  }
}

.left-panel {
  height: 0;
  flex: 1;
  overflow: hidden;
  background: red;
  opacity: 0;
  transition: all .3s;
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

  .left-panel-toggler {
    display: none;
  }

  .left-panel-container {
    width: 240px;
  }

  .left-panel {
    height: auto;
    overflow: auto;
    opacity: 1;
  }
}

@media (min-width: 960px) {
  .left-panel-container {
    width: 360px;
  }
}
</style>
