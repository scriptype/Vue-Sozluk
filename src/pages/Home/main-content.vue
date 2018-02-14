<template>
  <main class="main-content">
    <transition mode="out-in" name="loading-topic">

      <div v-if="!topic.id" class="loading-indicator-container">
        <loading-indicator />
      </div>

      <div v-else class="topic">

        <h1>{{ topic.title }}</h1>

        <ol class="entries">
          <li :key="entry.id" class="entry" v-for="entry in topic.entries">
            <div class="entry__content">
              {{ entry.content }}
            </div>
            <span class="entry__author">{{ getUser(entry).name }}</span>
            <span class="entry__date">{{ new Date(entry.createdAt).toLocaleDateString('tr') }}</span>
          </li>
        </ol>

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

export default {
  name: 'MainContent',

  components: {
    LoadingIndicator,
    MyButton
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
    },
    getUser(entry) {
      return entry.users[0]
    }
  }
}
</script>


<style scoped lang="scss">
@import "../../styles/helpers/variables";
@import "../../styles/helpers/responsive";
</style>
