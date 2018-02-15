<template>
  <main class="main-content">
    <transition mode="out-in" name="loading-topic">

      <div v-if="!topic.id" class="loading-indicator-container">
        <loading-indicator />
      </div>

      <div v-else class="topic">

        <h1>{{ topic.title }}</h1>

        <section class="entries">
          <entry
            v-for="entry in topic.entries"
            :key="entry.id"
            :entry="entry"  />
        </section>

        <create-entry-form @createEntry="onCreateEntry" />

      </div>

    </transition>
  </main>
</template>


<script>
import LoadingIndicator from '@/components/loading-indicator'
import Entry from '@/components/entry'
import CreateEntryForm from '@/components/create-entry-form'

export default {
  name: 'MainContent',

  components: {
    LoadingIndicator,
    Entry,
    CreateEntryForm
  },

  props: {
    topic: {
      type: Object,
      required: true
    }
  },

  methods: {
    onCreateEntry(newEntryContent) {
      this.$emit('createEntry', newEntryContent)
    }
  }
}
</script>


<style scoped lang="scss">
@import "../../styles/helpers/variables";
@import "../../styles/helpers/responsive";
</style>
