<template>
  <main class="main-content">
    <transition mode="out-in" name="loading-topic">

      <div v-if="!topic.id" class="loading-indicator-container">
        <loading-indicator />
      </div>

      <div v-else class="topic">
        <h1>{{ topic.title }}</h1>
      </div>

    </transition>
  </main>
</template>


<script>
import LoadingIndicator from '@/components/loading-indicator'

export default {
  name: 'MainContent',

  components: {
    LoadingIndicator
  },

  props: {
    topic: {
      type: Object,
      required: true
    }
  }
}
</script>


<style scoped lang="scss">
@import "../../styles/helpers/variables";
@import "../../styles/helpers/responsive";
</style>
