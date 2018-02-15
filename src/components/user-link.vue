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
      return `profile/${this.user.name}--${this.user.id}`
    }
  }
}
</script>

<style scoped></style>
