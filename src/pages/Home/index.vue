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

    <router-view slot="main-content"></router-view>
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

  computed: {
    ...mapState([
      'user',
      'recentTopics'
    ])
  },

  methods: {
    ...mapActions([
      'getRecentTopics',
      'getRandomTopic',
      'getTopic',
      'getUser'
    ]),

    onChangeRoute(vm, to) {
      vm.getRecentTopics()
      const { topicID } = to.params
      if (topicID) {
        vm.getTopic(topicID)
      } else {
        vm.getRandomTopic()
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getUser()
      vm.onChangeRoute(vm, to, from)
    })
  },

  beforeRouteUpdate(to, from, next) {
    this.onChangeRoute(this, to, from)
    next()
  }
}
</script>


<style lang="scss" scoped></style>
