<template>
  <user-link :user="user" />
</template>

<script>
import UserLink from '@/components/user-link'

export default {
  name: 'UserProfileMini',

  components: {
    UserLink
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
