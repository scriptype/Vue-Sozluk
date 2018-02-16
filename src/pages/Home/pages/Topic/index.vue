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
            :entry="entry" />

          <div
            v-if="creatingEntry || finishingCreatingEntry"
            :class="entryToCreateContainerClassObject"
          >
            <entry
              :entry="entryToCreate"
              :class="entryToCreateClassObject" />

            <loading-indicator
              :class="entryCreatingIndicatorClassObject"
              size="small" />
          </div>

        </section>

        <create-entry-form @createEntry="onCreateEntry" />

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

  data() {
    return {
      entryToCreate: null,
      creatingEntry: false,
      finishingCreatingEntry: false
    }
  },

  computed: {
    ...mapState([
      'activeTopic',
      'getTopicStatus',
      'createEntryStatus',
      'user'
    ]),

    entryToCreateContainerClassObject() {
      return {
        'topic__entry-to-create-container': true,
        'topic__entry-to-create-container--leaving': this.finishingCreatingEntry
      }
    },

    entryToCreateClassObject() {
      return {
        'topic__entry-to-create-preview': true,
        'topic__entry-to-create-preview--leaving': this.finishingCreatingEntry
      }
    },

    entryCreatingIndicatorClassObject() {
      return {
        'topic__entry-creating-indicator': true,
        'topic__entry-creating-indicator--leaving': this.finishingCreatingEntry
      }
    },

    loading() {
      return this.getTopicStatus === 'started'
    }
  },

  watch: {
    createEntryStatus(newValue, oldValue) {
      const wasCreating = oldValue === 'started'
      const isCreating = newValue === 'started'
      const isFinished = newValue === 'success' || newValue === 'fail'

      if (!wasCreating && isCreating) {
        this.creatingEntry = true
      } else if (wasCreating && isFinished) {
        this.creatingEntry = false
        this.finishingCreatingEntry = true
        setTimeout(() => {
          this.finishingCreatingEntry = false
          this.pushOptimisticEntry(this.entryToCreate)
        }, 1000)
      }
    }
  },

  methods: {
    ...mapActions([
      'getTopic',
      'createEntry',
      'pushOptimisticEntry'
    ]),

    onCreateEntry(content) {
      const entryToCreate = {
        id: Math.round(Math.random() * 1000),
        content
      }

      this.createEntry(entryToCreate.content)

      this.entryToCreate = Object.assign({}, entryToCreate, {
        users: [this.user],
        createdAt: Date.now()
      })
    }
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

  &__entry-to-create-container {
    position: relative;
    box-shadow: 0 0 40px rgba(0, 0, 0, .3);
    border-radius: 5px;
    transition: all 1s;

    &--leaving {
      box-shadow: none;
      border-radius: 0;
    }
  }

  &__entry-to-create-preview {
    padding: 2em !important;
    transition: all 1s;

    &--leaving {
      padding: 0 !important;
    }
  }

  &__entry-creating-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 1;
    transform: translate(-50%, -50%);
    transition: all 1s;

    &--leaving {
      opacity: 0;
    }
  }
}
</style>
