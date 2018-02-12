<template>
  <form class="search-form">
    <text-input size="small" placeholder="search" />
    <my-button level="secondary">Ara</my-button>
  </form>
</template>

<script>
import MyButton from '@/components/my-button'
import TextInput from '@/components/text-input'

export default {
  name: 'SearchForm',
  components: {
    MyButton,
    TextInput
  }
}
</script>

<style scoped lang="scss">
</style>
