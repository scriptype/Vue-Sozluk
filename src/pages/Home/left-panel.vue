<template>
  <aside class="left-panel">
    <transition mode="out-in" name="loading-topics">

      <div v-if="topics.length === 0" class="loading-indicator-container">
        <loading-indicator />
      </div>

      <ul v-else class="topics-list">
        <li v-for="topic in topics" :key="topic.id">
          <a href="hel" @click.prevent="onClickTopic(topic)">{{ topic.title }}</a>
        </li>
      </ul>

    </transition>
  </aside>
</template>


<script>
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
    onClickTopic(topic) {
      this.$emit('clickTopic', topic)
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
