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
      :topics="userContributedTopics" />

    <main-content
      slot="main-content"
      :user="user" />
  </main-layout>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import MainLayout from '@/layouts/main'
import TopPanel from './top-panel'
import LeftPanel from './left-panel'
import LeftPanelHeader from './left-panel-header'
import MainContent from './main-content'

export default {
  name: 'User',

  components: {
    MainLayout,
    TopPanel,
    LeftPanel,
    LeftPanelHeader,
    MainContent
  },

  computed: {
    ...mapState([
      'user',
      'userContributedTopics'
    ])
  },

  methods: {
    ...mapActions([
      'getUserContributedTopics',
      'getUser'
    ])
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getUser()
      vm.getUserContributedTopics()
    })
  }
}
</script>


<style lang="scss" scoped></style>
