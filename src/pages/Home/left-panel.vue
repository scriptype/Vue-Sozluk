<template>
  <aside class="left-panel">
    <transition mode="out-in" name="loading-topics">

      <div v-if="topics.length === 0" class="loading-indicator-container">
        <loading-indicator />
      </div>

      <ul v-else class="topics-list">
        <li v-for="topic in topics" :key="topic.id">
          <router-link :to="getTopicUrl(topic)">
            {{ topic.title }}
          </router-link>
        </li>
      </ul>

    </transition>
  </aside>
</template>


<script>
import slug from 'slug'
import LoadingIndicator from '@/components/loading-indicator'

export default {
  name: 'LeftPanel',

  components: {
    LoadingIndicator
  },

  props: {
    topics: {
      type: Array,
      required: true
    }
  },

  methods: {
    getTopicUrl(topic) {
      return `${slug(topic.title)}--${topic.id}`
    }
  }
}
</script>


<style scoped lang="scss">
@import "../../styles/helpers/variables";
@import "../../styles/helpers/responsive";

.loading-indicator-container {
  text-align: center;
}

.loading-topics-enter-active, .loading-topics-leave-active {
  transition: all .3s;
}

.loading-topics-fade-enter, .loading-topics-leave-to {
  opacity: 0;
}
</style>
