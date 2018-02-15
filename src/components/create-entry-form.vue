<template>
  <form class="create-entry-form">

    <textarea
      class="create-entry-form__text"
      v-model="newEntryContent"
    ></textarea>

    <my-button
      @click="onCreateEntry"
      type="primary"
      size="big"
      class="create-entry-form__button"
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
@import "../styles/helpers/variables";

.create-entry-form {

  &__text {
    width: 100%;
    min-height: 100px;
    border-radius: 5px;
    border: 1px solid $dark-grey;
  }

  &__button {
    float: right;
  }
}
</style>
