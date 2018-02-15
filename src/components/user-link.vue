<template>
  <router-link :to="getProfileUrl()">{{ user.name }}</router-link>
</template>

<script>
export default {
  name: 'UserLink',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  methods: {
    getProfileUrl() {
      return `/user/${this.user.name}--${this.user.id}`
    }
  }
}
</script>

<style scoped></style>
