<template>
  <main class="topic">
    <transition mode="out-in" name="loading-topic">

      <div v-if="loading" class="loading-indicator-container">
        <loading-indicator />
      </div>

      <div v-else class="topic">

        <section>
          pre-main
        </section>

        <h1 class="topic__title">{{ activeTopic.title }}</h1>

        <section class="topic__entries">
          <entry
            v-for="entry in activeTopic.entries"
            :key="entry.id"
            :entry="entry"  />
        </section>

        <create-entry-form @createEntry="createEntry" />

      </div>

    </transition>
  </main>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import LoadingIndicator from '@/components/loading-indicator'
import Entry from '@/components/entry'
import CreateEntryForm from '@/components/create-entry-form'

export default {
  name: 'Topic',

  components: {
    LoadingIndicator,
    Entry,
    CreateEntryForm
  },

  computed: {
    ...mapState([
      'activeTopic',
      'getTopicStatus'
    ]),

    loading() {
      return this.getTopicStatus === 'started'
    }
  },

  methods: {
    ...mapActions([
      'getTopic',
      'createEntry'
    ])
  }
}
</script>


<style lang="scss" scoped>
.loading-indicator-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.topic {

  &__title {
    font: bold normal 2em/1.5 helvetica, sans-serif;
  }

  &__entries {}

  &__title,
  &__entries {
    margin-bottom: 3rem;
  }
}
</style>
