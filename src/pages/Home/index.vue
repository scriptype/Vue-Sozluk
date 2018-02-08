<template>
  <main-layout>

    <div slot="top-panel">
      top
    </div>

    <div slot="left-panel-header">
      <h3>Başlıklar</h3>
    </div>

    <div slot="left-panel">
      left
    </div>

    <div slot="pre-main-content">
      pre-main
    </div>

    <div slot="main-content">
      main
    </div>

  </main-layout>
</template>


<script>
import MainLayout from '@/layouts/main'

export default {
  name: 'Home',
  components: {
    MainLayout
  }
}
</script>


<style scoped></style>
