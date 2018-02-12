<template>
  <main-layout>

    <header slot="top-panel">
      top
    </header>

    <div slot="left-panel-header">
      <h3>Başlıklar</h3>
    </div>

    <aside slot="left-panel">
      left
    </aside>

    <section slot="pre-main-content">
      pre-main
    </section>

    <main slot="main-content">
      main
    </main>

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
