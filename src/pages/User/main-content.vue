<template>
  <main class="main-content">
    <transition mode="out-in" name="loading-user">

      <div v-if="!user.id" class="loading-indicator-container">
        <loading-indicator />
      </div>

      <div v-else class="user">

        <h1 class="user__name">{{ user.name }}</h1>

        <section class="user__details">
          Joined at: {{ joinedAt }}
        </section>

      </div>

    </transition>
  </main>
</template>


<script>
import LoadingIndicator from '@/components/loading-indicator'
import Utils from '@/utils'

export default {
  name: 'MainContent',

  components: {
    LoadingIndicator
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  computed: {
    joinedAt() {
      return Utils.readableDate(new Date(this.user.createdAt))
    }
  }
}
</script>


<style scoped lang="scss">
@import "../../styles/helpers/variables";
@import "../../styles/helpers/responsive";

.user {

  &__name {
    margin-bottom: 3rem;
    font: bold normal 2em/1.5 helvetica, sans-serif;
  }

  &__details {}
}
</style>
