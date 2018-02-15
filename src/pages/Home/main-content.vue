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

        <form class="create-entry-form">
          <textarea v-model="newEntryContent"></textarea>
          <my-button
            @click="onCreateEntry"
            type="primary"
            size="big"
          >
            Oluştur
          </my-button>
        </form>

      </div>

    </transition>
  </main>
</template>


<script>
import LoadingIndicator from '@/components/loading-indicator'
import MyButton from '@/components/my-button'
import Entry from '@/components/entry'

export default {
  name: 'MainContent',

  components: {
    LoadingIndicator,
    MyButton,
    Entry
  },

  props: {
    topic: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      newEntryContent: ''
    }
  },

  methods: {
    onCreateEntry() {
      this.$emit('createEntry', this.newEntryContent)
    }
  }
}
</script>


<style scoped lang="scss">
@import "../../styles/helpers/variables";
@import "../../styles/helpers/responsive";
</style>
