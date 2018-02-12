<template>
  <main-layout>
    <header slot="top-panel" slot-scope="props">
      <top-panel :user="user" :class="props.className" />
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
import TopPanel from './top-panel'

export default {
  name: 'Home',
  components: {
    MainLayout,
    TopPanel
  },
  data() {
    return {
      user: {
        loggedIn: false,
        nick: 'Enes'
      }
    }
  }
}
</script>


<style scoped></style>
