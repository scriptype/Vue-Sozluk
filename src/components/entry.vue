<template>
  <article class="entry">

    <div class="entry__content">
      {{ entry.content }}
    </div>

    <footer class="entry__meta">
      <span class="entry__date">
        {{ createdDate }}
      </span>

      <user-link :user="user" class="entry__author" />
    </footer>

  </article>
</template>

<script>
import UserLink from '@/components/user-link'
import Utils from '@/utils'

export default {
  name: 'Entry',

  components: {
    UserLink
  },

  props: {
    entry: {
      type: Object,
      required: true
    }
  },

  computed: {
    user() {
      return this.entry.users[0]
    },

    createdDate() {
      return Utils.readableDate(new Date(this.entry.createdAt))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/helpers/variables";

.entry {
  margin-bottom: 5em;
  padding-bottom: 1em;
  border-bottom: 1px solid $light-grey;

  &__content {}

  &__meta {
    text-align: right;
  }

  &__author {
    font-size: .9em;
    text-transform: lowercase;
  }

  &__date {
    font-size: .8em;
    margin-right: .5em;
  }
}
</style>
