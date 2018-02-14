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

    <main-content
      slot="main-content"
      :topic="activeTopic" />
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
  name: 'Home',

  components: {
    MainLayout,
    TopPanel,
    LeftPanel,
    LeftPanelHeader,
    MainContent
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
      'recentTopics',
      'activeTopic'
    ])
  },

  methods: {
    ...mapActions([
      'getRecentTopics',
      'getRandomTopic',
      'getTopic'
    ])
  },

  created() {
    this.getRecentTopics()
    const { topicID } = this.$route.params
    if (topicID) {
      this.getTopic(topicID)
    } else {
      this.getRandomTopic()
    }
  },

  beforeRouteUpdate(to, from, next) {
    const { topicID } = to.params
    if (topicID) {
      this.getTopic(topicID)
    } else {
      this.getRandomTopic()
    }
    next()
  }
}
</script>


<style lang="scss" scoped></style>
