<template>
  <form class="create-entry-form">
    <textarea v-model="newEntryContent"></textarea>
    <my-button
      @click="onCreateEntry"
      type="primary"
      size="big"
    >
      Oluştur
    </my-button>
  </form>
</template>


<script>
import MyButton from '@/components/my-button'

export default {
  name: 'CreateEntryForm',

  components: {
    MyButton
  },

  data() {
    return {
      newEntryContent: ''
    }
  },

  methods: {
    onCreateEntry() {
      this.$emit('createEntry', this.newEntryContent)
    }
  }
}
</script>

<style lang="scss" scoped>
<style>
