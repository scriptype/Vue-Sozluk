<template>
  <main-layout>
    <top-panel
      slot="top-panel"
      slot-scope="props"
      :user="user"
      :class="props.className" />

    <left-panel-header
      slot="left-panel-header" />

    <left-panel
      slot="left-panel"
      :topics="recentTopics" />

    <section slot="pre-main-content">
      pre-main
    </section>

    <main slot="main-content">
      main
    </main>
  </main-layout>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import MainLayout from '@/layouts/main'
import TopPanel from './top-panel'
import LeftPanel from './left-panel'
import LeftPanelHeader from './left-panel-header'

export default {
  name: 'Home',

  components: {
    MainLayout,
    TopPanel,
    LeftPanel,
    LeftPanelHeader
  },

  data() {
    return {
      user: {
        loggedIn: false,
        nick: 'Enes'
      }
    }
  },

  computed: {
    ...mapState([
      'recentTopics'
    ])
  },

  methods: {
    ...mapActions([
      'getRecentTopics'
    ])
  },

  created() {
    this.getRecentTopics()
  }
}
</script>


<style lang="scss" scoped></style>
