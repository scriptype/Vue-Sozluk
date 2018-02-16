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

    <router-view
      :class="mainContentClassObject"
      slot="main-content" />
  </main-layout>
</template>


<script>
import Vue from 'vue'
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
      isActive: true
    }
  },

  computed: {
    ...mapState([
      'user',
      'recentTopics'
    ]),

    mainContentClassObject() {
      return {
        'main-content-container': true,
        active: this.isActive
      }
    }
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
    this.isActive = false
    Vue.nextTick(() => {
      this.isActive = true
      next()
    })
  }
}
</script>


<style lang="scss">
.main-content-container {
  opacity: 0;
  transform: translateY(-.5em);

  &.active {
    opacity: 1;
    transform: translateY(0);
    transition: all .3s;
  }
}
</style>
