<template>
  <article class="entry">

    <div class="entry__content">
      {{ entry.content }}
    </div>

    <user-link :user="getUser()" class="entry__author" />

    <span class="entry__date">
      {{ new Date(entry.createdAt).toLocaleDateString('tr') }}
    </span>

  </article>
</template>

<script>
import UserLink from '@/components/user-link'

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

  methods: {
    getUser() {
      return this.entry.users[0]
    }
  }
}
</script>

<style scoped></style>
