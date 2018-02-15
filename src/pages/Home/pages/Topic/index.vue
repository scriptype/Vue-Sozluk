<template>
  <div class="topic-container">
    <section>
      pre-main
    </section>

    <main-content
      :topic="activeTopic"
      @createEntry="createEntry" />
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import MainContent from './main-content'

export default {
  name: 'Topic',

  components: {
    MainContent
  },

  computed: {
    ...mapState([
      'activeTopic'
    ])
  },

  methods: {
    ...mapActions([
      'getTopic',
      'createEntry'
    ])
  }
}
</script>


<style lang="scss" scoped></style>
