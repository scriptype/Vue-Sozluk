<template>
  <a href="#" @click.prevent="onClickNick">{{ nick }}</a>
</template>

<script>
export default {
  name: 'UserProfileMini',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  computed: {
    nick() {
      return this.$props.user.nick
    }
  },

  methods: {
    onClickNick() {
      this.$emit('onClickNick')
    }
  }
}
</script>

<style scoped></style>
