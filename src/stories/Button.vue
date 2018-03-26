<template>
  <button
    type="button"
    class="my-button"
    @click="onClick"
  >
    Hiya
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  methods: {
    onClick(e) {
      console.log('button.clicked', e)
      this.$emit('clicked', e)
    }
  }
}
</script>

<style lang="scss">
  .my-button {
    padding: 1em;
  }
</style>
